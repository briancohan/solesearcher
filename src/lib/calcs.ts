import convert from './convert'
/**
 * Main function to calculate shoe size from insole, nominal, or height
 */
export default function calculateMeasurements(
  insole: number,
  nominal: number,
  classification: Classification,
  height: number,
  sex: Sex,
): Results {
  const returnObj: Results = { shod: {}, unshod: {}, best: 'insole' }

  if (height) {
    returnObj.shod.height = calculateShodFromHeight(height, sex)
    returnObj.unshod.height = calculateUnshodFromHeight(height, sex)
    returnObj.best = 'height'
  }
  if (nominal) {
    returnObj.shod.nominal = calculateShodFromnominal(nominal, classification)
    returnObj.unshod.nominal = calculateUnshodFromnominal(nominal, classification)
    returnObj.best = 'nominal'
  }
  if (insole) {
    returnObj.shod.insole = calculateShodFromInsole(insole)
    returnObj.unshod.insole = calculateUnshodFromInsole(insole)
    returnObj.best = 'insole'
  }
  return returnObj
}

/**
 * Insole Length Calculations
 */
function calculateUnshodFromInsole(insole: number): Measurement {
  return {
    avg: calculateAvgUnshodFromInsole(insole),
    lower: calculateLowerUnshodFromInsole(insole),
    upper: calculateUpperUnshodFromInsole(insole),
  }
}

function calculateShodFromInsole(insole: number): Measurement {
  return {
    avg: calculateAvgShodFromInsole(insole),
    lower: calculateLowerShodFromInsole(insole),
    upper: calculateUpperShodFromInsole(insole),
  }
}

function calculateAvgShodFromInsole(insole: number): number {
  return insole * 1.03 + 18
}

function calculateAvgUnshodFromInsole(insole: number): number {
  return insole * 0.92 + 12
}

function calculateLowerShodFromInsole(insole: number): number {
  return insole * 1.03 - 4.55
}

function calculateUpperShodFromInsole(insole: number): number {
  return insole * 1.03 + 40.56
}

function calculateLowerUnshodFromInsole(insole: number): number {
  return (
    calculateLowerShodFromInsole(insole) - (calculateAvgShodFromInsole(insole) - calculateAvgUnshodFromInsole(insole))
  )
}

function calculateUpperUnshodFromInsole(insole: number): number {
  return (
    calculateUpperShodFromInsole(insole) - (calculateAvgShodFromInsole(insole) - calculateAvgUnshodFromInsole(insole))
  )
}

/**
 * Nominal Shoe Size Calculations
 */
function calculateUnshodFromnominal(nominal: number, classification: Classification): Measurement {
  switch (classification) {
    case "Men's":
      return {
        avg: nominal * 6.169578261 + 212,
        lower: nominal * 6.169538261 + 189,
        upper: nominal * 6.16961913 + 236,
      }
      break
    case "Women's":
      return {
        avg: nominal * 6.361212 + 203,
        lower: nominal * 6.361212 + 178,
        upper: nominal * 6.361212 + 223,
      }
      break
    case 'Youth':
      return {
        avg: nominal * 6.242857143 + 134,
        lower: nominal * 6.242857143 + 110,
        upper: nominal * 6.242857143 + 155,
      }
      break
  }
}

function calculateShodFromnominal(nominal: number, classification: Classification): Measurement {
  switch (classification) {
    case "Men's":
      return {
        avg: 8.6 * nominal + 215,
        lower: 8.499565882 * nominal + 192,
        upper: 8.440527059 * nominal + 237,
      }
      break
    case "Women's":
      return {
        avg: 9.8 * nominal + 192,
        lower: 9.687246 * nominal + 170,
        upper: 9.918858 * nominal + 215,
      }
      break
    case 'Youth':
      return {
        avg: 8.7 * nominal + 105,
        lower: 8.732732727 * nominal + 93,
        upper: 8.737778182 * nominal + 117,
      }
      break
  }
}

/**
 * Height Calculations
 */
function calculateShodFromHeight(height: number, sex: Sex): Measurement {
  const { avg, lower, upper } = calculateUnshodFromHeight(height, sex)
  const offset = 25.4

  return {
    avg: avg + offset,
    lower: lower + offset,
    upper: upper + offset,
  }
}

function calculateUnshodFromHeight(height: number, sex: Sex): Measurement {
  const ci95 = 1.96
  return {
    avg: convert(calculateUnshodAvgFromHeight(height, sex, 0), 'cm', 'mm'),
    lower: convert(calculateUnshodAvgFromHeight(height, sex, -ci95), 'cm', 'mm'),
    upper: convert(calculateUnshodAvgFromHeight(height, sex, ci95), 'cm', 'mm'),
  }
}

function calculateUnshodAvgFromHeight(height: number, sex: Sex, errorFactor: number): number {
  console.log(height)
  const male = {
    m: 3.447,
    b: 82.206,
    sigma: 4.856,
  }
  const female = {
    m: 3.614,
    b: 75.065,
    sigma: 4.7,
  }

  switch (sex) {
    case 'Male':
      return (height + male.sigma * errorFactor - male.b) / male.m
    case 'Female':
      return (height + female.sigma * errorFactor - female.b) / female.m
  }
}
