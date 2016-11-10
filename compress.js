const fs = require('fs')
const path = require('path')
const { encode } = require('@omysoul/bible-codec')

process.argv[2] && compressBible(process.argv[2])

function compressBible(name) {
  console.log(path.join(
    __dirname,
    'docs',
    'json',
    `${name}.json`
  ))
  let version = fs.readFileSync(path.join(
    __dirname,
    'docs',
    'json',
    `${name}.json`
  ), 'utf8')
  version = JSON.parse(version)
  version = encode(version)
  console.log(version)
  fs.writeFileSync(path.join(
    __dirname,
    'docs',
    'txt',
    `${name}.txt`
  ), version, 'utf8')
}
