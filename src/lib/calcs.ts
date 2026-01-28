/**
 * Main function to calculate shoe size from insole, nominal, or height
 *
 * This will calculate the values for all metrics, but will also
 * indicate which is the best for the app to use. The order in which the
 * calcs are done (height, nominal, insole) are in reverse order of
 * best metric so that returnObj.best will be overwritten as necessary.
 */
var { jStat } = require('jstat')

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
    returnObj.shoe.nominal = shoeFromNominal(nominal, classification)
    returnObj.foot.nominal = footFromNominal(nominal, classification)
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
  const { slope, intercept, rse, n, sos, xMean } = model

  var avg = slope * value + intercept
  var tCrit = jStat.studentt.inv(0.95, n - 2)

  var sPred = Math.sqrt(Math.pow(rse, 2) * (1 + 1 / n + Math.pow(value - xMean, 2) / sos))
  var margin = tCrit * sPred

  return {
    avg: avg,
    lower: avg - margin,
    upper: avg + margin,
  }
}

/**
 * Insole Length Calculations
 */
// Model757_SPL_3OverAIL
// lm(formula = SPL ~ OverAIL, data = SoleDATA_train)

// Residuals:
//      Min       1Q   Median       3Q      Max
// -30.0716  -8.4954  -0.3599   9.1777  29.7161

// Coefficients:
//             Estimate Std. Error t value Pr(>|t|)
// (Intercept) 16.04505    9.99513   1.605    0.111
// OverAIL      1.07153    0.03927  27.290   <2e-16 ***
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 11.98 on 129 degrees of freedom
//   (240 observations deleted due to missingness)
// Multiple R-squared:  0.8524,	Adjusted R-squared:  0.8512
// F-statistic: 744.7 on 1 and 129 DF,  p-value: < 2.2e-16
function shoeFromInsole(insole: number): Measurement {
  return modelPrediction(insole, {
    slope: 1.07153,
    intercept: 16.04505,
    rse: 11.98,
    n: 130,
    sos: 18518.7,
    xMean: 253.155,
  })
}

// Model759_FPL_3OverAIL
// lm(formula = FPL ~ OverAIL, data = SoleDATA_train)

// Residuals:
//     Min      1Q  Median      3Q     Max
// -23.206  -5.187  -0.206   6.011  19.072

// Coefficients:
//             Estimate Std. Error t value Pr(>|t|)
// (Intercept)  8.82965    7.44924   1.185    0.238
// OverAIL      0.95186    0.02926  32.527   <2e-16 ***
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 8.93 on 129 degrees of freedom
//   (240 observations deleted due to missingness)
// Multiple R-squared:  0.8913,	Adjusted R-squared:  0.8905
// F-statistic:  1058 on 1 and 129 DF,  p-value: < 2.2e-16
function footFromInsole(insole: number): Measurement {
  return modelPrediction(insole, {
    slope: 0.95186,
    intercept: 8.82965,
    rse: 8.93,
    n: 130,
    sos: 10286.2,
    xMean: 253.155,
  })
}

/**
 * Nominal Shoe Size Calculations
 */
// Model753_SPL_2EU = lm(SPL ~ EU, SoleDATA_train)
// lm(formula = SPL ~ EU, data = SoleDATA_train)

// Residuals:
//     Min      1Q  Median      3Q     Max
// -48.868  -7.065   0.237   6.474  30.264

// Coefficients:
//             Estimate Std. Error t value Pr(>|t|)
// (Intercept)  10.3269     5.4540   1.893   0.0592 .
// EU            6.6319     0.1326  50.013   <2e-16 ***
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 10.75 on 326 degrees of freedom
//   (43 observations deleted due to missingness)
// Multiple R-squared:  0.8847,	Adjusted R-squared:  0.8843
// F-statistic:  2501 on 1 and 326 DF,  p-value: < 2.2e-16

// Model754_SPL_2SizeMWYC
// lm(formula = SPL ~ Size + Size:MWYC + MWYC, data = SoleDATA_train)

// Residuals:
//     Min      1Q  Median      3Q     Max
// -52.501  -6.618   0.143   6.870  32.193

