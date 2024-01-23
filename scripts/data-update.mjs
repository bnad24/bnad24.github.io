import jquery from 'jquery';
import { JSDOM } from 'jsdom';
import { sum, first } from 'lodash-es';
import fs from 'fs-extra';

async function main() {
  const html = await (await fetch('https://nadezhdin2024.ru/addresses')).text();
  const { window } = new JSDOM(html);
  var $ = jquery(window);

  const regionsAndValues = $('.addresses-page__region')
    .toArray()
    .map(function (e) {
      const region = $(e).find('.subheading').text();
      const valueText = $(e).find('.progressbar__el__text').text();
      const matches = /Собрано подписей: (\d+)/.exec(valueText);
      if (!matches || matches.length < 2 || !matches[1]) {
        return { region, value: undefined };
      }
      return { region, value: parseInt(matches[1], 10) };
    });

  console.log({ regionsAndValues });
  const total = sum(regionsAndValues.map(({ value }) => value));
  console.log({ total });

  await fs.writeJson('public/data/sign.json', { regionsAndValues, total });
}

await main();
