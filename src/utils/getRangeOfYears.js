export const getRangeOfYears = (n) => {
    const actualYear = new Date().getFullYear()

    const maxYear = Math.min(n + 5, actualYear)
    const minYear = maxYear - 10

    return new Array(10).fill()
        .map((_, index) => minYear + index)
        .filter(y => y !== n) 
        .map(String)
}
/*export const getRangeOfYears = (n) => {
    const randomYears = [],
    actualYear = (new Date()).getFullYear(),
    maxYear = (n + 5 < actualYear) ? n + 5 : actualYear,
    minYear = (n + 5 < actualYear) ? n - 5 : actualYear - 10;

    for (let i = minYear; i < maxYear; i++) {
        (i!==n) && randomYears.push((i).toString());
    }

    return randomYears;

}*/

/*export const getRangeOfYears = (n) => {
    const actualYear = new Date().getFullYear()

    const maxYear = Math.min(n + 5, actualYear)
    const minYear = maxYear - 10

    return new Array(10).fill()
        .map((_, index) => minYear + index)
        .filter(y => y !== n) 
        .map(String)
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const pickRandom = (n, years) => {
 shuffleArray(years) 
  return new Array(n).fill().
  map((_, index) => years[index])
}

const addValidYear = (year, years) => {
 years.push(year.toString()) 
  return years
}

const generateAnswers = (year) => {
 const result = addValidYear(year, pickRandom(3, getRangeOfYears(year)))
  shuffleArray(result)
  return result
}

console.log(generateAnswers(1989))*/