// Coefficients:
//                  Estimate Std. Error t value Pr(>|t|)
// (Intercept)      100.8215    15.7758   6.391 5.37e-10 ***
// Size               8.5342     1.4028   6.084 3.13e-09 ***
// MWYCMen's        120.0129    16.4339   7.303 1.98e-12 ***
// MWYCWomen's      100.5035    16.6035   6.053 3.72e-09 ***
// MWYCYouth        117.0270    16.4322   7.122 6.27e-12 ***
// Size:MWYCMen's    -0.5713     1.4678  -0.389    0.697
// Size:MWYCWomen's  -0.2204     1.5339  -0.144    0.886
// Size:MWYCYouth    -2.4232     1.8356  -1.320    0.188
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 10.86 on 344 degrees of freedom
//   (19 observations deleted due to missingness)
// Multiple R-squared:  0.8916,	Adjusted R-squared:  0.8894
// F-statistic: 404.3 on 7 and 344 DF,  p-value: < 2.2e-16
function shoeFromNominal(nominal: number, classification: Classification): Measurement {
  switch (classification) {
    case 'European':
      return modelPrediction(nominal, {
        slope: 6.6319,
        intercept: 10.3269,
        rse: 10.75,
        n: 327,
        sos: 37658.4,
        xMean: 40.886,
      })
    case "Men's - US":
      return modelPrediction(nominal, {
        slope: 8.5342 + -0.5713,
        intercept: 100.8215 + 120.0129,
        rse: 10.86,
        n: 172,
        sos: 21296.6,
        xMean: 10.48,
      })
    case "Women's - US":
      return modelPrediction(nominal, {
        slope: 8.5342 + -0.2204,
        intercept: 100.8215 + 100.5035,
        rse: 10.86,
        n: 138,
        sos: 15820.5,
        xMean: 8.2155,
      })
    case 'Youth - US':
      return modelPrediction(nominal, {
        slope: 8.5342 + -2.4232,
        intercept: 100.8215 + 117.027,
        rse: 10.86,
        n: 24,
        sos: 2806.1,
        xMean: 3.4423,
      })
    case 'Child - US':
      return modelPrediction(nominal, {
        slope: 8.5342 + 0,
        intercept: 100.8215 + 0,
        rse: 10.86,
        n: 18,
        sos: 649.33,
        xMean: 11.0667,
      })
  }
}

// Model755_FPL_2EU
// lm(formula = FPL ~ EU, data = SoleDATA_train)

// Residuals:
//     Min      1Q  Median      3Q     Max
// -25.634  -6.532   0.165   6.130  32.240

// Coefficients:
//             Estimate Std. Error t value Pr(>|t|)
// (Intercept)  14.1244     4.8180   2.932  0.00361 **
// EU            5.6502     0.1171  48.235  < 2e-16 ***
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 9.495 on 326 degrees of freedom
//   (43 observations deleted due to missingness)
// Multiple R-squared:  0.8771,	Adjusted R-squared:  0.8767
// F-statistic:  2327 on 1 and 326 DF,  p-value: < 2.2e-16

// Model756_FPL_2SizeMWYC
// lm(formula = FPL ~ Size + MWYC + Size:MWYC, data = SoleDATA_train)

// Residuals:
//     Min      1Q  Median      3Q     Max
// -34.432  -6.106   0.375   5.100  29.689

