import jquery from 'jquery';
import { JSDOM } from 'jsdom';
import { sum, first, last, uniq, get, sortBy } from 'lodash-es';
import fs from 'fs-extra';
import { DateTime } from 'luxon';
import { dirname } from 'path';

async function main() {
  const input = await fs.readJSON('public/data/memes.json');
  const lastId = last(sortBy(input.memes, (x) => x.id))?.id ?? '';

  let memes = (await fs.readdir('public/content/memes/', { withFileTypes: true, recursive: true }))
    .filter((item) => !item.isDirectory())
    .map((item) => {
      const id = item.name.replace(/\.(jpg|png|gif)$/, '');
      const url = item.path.replace(/^public/, '') + item.name;
      return { url, id, name: '', description: '' };
    })
    .filter((item) => item.id > lastId);

  memes = [...input.memes, ...memes];
  memes = sortBy(memes, (x) => -x.id);

  console.log(memes);

  const updatedAt = DateTime.now().toUTC().toISO();
  await fs.writeJson('public/data/memes.json', { memes, updatedAt }, { spaces: 2 });
}

await main();
