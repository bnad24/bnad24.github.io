import jquery from 'jquery';
import { JSDOM } from 'jsdom';
import { sum, first, uniq, get, sortBy } from 'lodash-es';
import fs from 'fs-extra';
import { DateTime } from 'luxon';
import fetch from '@adobe/node-fetch-retry';
import { dirname } from 'path';
import DOMPurify from 'isomorphic-dompurify';
const { sanitize } = DOMPurify;

async function fetchCached(url, filepath, force = false) {
  if (!force && (await fs.pathExists(filepath))) {
    return fs.readFile(filepath);
  }
  const html = await (
    await fetch(url, {
      headers: {
        'referer': process.env.REFERRER,
        'user-agent': process.env.USER_AGENT,
        'cookie': process.env.COOKIES,
      },
    })
  ).text();

  await fs.ensureDir(dirname(filepath));
  await fs.writeFile(filepath, html);
  return html;
}

async function processSortedSigs($, force) {
  const html = await fetchCached('https://nadezhdin2024.ru/signatures', 'tmp/signatures.html', force);
  const { window } = new JSDOM(html);
  var $ = jquery(window);

  const sigs = $('.addresses-page__region')
    .toArray()
    .map(function (e) {
      const region = $(e).find('.subheading').text().toString().trim();

      const valueText = $(e).find('.progressbar__el__text').text();
      const matches = /Отсортировано подписей: (\d+)/.exec(valueText);
      if (!matches || matches.length < 2 || !matches[1]) {
        return { region };
      }

      const valueSorted = parseInt(matches[1], 10);
      return { region, valueSorted };
    });

  return sigs;
}

async function processGatheredSigs($, sigs) {
  const regionsAndValues = $('.addresses-page__region')
    .toArray()
    .map(function (e) {
      const region = $(e).find('.subheading').text().toString().trim();

      const sig = sigs.find((sig) => sig.region === region) ?? {};

      const tgs = $(e)
        .find('.socials__item')
        .filter((i, e) => {
          return $(e).text() === 'Телеграм-канал';
        })
        .map((i, e) =>
          $(e)
            .attr('href')
            ?.toString()
            ?.trim()
            ?.replace(/t\.me\/+/, 't.me/'),
        )
        .toArray();

      const tg = first(uniq(tgs));

      const valueText = $(e).find('.progressbar__el__text').text();
      const matches = /Собрано подписей: (\d+)/.exec(valueText);
      if (!matches || matches.length < 2 || !matches[1]) {
        return { region, tg };
      }

      let value = parseInt(matches[1], 10);
      return { ...sig, region, tg, value };
    });

  return regionsAndValues;
}

function fixRegion(region) {
  return region.replace(/(?:Республика|Область|автономный округ|АО|— .*)/giu, '').trim();
}

async function mergeSortedAndGathered(sorteds_, gathereds_, pops) {
  const sorteds = sorteds_.map((x) => ({ ...x, regionFixed: fixRegion(x.region) }));
  const gathereds = gathereds_.map((x) => ({ ...x, regionFixed: fixRegion(x.region) }));
  const regionsFixed = uniq([...sorteds.map((x) => x.regionFixed), ...gathereds.map((x) => x.regionFixed)]).sort();

  let stats = regionsFixed
    .map((regionFixed) => {
      const sorted = sorteds.find((x) => x.regionFixed === regionFixed);
      const gathered = gathereds.find((x) => x.regionFixed === regionFixed);
      return { ...sorted, ...gathered, region: sorted?.region ?? gathered?.region, regionFixed: undefined };
    })
    .map((d) => {
      let value = d.value;
      if ((d.value && d.valueSorted && d.valueSorted > d.value) || (!d.value && d.valueSorted)) {
        value = d.valueSorted;
      }
      return { ...d, value };
    })
    .filter((d) => !!d.value)
    .map((d) => {
      const pop = pops.find((pop) => pop.region === d.region)?.population;
      const valuePerPop = pop ? (1_000_000 * d.value) / pop : undefined;
      const valueSortedPerPop = pop ? (1_000_000 * d.valueSorted) / pop : undefined;
      return { ...d, pop, valuePerPop, valueSortedPerPop };
    });

  stats = sortBy(stats, stats.region);
  const total = sum(stats.map(({ value }) => value));
  const totalSorted = sum(stats.map(({ valueSorted }) => valueSorted));
  const percSorted = totalSorted / total;
  return { stats, total, totalSorted, percSorted };
}

async function processAddresses($) {
  const addresses = $('.addresses-page__region')
    .toArray()
    .map(function (e) {
      const region = $(e).find('.subheading').text().toString().trim();

      let html = $(e).find('.text')?.html();
      if (html) {
        html = sanitize(html, {
          ALLOW_DATA_ATTR: false,
        });
      }

      let tgs = $(e)
        .find('.socials__item')
        .toArray()
        .filter((e) => $(e).text() === 'Телеграм-канал')
        .map((e) =>
          $(e)
            .attr('href')
            ?.toString()
            ?.trim()
            ?.replace(/t\.me\/+/, 't.me/'),
        );

      tgs = uniq(tgs);

      let phones = $(e)
        .find('.socials__item')
        .toArray()
        .filter((e) => $(e).text() === 'Телефон')
        .map((e) =>
          $(e)
            .attr('href')
            ?.toString()
            ?.replace(/tel:/, '')
            ?.replace(/[^+\d]+/g, '')
            ?.trim(),
        );

      phones = uniq(phones);

      return { region, tgs, phones, html };
    });

  return { addresses };
}

async function main() {
  const force = process.argv.includes('--force');

  const pops = await fs.readJson('public/data/population.json');
  const sorted = await processSortedSigs($, force);

  const html = await fetchCached('https://nadezhdin2024.ru/addresses', 'tmp/addresses.html', force);
  const { window } = new JSDOM(html);
  var $ = jquery(window);

  if ($('head > title').text() !== 'Адреса штабов Бориса Надеждина | Надеждин 2024') {
    throw new Error(`Web page is not recognized: ${html}`);
  }
  const gathered = await processGatheredSigs($, sorted);

  const stats = await mergeSortedAndGathered(sorted, gathered, pops);

  const addresses = await processAddresses($);

  const updatedAt = DateTime.now().toUTC().toISO();

  console.log(stats);

  await fs.writeJson('public/data/signatures.json', { ...stats, updatedAt }, { spaces: 2 });
  await fs.writeJson('public/data/addresses.json', { ...addresses, updatedAt }, { spaces: 2 });
}

await main();
