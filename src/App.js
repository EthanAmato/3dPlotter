import { tempData } from './data/tempData'
import { useState, useEffect } from 'react';
import { Plotter } from './components/Plotter';
import { PlotInput } from './components/PlotInput';
  
function App() {
  const [data, setData] = useState();
  const [plotter, setPlotter] = useState(<h3>Please upload an excel file</h3>);
  useEffect(() => {
    if(data) {
      setPlotter(<Plotter data={data} />)
    }
  }, [data])
  
  return (
    <>
      <PlotInput setData = {setData} />
      {plotter}
    </>
  );
}

export default App;
