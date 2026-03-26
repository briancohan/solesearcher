type ModelResults = {
  avg: number
  lower: number
  upper: number
  curve: ScatterData
  hlines: ScatterData[]
}

type MeasurementResults = {
  insole?: ModelResults
  nominal?: ModelResults
  height?: ModelResults
}
type MeasurementKey = keyof MeasurementResults

type Results = {
  shoe: MeasurementResults
  foot: MeasurementResults
}

type Classification = "Men's - US" | "Women's - US" | 'Youth - US' | 'Child - US' | 'European'
type Sex = 'Male' | 'Female'
type UnitSystem = 'Metric' | 'Imperial'

type Fraction = {
  whole: number
  numerator: number
  denominator: number
}

type unit = 'mm' | 'cm' | 'in'

type LinearModel = {
  slope: number
  intercept: number
  rse: number
  n: integer
  sos: number
  xMean: number
}

type ScatterData = {
  x: number[]
  y: number[]
}

type Point = {
  x: number
  y: number
}

type TickInfo = {
  tickvals?: number[]
  ticktext?: string[]
  range: number[]
}

type xanchor = 'left' | 'center' | 'right' | 'auto' | undefined
