import { Annotations, Config, Layout, PlotData } from 'plotly.js'

import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface TrackLengthGraphProps {
  data: MeasurementResults
}

const INSOLE = 'Insole Length'
const NOMINAL = 'Nominal Size'
const HEIGHT = 'Subject Height'

const graphData = (data: MeasurementResults): Partial<PlotData>[] => {
  const line_trace_properties: Partial<PlotData> = {
    mode: 'lines+markers',
    type: 'scatter',
    line: {
      color: '#CABC9E',
      width: 20,
    },
    marker: {
      color: '#CABC9E',
      size: 20,
    },
    showlegend: false,
  }
  const dot_trace_properties: Partial<PlotData> = {
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: '#758063',
      size: 18,
    },
    showlegend: false,
  }

  var output: Partial<PlotData>[] = []

  if (data.insole) {
    output.push({
      x: [data.insole.lower, data.insole.upper],
      y: [INSOLE, INSOLE],
      ...line_trace_properties,
    })
    output.push({
      x: [data.insole.avg],
      y: [INSOLE],
      ...dot_trace_properties,
    })
  }

  if (data.nominal) {
    output.push({
      x: [data.nominal.lower, data.nominal.upper],
      y: [NOMINAL, NOMINAL],
      ...line_trace_properties,
    })
    output.push({
      x: [data.nominal.avg],
      y: [NOMINAL],
      ...dot_trace_properties,
    })
  }

  if (data.height) {
    // output.push({
    //     x: [data.height.lower, data.height.upper],
    //     y: [HEIGHT, HEIGHT],
    //     ...line_trace_properties
    // });
    output.push({
      x: [data.height.avg],
      y: [HEIGHT],
      ...dot_trace_properties,
    })
  }

  return output
}

const graphLayout = (data: MeasurementResults): Partial<Layout> => {
  var categories = []
  var annotations: Array<Partial<Annotations>> = []

  const annotationOpts: Partial<Annotations> = {
    xref: 'x',
    yref: 'y',
    showarrow: false,
    yanchor: 'bottom',
    yshift: 12,
    font: { color: 'white', size: 14 },
    xanchor: 'center',
  }

  // Height
  if (data.height) {
    categories.push(HEIGHT)
    annotations.push({
      ...annotationOpts,
      y: HEIGHT,
      x: Math.round(data.height.avg).toString(),
      text: Math.round(data.height.avg).toString(),
    })
  }

  // Shoe Size
  if (data.nominal) {
    categories.push(NOMINAL)
    annotations.push({
      ...annotationOpts,
      y: NOMINAL,
      x: Math.round(data.nominal.avg).toString(),
      text: Math.round(data.nominal.avg).toString(),
    })
    annotations.push({
      ...annotationOpts,
      y: NOMINAL,
      x: Math.round(data.nominal.lower).toString(),
      text: Math.round(data.nominal.lower).toString(),
    })
    annotations.push({
      ...annotationOpts,
      y: NOMINAL,
      x: Math.round(data.nominal.upper).toString(),
      text: Math.round(data.nominal.upper).toString(),
    })
  }

  // Insole Length
  if (data.insole) {
    categories.push(INSOLE)
    annotations.push({
      ...annotationOpts,
      y: INSOLE,
      x: Math.round(data.insole.avg).toString(),
      text: Math.round(data.insole.avg).toString(),
    })
    annotations.push({
      ...annotationOpts,
      y: INSOLE,
      x: Math.round(data.insole.lower).toString(),
      text: Math.round(data.insole.lower).toString(),
    })
    annotations.push({
      ...annotationOpts,
      y: INSOLE,
      x: Math.round(data.insole.upper).toString(),
      text: Math.round(data.insole.upper).toString(),
    })
  }

  return {
    title: 'Predicted Ranges - mm',
    xaxis: {
      showgrid: false,
      visible: false,
    },
    yaxis: {
      categoryarray: categories,
      showgrid: false,
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#CABC9E',
    },
    height: 50 + 60 * categories.length,
    margin: {
      l: 100,
      r: 0,
      t: 30,
      b: 0,
      pad: 10,
    },
    annotations,
    autosize: true,
  }
}

const graphConfig: Partial<Config> = {
  staticPlot: true,
  responsive: true,
}

const TrackLengthGraph: React.FC<TrackLengthGraphProps> = ({ data }) => {
  return <Plot data={graphData(data)} layout={graphLayout(data)} config={graphConfig} className='w-full' />
}

export default TrackLengthGraph
