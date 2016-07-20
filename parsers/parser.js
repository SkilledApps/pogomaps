/* @flow */

import cheerio from 'cheerio'
import fs from 'fs'
const fetch = require('node-fetch')

const POKEMONDB = 'http://pokemondb.net'

async function parsePage(link) {
  const body = await fetch(POKEMONDB + link.href).then(r => r.text())
  const $ = cheerio.load(body)
  return {
    ...link,
    src: $('img').first().attr('src'),
    alt: $('img').first().attr('alt')
  }
}

async function main() {
  try {
    const body = await fetch(POKEMONDB + '/pokedex/all').then(r => r.text())
    const $ = cheerio.load(body)
    const links = $('#pokedex tr .cell-icon-string a').map(function(i, el) {
      return {
        name: $(this).text(),
        href: POKEMONDB + $(this).attr('href')
      };
    }).get()
    const images = await Promise.all(links.map(link => parsePage(link)))
    fs.writeFileSync('./parsers/db.json', JSON.stringify(images))
  } catch (e) {
    console.error(e)
  }

}

main().then();
