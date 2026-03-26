import { Annotations, Config, Layout, PlotData } from 'plotly.js'

import dynamic from 'next/dynamic'

import { convert, linspace } from '@/lib/calcs'
import { curvePoints, hue, legend_text, line_dash, startLevel, startSaturation } from '@/lib/constants'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

const graphData = (data: MeasurementResults, unitSystem: UnitSystem): Partial<PlotData>[] => {
  var output: Partial<PlotData>[] = []
  var min_coord: Point = { x: +1000, y: 0 }
  var max_coord: Point = { x: -1000, y: 0 }

  for (const key of Object.keys(data) as MeasurementKey[]) {
    const distribution = data[key]
    if (!distribution) continue

    if (distribution.curve.x[0] < min_coord.x) {
      min_coord = {
        x: distribution.curve.x[0],
        y: distribution.curve.y[0],
      }
    }
    if (distribution.curve.x[curvePoints - 1] > max_coord.x) {
      max_coord = {
        x: distribution.curve.x[curvePoints - 1],
        y: distribution.curve.y[curvePoints - 1],
      }
    }

    // Distribution Curve
    output.push({
      x: distribution.curve.x,
      y: distribution.curve.y,
      type: 'scatter',
      mode: 'lines',
      name: legend_text[key],
      line: {
        color: `hsla(${hue[key]}, ${startSaturation}, ${startLevel}, 1)`,
        dash: line_dash[key],
        width: 4,
      },
    })

    // Area Fill
    output.push({
      x: distribution.curve.x,
      y: distribution.curve.y,
      type: 'scatter',
      mode: 'lines',
      showlegend: false,
      line: { color: `hsla(${hue[key]}, ${startSaturation / 3}, ${startLevel}, 0)` },
      fill: 'tozeroy',
    })

    // Mean and Standard Deviations
    distribution.hlines.forEach((hline) => {
      output.push({
        x: hline.x,
        y: hline.y,
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        line: {
          color: `hsla(${hue[key]}, ${startSaturation}, ${startLevel}, 1)`,
          width: 5,
        },
      })
    })
  }

  return output
}

const bounds = (data: MeasurementResults) => {
  var xmin = Math.min(...Object.values(data).map((i) => Math.min(...i.curve.x)))
  var xmax = Math.max(...Object.values(data).map((i) => Math.max(...i.curve.x)))
  var ymin = Math.min(...Object.values(data).map((i) => Math.min(...i.curve.y)))
  var ymax = Math.max(...Object.values(data).map((i) => Math.max(...i.curve.y)))
  return { xmin, xmax, ymin, ymax }
}

const modRanges = (minVal: number, maxVal: number, modulo: number) => {
  return [minVal - (minVal % modulo), maxVal + modulo - (maxVal % modulo)]
}

const padRanges = (minVal: number, maxVal: number, percent: number) => {
  var padding = ((maxVal - minVal) * percent) / 100
  return [minVal - padding, maxVal + padding]
}

const range = (start: number, stop: number, length: number) => {
  var step = (stop - start) / length
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
}

const xticks = (minVal: number, maxVal: number, unitSystem: UnitSystem): TickInfo => {
  var tickUnit: unit = unitSystem == 'Metric' ? 'cm' : 'in'
  var dispUnit: unit = unitSystem == 'Metric' ? 'mm' : 'in'
  var modulo: number = unitSystem == 'Metric' ? 1 : 0.5

  var [minimum, maximum] = modRanges(convert(minVal, 'mm', tickUnit), convert(maxVal, 'mm', tickUnit), modulo)

  var intervals = (maximum - minimum) / modulo
  if (intervals < 4) {
    intervals = intervals * 2
  }
  if (intervals > 7) {
    intervals = intervals / 2
  }

  var tickvals = range(minimum, maximum, intervals)

  return {
    range: [convert(minimum, tickUnit, 'mm') - 1, convert(maximum, tickUnit, 'mm') + 1],
    tickvals: tickvals.map((i) => convert(i, tickUnit, 'mm')),
    ticktext: tickvals.map((tick) => convert(tick, tickUnit, dispUnit).toString()),
  }
}

const graphLayout = (data: MeasurementResults, unitSystem: UnitSystem): Partial<Layout> => {
  const { xmin, xmax, ymax } = bounds(data)

  return {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#CABC9E',
      size: 16,
      weight: 600,
    },
    xaxis: {
      gridcolor: '#666',
      ticklabelstandoff: -15,
      ...xticks(xmin, xmax, unitSystem),
    },
    yaxis: {
      showgrid: false,
      visible: false,
      range: padRanges(0, ymax, 15),
    },
    legend: {
      orientation: 'h',
      x: 0.5,
      xref: 'paper',
      xanchor: 'center',
      y: 1,
      yref: 'paper',
      yanchor: 'bottom',
      entrywidthmode: 'fraction',
      entrywidth: 0.32,
    },
    height: 300,
    margin: {
      l: 20,
      r: 20,
      t: 40,
      b: 40,
      pad: 20,
    },
    autosize: true,
  }
}

const graphConfig: Partial<Config> = {
  staticPlot: true,
  responsive: true,
}

interface TrackLengthGraphProps {
  data: MeasurementResults
  unitSystem: UnitSystem
}
const TrackLengthGraph: React.FC<TrackLengthGraphProps> = ({ data, unitSystem }) => {
  return (
    <Plot
      data={graphData(data, unitSystem)}
      layout={graphLayout(data, unitSystem)}
      config={graphConfig}
      className='w-full'
    />
  )
}

export default TrackLengthGraph