// Coefficients:
//                  Estimate Std. Error t value Pr(>|t|)
// (Intercept)       107.935     12.870   8.386 1.31e-15 ***
// Size                5.702      1.144   4.982 9.99e-07 ***
// MWYCMen's          77.296     13.407   5.765 1.81e-08 ***
// MWYCWomen's        68.039     13.546   5.023 8.19e-07 ***
// MWYCYouth          84.167     13.406   6.278 1.03e-09 ***
// Size:MWYCMen's      1.791      1.197   1.495    0.136
// Size:MWYCWomen's    1.647      1.251   1.316    0.189
// Size:MWYCYouth     -1.184      1.497  -0.791    0.430
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 8.86 on 344 degrees of freedom
//   (19 observations deleted due to missingness)
// Multiple R-squared:    0.9,	Adjusted R-squared:  0.898
// F-statistic: 442.3 on 7 and 344 DF,  p-value: < 2.2e-16
function footFromNominal(nominal: number, classification: Classification): Measurement {
  switch (classification) {
    case 'European':
      return modelPrediction(nominal, {
        slope: 5.6502,
        intercept: 14.1244,
        rse: 9.495,
        n: 327,
        sos: 29387.6,
        xMean: 40.886,
      })
    case "Men's - US":
      return modelPrediction(nominal, {
        slope: 5.702 + 1.791,
        intercept: 107.935 + 77.296,
        rse: 8.86,
        n: 172,
        sos: 12458.1,
        xMean: 10.479,
      })
    case "Women's - US":
      return modelPrediction(nominal, {
        slope: 5.702 + 1.647,
        intercept: 107.935 + 68.039,
        rse: 8.86,
        n: 138,
        sos: 10167.8,
        xMean: 8.2155,
      })
    case 'Youth - US':
      return modelPrediction(nominal, {
        slope: 5.702 + -1.184,
        intercept: 107.935 + 84.167,
        rse: 8.86,
        n: 24,
        sos: 3561.6,
        xMean: 3.4423,
      })
    case 'Child - US':
      return modelPrediction(nominal, {
        slope: 5.702 + 0,
        intercept: 107.935 + 0,
        rse: 8.86,
        n: 18,
        sos: 816.4,
        xMean: 11.0667,
      })
  }
}

/**
 * Height Calculations
 */
// Model751_SPL_1HS
// lm(formula = SPL ~ Height + Sex + Height:Sex, data = SoleDATA_train)

// Residuals:
//     Min      1Q  Median      3Q     Max
// -64.266  -8.110   0.435   9.604  38.062

// Coefficients:
//                  Estimate Std. Error t value Pr(>|t|)
// (Intercept)     49.493764  10.506877   4.711 3.51e-06 ***
// Height           0.134215   0.006574  20.415  < 2e-16 ***
// SexMale        -12.741260  14.319499  -0.890   0.3742
// Height:SexMale   0.016243   0.008646   1.879   0.0611 .
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 14.49 on 366 degrees of freedom
//   (1 observation deleted due to missingness)
// Multiple R-squared:  0.8151,	Adjusted R-squared:  0.8136
// F-statistic: 537.9 on 3 and 366 DF,  p-value: < 2.2e-16
function shoeFromHeight(height: number, sex: Sex): Measurement {
  switch (sex) {
    case 'Female':
      return modelPrediction(height, {
        slope: 0.134215,
        intercept: 49.493764,
        rse: 14.49,
        n: 184,
        sos: 44429.1,
        xMean: 1589.91,
      })
    case 'Male':
      return modelPrediction(height, {
        slope: 0.134215 + 0.016243,
        intercept: 49.493764 + -12.74126,
        rse: 14.49,
        n: 186,
        sos: 32464.66,
        xMean: 1722.18,
      })
  }
}

// Model752_FPL_1HS
// lm(formula = FPL ~ Height + Sex + Height:Sex, data = SoleDATA_train)

// Residuals:
//     Min      1Q  Median      3Q     Max
// -51.278  -6.791   0.346   6.749  30.087

// Coefficients:
//                  Estimate Std. Error t value Pr(>|t|)
// (Intercept)     38.822789   8.113295   4.785 2.48e-06 ***
// Height           0.120682   0.005077  23.772  < 2e-16 ***
// SexMale        -16.091595  11.057360  -1.455   0.1464
// Height:SexMale   0.014910   0.006676   2.233   0.0261 *
// ---
// Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

// Residual standard error: 11.19 on 366 degrees of freedom
//   (1 observation deleted due to missingness)
// Multiple R-squared:  0.8469,	Adjusted R-squared:  0.8457
// F-statistic:   675 on 3 and 366 DF,  p-value: < 2.2e-16
function footFromHeight(height: number, sex: Sex): Measurement {
  switch (sex) {
    case 'Female':
      return modelPrediction(height, {
        slope: 0.120682,
        intercept: 38.822789,
        rse: 11.19,
        n: 184,
        sos: 23799.4,
        xMean: 1589.91,
      })
    case 'Male':
      return modelPrediction(height, {
        slope: 0.120682 + 0.01491,
        intercept: 38.822789 + -16.091595,
        rse: 11.19,
        n: 186,
        sos: 22050.5,
        xMean: 1722.18,
      })
  }
}
