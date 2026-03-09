/**
 * Main function to calculate shoe size from insole, nominal, or height
 *
 * This will calculate the values for all metrics, but will also
 * indicate which is the best for the app to use. The order in which the
 * calcs are done (height, nominal, insole) are in reverse order of
 * best metric so that returnObj.best will be overwritten as necessary.
 */
var { jStat } = require('jstat')
import {
  modelFootFromHeightFemale,
  modelFootFromHeightMale,
  modelFootFromInsole,
  modelFootFromNominalChild,
  modelFootFromNominalEuropean,
  modelFootFromNominalMen,
  modelFootFromNominalWomen,
  modelFootFromNominalYouth,
  modelShoeFromHeightFemale,
  modelShoeFromHeightMale,
  modelShoeFromInsole,
  modelShoeFromNominalChild,
  modelShoeFromNominalEuropean,
  modelShoeFromNominalMen,
  modelShoeFromNominalWomen,
  modelShoeFromNominalYouth,
} from "@/lib/models"

export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function linspace(start: number, stop: number, numPoints: number): number[] {
  // Validate input types
  if (typeof start !== 'number' || typeof stop !== 'number') {
    throw new TypeError('start and stop must be numbers');
  }
  if (typeof numPoints !== 'number' || !Number.isInteger(numPoints) || numPoints < 1) {
    throw new Error('numPoints must be a positive integer (≥ 1)');
  }

  // Handle single point case
  if (numPoints === 1) {
    return [start];
  }

  // Calculate step size and generate array
  const step = (stop - start) / (numPoints - 1);
  return Array.from({ length: numPoints }, (_, i) => start + i * step);
}

export default function calculateMeasurements(
  insole: number,
  nominal: number,
  classification: Classification,
  height: number,
  sex: Sex,
): Results {
  const returnObj: Results = { shoe: {}, foot: {}, best: 'insole' }
  if (insole) {
    returnObj.shoe.insole = shoeFromInsole(insole)
    returnObj.foot.insole = footFromInsole(insole)
    returnObj.best = 'insole'
  }
  if (nominal) {
    returnObj.shoe.nominal = shoeFromNominal(nominal, classification)
    returnObj.foot.nominal = footFromNominal(nominal, classification)
    returnObj.best = 'nominal'
  }
  if (height) {
    returnObj.shoe.height = shoeFromHeight(height, sex)
    returnObj.foot.height = footFromHeight(height, sex)
    returnObj.best = 'height'
  }

  return returnObj
}

export function normal(x: number, mu: number, sigma: number): number {
  var coeff = 1 / (Math.sqrt(2 * Math.PI * Math.pow(sigma, 2)))
  var exp = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2))
  return coeff * Math.exp(exp)
}

export function normalCurve(mu: number, sigma: number, xmin: number, xmax: number, nPoints: number = 100): ScatterData {
  var x = linspace(xmin, xmax, nPoints)
  var y = x.map((x) => normal(x, mu, sigma))
  return { x, y }
}

function modelPrediction(value: number, model: LinearModel): ModelResults {
  const { slope, intercept, rse, n, sos, xMean } = model

  var avg = slope * value + intercept
  var tCrit = jStat.studentt.inv(0.95, n - 2)

  var stdError = Math.sqrt(Math.pow(rse, 2) * (1 + 1 / n + Math.pow(value - xMean, 2) / sos))
  var margin = tCrit * stdError

  // we're using a 95% prediction interval which is approximately 2 standard deviations
  // the standard distribution of the interval is assumed to be half the margin needed
  // to cover the desired prediction interval.
  var sigma = margin / 2
  var lower = avg - margin
  var upper = avg + margin

  var curve = normalCurve(avg, sigma, lower, upper)

  // var hlines: ScatterData[] = [-2, -1, 0, 1, 2].map((s) => {
  var hlines: ScatterData[] = [0].map((s) => {
    var _x = avg + (s * sigma)
    var _y = normal(_x, avg, sigma)
    return { x: [_x, _x], y: [0, _y] }
  })

  return {
    avg,
    lower,
    upper,
    hlines,
    curve,
  }
}

function shoeFromInsole(insole: number): ModelResults {
  return modelPrediction(insole, modelShoeFromInsole)
}

function footFromInsole(insole: number): ModelResults {
  return modelPrediction(insole, modelFootFromInsole)
}

function shoeFromNominal(nominal: number, classification: Classification): ModelResults {
  switch (classification) {
    case 'European':
      return modelPrediction(nominal, modelShoeFromNominalEuropean)
    case "Men's - US":
      return modelPrediction(nominal, modelShoeFromNominalMen)
    case "Women's - US":
      return modelPrediction(nominal, modelShoeFromNominalWomen)
    case 'Youth - US':
      return modelPrediction(nominal, modelShoeFromNominalYouth)
    case 'Child - US':
      return modelPrediction(nominal, modelShoeFromNominalChild)
  }
}

function footFromNominal(nominal: number, classification: Classification): ModelResults {
  switch (classification) {
    case 'European':
      return modelPrediction(nominal, modelFootFromNominalEuropean)
    case "Men's - US":
      return modelPrediction(nominal, modelFootFromNominalMen)
    case "Women's - US":
      return modelPrediction(nominal, modelFootFromNominalWomen)
    case 'Youth - US':
      return modelPrediction(nominal, modelFootFromNominalYouth)
    case 'Child - US':
      return modelPrediction(nominal, modelFootFromNominalChild)
  }
}

function shoeFromHeight(height: number, sex: Sex): ModelResults {
  switch (sex) {
    case 'Female':
      return modelPrediction(height, modelShoeFromHeightFemale)
    case 'Male':
      return modelPrediction(height, modelShoeFromHeightMale)
  }
}

function footFromHeight(height: number, sex: Sex): ModelResults {
  switch (sex) {
    case 'Female':
      return modelPrediction(height, modelFootFromHeightFemale)
    case 'Male':
      return modelPrediction(height, modelFootFromHeightMale)
  }
}
