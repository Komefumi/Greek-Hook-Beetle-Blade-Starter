function dummy(strings, ...vals) {
  let finalString = '';
  let idx = 0;

  while (idx < strings.length) {
    finalString += strings[idx];
    if (typeof vals[idx] !== "undefined") finalString += vals[idx];
    idx++;
  }

  return finalString;
}

export default dummy;
