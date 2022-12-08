import { createRef, forwardRef, useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { Row } from 'react-bootstrap';

export function Plotter({ setRef, data }) {
    const [plot, setPlot] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const plotRef = createRef();

    useEffect(() => {
        console.log(data)
        if (data.vectorLines) {

            function generateVectors() {
                let traces = []
                data.traces.forEach((point) => {
                    traces.push(
                        {
                            x: [0, point[0]],
                            y: [0, point[1]],
                            z: [0, point[2]],
                            type: "scatter3d",
                            mode:"lines+markers+text",
                            marker: {
                                color: 'Greens',      
                                text: point[3],
                                hovertext: point[3],

                                // color: data.desc.map(point => getColor(point))
                            },
                            name: point[3],
                            text: ["Origin",point[3]],
                            hovertext: point[3],
                            textinfo: "text+value",
                            hoverinfo: "all",
                        }
                    )
                })
                console.log(traces)
                return traces
            }
            generateVectors();
            setPlot(<Plot ref={plotRef}
                data={generateVectors()}
                layout={{
                    width: 800,
                    height: 800,
                    title: data.title,
                    scene: {
                        xaxis: { title: data.colNames[0] },
                        yaxis: { title: data.colNames[1] },
                        zaxis: { title: data.colNames[2] },
                    },
                }}

            />)
        } else {

            setPlot(<Plot ref={plotRef}
                data={
                    [
                        {
                            x: data.x,
                            y: data.y,
                            z: data.z,
                            showscale: true,
                            mode: "text+markers",
                            marker: {
                                color: 'Greens',                                // color: data.desc.map(point => getColor(point))
                            },
                            type: "scatter3d",
                            text: data.names,
                            hovertext: data.desc,
                            textinfo: "text+value",
                            hoverinfo: "all",
                        }
                    ]
                }
                layout={{
                    width: 800,
                    height: 800,
                    title: data.title,
                    scene: {
                        xaxis: { title: data.colNames[0] },
                        yaxis: { title: data.colNames[1] },
                        zaxis: { title: data.colNames[2] },
                    },
                }}

            />)
        }
        setRef(plotRef)
        setIsLoading(false);

    }, [])

    function setRefAndPlot() {
        // console.log(plot.ref)
        return plot
    }

    if (isLoading) {
        return (
            <h2>Loading...</h2>
        )
    } else {
        return (setRefAndPlot());
    }
}