const REG_EXP = /(?<=```[a-z]+)\s?\{[0-9\,\-]+\}/g

module.exports = function({ path, source}) {
  if (!path.endsWith('.md')) {
    return source
  }
  return source.replace(REG_EXP, function(match) {
    const lineIntervals = match.replace(/[\{\}+\s]/g, '')
    const transformed = lineIntervals.split(',').map(transformLineInterval).join(',')

    return ` mark=${transformed}`
  })
}

function transformLineInterval(oldFormat) {
  const chunks = oldFormat.split('-')
  return chunks.map((chunk) => parseInt(chunk) + 1).join(':')
}