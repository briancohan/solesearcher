import { Annotations, Config, Layout, PlotData } from 'plotly.js'
import { hue, legend_text, line_dash, startSaturation, startLevel } from "@/lib/constants"
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface TrackLengthGraphProps {
    data: MeasurementResults
}

type MeasurementKey = keyof MeasurementResults


const graphData = (data: MeasurementResults): Partial<PlotData>[] => {
    var output: Partial<PlotData>[] = []

    for (const key of Object.keys(data) as MeasurementKey[]) {

        const distribution = data[key]
        if (!distribution) continue
        const color = hue[key]

        // Distribution Curve
        output.push({
            x: distribution.curve.x,
            y: distribution.curve.y,
            type: 'scatter',
            mode: 'lines',
            name: legend_text[key],
            line: {
                color: `hsla(${color}, ${startSaturation}, ${startLevel}, 1)`,
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
            line: { color: `hsla(${color}, ${startSaturation / 3}, ${startLevel}, 0)` },
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
                    color: `hsla(${color}, ${startSaturation}, ${startLevel}, 1)`,
                    width: 3,
                },
            })
        })
    }

    return output
}

const graphLayout = (data: MeasurementResults): Partial<Layout> => {
    var xmin = Math.round(Math.min(...Object.values(data).map((i) => Math.min(...i.curve.x))))
    var xmax = Math.round(Math.max(...Object.values(data).map((i) => Math.max(...i.curve.x))))
    var ymax = Math.max(...Object.values(data).map((i) => Math.max(...i.curve.y)))
    const yRnagePadding: number = 0.01

    // Show extents of data on graph
    let annotations: Array<Partial<Annotations>> = []
    Array(xmin, xmax).forEach((xval) => {
        annotations.push({
            x: xval,
            xanchor: 'auto',
            xref: 'x',
            y: 0,
            yanchor: 'top',
            yref: 'y',
            yshift: -5,
            showarrow: false,
            font: { color: 'white', size: 14 },
            text: xval.toString(),
        })
    })

    return {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#CABC9E',
        },
        xaxis: {
            dtick: 10,
            gridcolor: "#666",
            title: { text: "Predicted Ranges - mm" },
            range: [(xmin - (xmin % 10)) - 1, (xmax + 10 - (xmax % 10)) + 1],
            ticklabelstandoff: -15,
        },
        yaxis: {
            showgrid: false,
            visible: false,
            range: [-yRnagePadding, ymax + yRnagePadding]
        },
        legend: {
            orientation: "h",
            x: 0.5,
            xref: "paper",
            xanchor: "center",
            y: 1,
            yref: "paper",
            yanchor: "bottom",
            entrywidthmode: "fraction",
            entrywidth: 0.30,
        },
        height: 300,
        margin: {
            l: 20,
            r: 20,
            t: 40,
            b: 70,
            pad: 20,
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
