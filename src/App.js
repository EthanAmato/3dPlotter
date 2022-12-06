import { useState, useEffect, createRef, forwardRef } from 'react';
import { Plotter } from './components/Plotter';
import { PlotInput } from './components/PlotInput';
import { DownloadToHTML } from './components/DownloadToHTML';
import './styles/index.css'
function App() {
  const [data, setData] = useState();
  const [plotRef, setPlotRef] = useState();
  const [plotter, setPlotter] = useState(<h3>Please upload an excel file</h3>);
  useEffect(() => {
    if(data) {
      setPlotter(<Plotter setRef={setPlotRef} data={data} />)
      console.log(plotRef)
    }
  }, [data])
  

  function handleDownload() {
    console.log(plotRef.current)
  }


  return (
    <>
      <h1 className='title'>Enter an XLSX File</h1>
      <p className='subtitle'>The format of the columns in the file should be as follows:</p>
      <table>
        <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>First</td>
            <td>First item</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>3</td>
            <td>Second</td>
            <td>Second item</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>Third</td>
            <td>Third item</td>
          </tr>
        </tbody>
      </table>
      <PlotInput setData = {setData} />
      {plotter}
      <button onClick={() => console.log(plotRef.current)}>Print</button>
      {plotter ? <DownloadToHTML plot={plotRef.current} /> : <></>}
    </>
  );
}

export default App;
