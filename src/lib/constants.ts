export const curvePoints = 50
export const startSaturation = 75
export const startLevel = 70

const startHue = 40
export const hue: Partial<Record<MeasurementKey, number>> = {
  insole: startHue,
  nominal: startHue + 120,
  height: startHue + 240,
}

export const legend_text: { [id: string]: any } = {
  insole: 'Insole',
  nominal: 'Size',
  height: 'Height',
}

export const line_dash: { [id: string]: any } = {
  insole: 'dash',
  nominal: 'dot',
  height: 'solid',
}
