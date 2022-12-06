import { createRef, forwardRef, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import '../styles/input.css';

function getColor(p) {
    switch(p) {
        case "Sweet":
            return "red";
        case "Savory":
            return "yellow";
        case "Sour":
            return "orange";
        case "Bitter":
            return "green";
        case "Umami":
            return "blue";
        default:
            return "black"
    }
}
var colorscale = [[0.0, 'rgb(0, 242, 242)'],
 [0.08333333333333333, 'rgb(0, 121, 242)'],
 [0.16666666666666666, 'rgb(0, 0, 242)'],
 [0.25, 'rgb(121, 0, 242)'],
 [0.3333333333333333, 'rgb(242, 0, 242)'],
 [0.41666666666666663, 'rgb(242, 0, 121)'],
 [0.5, 'rgb(242, 0, 0)'],
 [0.5833333333333333, 'rgb(242, 121, 0)'],
 [0.6666666666666666, 'rgb(242, 242, 0)'],
 [0.75, 'rgb(121, 242, 0)'],
 [0.8333333333333333, 'rgb(0, 242, 0)'],
 [0.9166666666666666, 'rgb(0, 242, 121)'],
 [1.0, 'rgb(0, 242, 242)']];
export function Plotter(props) {

    const plotRef = createRef();

    const data = props.data;
    console.log(data)

  
    const plot = (<Plot ref={plotRef}
        data={
            [
                {
                    x: data.x,
                    y: data.y,
                    z: data.z,
                    showscale: true,
                    mode: "text+markers",
                     marker: {
                        color: colorscale,                                // color: data.desc.map(point => getColor(point))
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
                xaxis:{title: data.colNames[0]},
                yaxis:{title: data.colNames[1]},
                zaxis:{title: data.colNames[2]},
                },
        }}

    />)

    props.setRef(plotRef);

    return (
        <div className='center'>
            {plot}
        </div>
    );
}