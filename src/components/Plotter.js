import Plot from 'react-plotly.js';
import '../styles/input.css';

export function Plotter(props) {

    function getColor(p) {
        switch (p) {
            case "Sweet":
                return "red";
                break;
            case "Savory":
                return "yellow";
                break;
            case "Sour":
                return "orange";
                break;
            case "Bitter":
                return "green";
                break;
            case "Umami":
                return "blue";
                break;
        }
    }

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
                            colorscale: 'YlOrRd',
                            textinfo: "text+value",
                            hoverinfo: "all",
                        }
                    ]
                }
                layout={{
                    width: 800,
                    height: 800,
                    title: "Random 3d Points",
                    scene: {
                        xaxis:{title: 'X AXIS TITLE'},
                        yaxis:{title: 'Y AXIS TITLE'},
                        zaxis:{title: 'Z AXIS TITLE'},
                        },
                }}

            />
        </div>

    );
}