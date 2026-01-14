type Measurement = {
  avg: number
  lower: number
  upper: number
}

type MeasurementResults = {
  insole?: Measurement
  nominal?: Measurement
  height?: Measurement
}

type Results = {
  shoe: MeasurementResults
  foot: MeasurementResults
  best: 'insole' | 'nominal' | 'height'
}

type Classification = "Men's - US" | "Women's - US" | 'Youth - US' | "Child - US" | "European"
type Sex = 'Male' | 'Female'

type Fraction = {
  whole: number
  numerator: number
  denominator: number
}

type unit = 'mm' | 'cm' | 'in'

type LinearModel = {
  slope: number,
  intercept: number,
  rse: number,
  n: integer,
  sos: number,
  xMean: number,
}
