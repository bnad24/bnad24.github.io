import jquery from 'jquery';
import { JSDOM } from 'jsdom';
import { sum, first, uniq, get } from 'lodash-es';
import fs from 'fs-extra';
import { DateTime } from 'luxon';
import fetch from '@adobe/node-fetch-retry';
import { dirname } from 'path';

async function fetchCached(url, filepath, force = false) {
  if (!force && (await fs.pathExists(filepath))) {
    return fs.readFile(filepath);
  }
  const html = await (await fetch(url)).text();
  await fs.ensureDir(dirname(filepath));
  await fs.writeFile(filepath, html);
  return html;
}

async function processStats($) {
  const pops = await fs.readJson('public/data/population.json');

  const regionsAndValues = $('.addresses-page__region')
    .toArray()
    .map(function (e) {
      const region = $(e).find('.subheading').text().toString().trim();

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

      const pop = pops.find((pop) => pop.region === region)?.population;

      const valueText = $(e).find('.progressbar__el__text').text();
      const matches = /Собрано подписей: (\d+)/.exec(valueText);
      if (!matches || matches.length < 2 || !matches[1]) {
        return { region, tg, pop };
      }

      const value = parseInt(matches[1], 10);
      const valuePerPop = pop ? (1_000_000 * value) / pop : undefined;
      return { region, tg, pop, value, valuePerPop };
    });

  const total = sum(regionsAndValues.map(({ value }) => value));

  return { regionsAndValues, total };
}

async function processAddresses($) {
  const addresses = $('.addresses-page__region')
    .toArray()
    .map(function (e) {
      const region = $(e).find('.subheading').text().toString().trim();

      const html = $(e).find('.text')?.html();

      const texts = $(e)
        .find('.addresses-page__city')
        .toArray()
        .map((e) => {
          return $(e).text()?.trim();
        });

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

  const html = await fetchCached('https://nadezhdin2024.ru/addresses', 'tmp/addresses.html', force);
  const { window } = new JSDOM(html);
  var $ = jquery(window);

  const stats = await processStats($);
  const addresses = await processAddresses($);

  const updatedAt = DateTime.now().toUTC().toISO();

  console.log(stats);

  await fs.writeJson('public/data/sign.json', { ...stats, updatedAt }, { spaces: 2 });
  await fs.writeJson('public/data/addresses.json', { ...addresses, updatedAt }, { spaces: 2 });
}

await main();
