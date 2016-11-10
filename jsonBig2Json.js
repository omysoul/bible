const fs = require('fs')
const path = require('path')
const { encode } = require('@omysoul/bible-codec')

const toShortJson = version => version.resultset.row
.reduce((acc, { field: [_, b, c, v, txt]}) => {
  const book = acc[b - 1] || []
  acc[b -1] = book
  const chapter = book[c - 1] || []
  book[c - 1] = chapter
  chapter.push({
    n: v,
    txt: txt.replace(/\\/g, '')
  })
  return acc
}, [])



function compressBible(name) {
  let version = fs.readFileSync(path.join(
    __dirname,
    'docs',
    'jsonBig',
    `${name}.json`
  ), 'utf8')

  version = toShortJson(JSON.parse(version))

  fs.writeFileSync(path.join(
    __dirname,
    'docs',
    'json',
    `${name}.json`
  ), JSON.stringify(version,0,2), 'utf8')

  fs.writeFileSync(path.join(
    __dirname,
    'docs',
    'txt',
    `${name}.txt`
  ), encode(version), 'utf8')

}

process.argv[2] && compressBible(process.argv[2])
