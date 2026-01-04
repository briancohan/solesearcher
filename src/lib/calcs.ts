/**
 * Main function to calculate shoe size from insole, nominal, or height
 *
 * This will calculate the values for all metrics, but will also
 * indicate which is the best for the app to use. The order in which the
 * calcs are done (height, nominal, insole) are in reverse order of
 * best metric so that returnObj.best will be overwritten as necessary.
 */
export default function calculateMeasurements(
  insole: number,
  nominal: number,
  classification: Classification,
  height: number,
  sex: Sex,
): Results {
  const returnObj: Results = { shoe: {}, foot: {}, best: 'insole' }

  if (height) {
    returnObj.shoe.height = shoeFromHeight(height, sex)
    returnObj.foot.height = footFromHeight(height, sex)
    returnObj.best = 'height'
  }
  if (nominal) {
    returnObj.shoe.nominal = shoeFromNominal(nominal, classification, height, sex)
    returnObj.foot.nominal = footFromNominal(nominal, classification, height, sex)
    returnObj.best = 'nominal'
  }
  if (insole) {
    returnObj.shoe.insole = shoeFromInsole(insole)
    returnObj.foot.insole = footFromInsole(insole)
    returnObj.best = 'insole'
  }

  return returnObj
}

function modelPrediction(value: number, model: LinearModel): Measurement {
  const { slope, intercept, error } = model

  var avg = slope * value + intercept

  return {
    avg: avg,
    lower: avg - error,
    upper: avg + error,
  }
}

/**
 * Insole Length Calculations
 */
function shoeFromInsole(insole: number): Measurement {
  return modelPrediction(insole, {
    slope: 1.07534,
    intercept: 11.30536,
    error: 12.07
  })
}

function footFromInsole(insole: number): Measurement {
  return modelPrediction(insole, {
    slope: 0.92034,
    intercept: 15.12528,
    error: 8.342
  })
}

function modelPrediction2(input: MultiModelInput): Measurement {
  const {nominal, classification, height, sex} = input

  let error = 11.53

  let avg = 208.9104
  avg += 38.426 * (sex == "Male" ? 1 : 0)
  avg += 7.8157 * nominal

  switch (classification) {
    case "Child - US":
      avg += nominal * -8.76548
    case "Men's - US":
      avg += nominal * 1.1723
    case "Women's - US":
      avg += nominal * -0.6432
    case "Youth - US":
      avg += nominal * -0.4718
    case "Unknown - US":
      avg += nominal * 0
  }

  // avg = 216.0115 + 8.3310 * nominal

  return {
    avg: avg,
    lower: avg - error,
    upper: avg + error,
  }
}

/**
 * Nominal Shoe Size Calculations
 */
function shoeFromNominal(nominal: number, classification: Classification, height: number, sex: Sex): Measurement {
  let input = {nominal: nominal, classification: classification, height: height, sex: sex}

  switch (classification) {
    case "European":
      return modelPrediction(nominal, {
        slope: 6.7967,
        intercept: 4.247,
        error: 9.805
      })
    case "Men's - US":
      return modelPrediction(nominal, {
        slope: 0,
        intercept: 0,
        error: 11.53
      })
    case "Women's - US":
      return modelPrediction2(input)
    case 'Youth - US':
      return modelPrediction2(input)
    case 'Child - US':
      return modelPrediction2(input)
    case 'Unknown - US':
      return modelPrediction2(input)
  }
}

function footFromNominal(nominal: number, classification: Classification, height: number, sex: Sex): Measurement {
  let input = {nominal: nominal, classification: classification, height: height, sex: sex}

  switch (classification) {
    case "European":
      return modelPrediction(nominal, {
        slope: 5.9549,
        intercept: 2.8669,
        error: 8.926
      })
    case "Men's - US":
      return modelPrediction2(input)
    case "Women's - US":
      return modelPrediction2(input)
    case 'Youth - US':
      return modelPrediction2(input)
    case 'Child - US':
      return modelPrediction2(input)
    case 'Unknown - US':
      return modelPrediction2(input)
  }
}

/**
 * Height Calculations
 */
function shoeFromHeight(height: number, sex: Sex): Measurement {
  switch (sex) {
    case "Female":
      return modelPrediction(height, {
        slope: 0.145755,
        intercept: 30.617001,
        error: 13.79
      })
    case "Male":
      return modelPrediction(height, {
        slope: 0.145755,
        intercept: 30.617001 + 13.872472,
        error: 13.79
      })
  }
}

function footFromHeight(height: number, sex: Sex): Measurement {
  switch (sex) {
    case "Female":
      return modelPrediction(height, {
        slope: 0.128018,
        intercept: 27.776861,
        error: 11.36
      })
    case "Male":
      return modelPrediction(height, {
        slope: 0.128018,
        intercept: 27.776861 + 8.318914,
        error: 11.36
      })
  }
}
