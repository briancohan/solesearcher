const floatToFraction = (value: number, denominator = 16): Fraction => {
  const whole = Math.floor(value)
  const remain = value - whole
  let gradation = 1 / denominator
  let numerator = Math.floor(remain / gradation)

  if (remain < gradation) {
    numerator = 0
  }

  while (numerator % 2 == 0 && denominator > 1) {
    if (numerator == 0) {
      break
    }
    numerator = numerator / 2
    denominator = denominator / 2
  }

  return { whole, numerator, denominator }
}

export default floatToFraction
