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
  shod: MeasurementResults
  unshod: MeasurementResults
  best: 'insole' | 'nominal' | 'height'
}

type Classification = "Men's" | "Women's" | 'Youth'
type Sex = 'Male' | 'Female'

type Fraction = {
  whole: number
  numerator: number
  denominator: number
}

type unit = 'mm' | 'cm' | 'in'
