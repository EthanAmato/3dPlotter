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
export function Plotter(props) {

    

    const data = props.data;
    console.log(data)
    return (
        <div className='center'>
            <Plot
                data={
                    [
                        {
                            x: data.x,
                            y: data.y,
                            z: data.z,
                            showscale: true,
                            mode: "text+markers",
                            marker: {
                                color: data.desc.map(point => getColor(point))
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

            />
        </div>

    );
}