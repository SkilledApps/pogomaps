/* @flow */

import cheerio from 'cheerio'
import fs from 'fs'
const fetch = require('node-fetch')

const POKEMONDB = 'http://www.ign.com/wikis/pokemon-go/List_of_Pokemon_(Pokedex)'

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
    const body = await fetch(POKEMONDB + '').then(r => r.text())
    const $ = cheerio.load(body)
    const links = $('table td a').map(function(i, el) {
      const parts = $(this).attr('href').split('/');
      if ($(this).find('img').first().attr('src')) {
        console.log($(this).find('img').first().attr('srcset').split(' ')[0])
        return {
          href: POKEMONDB + $(this).attr('href'),
          src: $(this).find('img').first().attr('srcset').split(' ')[0],
          name: parts[parts.length - 1],
          title: $(this).attr('title').replace('.jpg', '')
        };
      }
      return null;

    }).get()
    console.log(links.length)
    //const images = await Promise.all(links.map(link => parsePage(link)))
    fs.writeFileSync('./parsers/db.json', JSON.stringify(links.filter(l => l)))
  } catch (e) {
    console.error(e)
  }

}

main().then();
