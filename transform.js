const REG_EXP = /(```\w+\{)(.+)(\})/g;

module.exports = function({ source }, api, options) {

  const newSource = source.replace(REG_EXP, function(match, left, numbers, right) {
    const updatedNumbers = numbers.split(',').map(numberString => {
      return numberString.split('-').map(number => number - 1).join('-');
    }).join(',');
    return left + updatedNumbers + right;
  });
  return newSource;
};