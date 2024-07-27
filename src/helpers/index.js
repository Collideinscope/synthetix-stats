function abbreviateNumber(number) {
  const num = Number(number);
  if (isNaN(num)) {
    return 'Invalid';
  }
  const abbreviations = [
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];
  const abbreviation = abbreviations.find(abbr => Math.abs(num) >= abbr.value);
  let result;
  if (abbreviation) {
    if (abbreviation.symbol === 'K') {
      // For thousands, round to the nearest integer
      result = Math.round(num / abbreviation.value).toString();
    } else {
      // For millions and billions, keep up to 2 decimal places
      result = (num / abbreviation.value).toFixed(2).replace(/\.00$/, '');
    }
    result += abbreviation.symbol;
  } else {
    result = num.toFixed(2);
  }
  return result;
}

export {
  abbreviateNumber
};