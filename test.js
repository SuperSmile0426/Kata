const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "septante", "huitante", "nonante"];

function twoDigitToWords(num, backStatus) {
  const specialCases = {71: "soixante-et-onze", 81: "quatre-vingt-un", 91: "quatre-vingt-onze"};
  if (specialCases[num]) return specialCases[num];
  if (num < 17) return units[num];

  const ten = Math.floor(num / 10);
  const unit = num % 10;
  const nineTen = num - 4 * 20;
  const nineExtra = nineTen % 10;

  if (unit == 0 && ten != 8) return tens[ten];
  if (ten <= 6) return tens[ten] + '-' + (unit == 1 ? "et-" + units[unit] : units[unit]);
  if (ten == 7) return tens[6] + "-" + units[unit];

  if (num == 80) {
    return units[4] + "-" + tens[2] + (backStatus == false? "s": "")
  } else {
    return units[4] + "-" + tens[2] + "-" + (nineTen < 16 ? units[nineExtra] : tens[1] + "-" + units[nineExtra]);
  }
}

function threeDigitToWords(num, backStatus) {
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;

  if (remainder == 0) return units[hundred] + "-cents";

  const hundredPart = hundred === 1 ? "cent-" : units[hundred] + "-cent-";
  const remainderPart = twoDigitToWords(remainder, backStatus);

  return hundredPart + remainderPart;
}

function getThousandFrenchWords(num) {
  return num >= 100 ? threeDigitToWords(num, true) + "-milles" : num >= 10 ? twoDigitToWords(num, true) + "-milles" : units[num] + "-milles";
}

function aboveThousandToWords(num) {
  const thousand = Math.floor(num / 1000);
  const remainder = num % 1000;

  if (remainder == 0) return getThousandFrenchWords(thousand);

  const thousandPart = thousand === 1 ? "mille" : getThousandFrenchWords(thousand);
  const remainderPart = remainder > 100 ? threeDigitToWords(remainder, false): twoDigitToWords(remainder, false);

  return `${thousandPart}-${remainderPart}`;
}

function numberToFrenchWords(number) {
  if (number === 0) return "zéro";
  if (number == 100) return "cent";
  if (number == 1000) return "mille";

  return number < 100 ? twoDigitToWords(number, false) : number < 1000 ? threeDigitToWords(number, false) : aboveThousandToWords(number);
}

// Test the function with the provided dataset
const numbers = [0, 1, 5, 10, 11, 15, 20, 21, 30, 35, 50, 51, 68, 70, 80, 75, 99, 100, 101, 105, 111, 123, 168, 171, 175, 199, 200, 201, 555, 999, 1000, 1001, 1111, 1199, 1234, 1999, 2000, 2001, 2020, 2021, 2345, 9999, 10000, 11111, 12345, 123456, 654321, 880001, 999999];
const frenchWords = numbers.map(numberToFrenchWords);
console.log(frenchWords);
  
