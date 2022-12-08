import { useState, useEffect, createRef, forwardRef } from 'react';
import { Plotter } from './components/Plotter';
import { PlotInput } from './components/PlotInput';
import { DownloadToHTML } from './components/DownloadToHTML';
import { Button, Container, Row, Col, Table, Stack } from 'react-bootstrap';

function App() {
  const [data, setData] = useState();
  const [plotRef, setPlotRef] = useState();
  const [htmlLink, setHtmlLink] = useState();


  useEffect(() => {
    console.log(plotRef)
    if(plotRef) {
      setHtmlLink(<DownloadToHTML plot={plotRef} />)
    }
  }, [plotRef])
  

  return (
    <>
      <Container className='mt-4'>
        <Stack gap={4}>

          <Row>
            <Col className='text-center'>
              <h1 className='title'>Enter an XLSX File</h1>
              <p className='subtitle'>The format of the columns in the file should be as follows:</p>
            </Col>
          </Row>
          {/* Turn table into preview later */}
          <Table striped border hover className='w-75 m-auto justify-center'>
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
          </Table>
          <Row>
            <PlotInput setData={setData} />
          </Row>
          <Row className='m-auto'>
            {data ? <Plotter setRef={setPlotRef} data={data} /> : <></>}
          </Row>
          <button onClick={() => console.log(plotRef.current)}>Print</button>
          {htmlLink ? htmlLink : <></>}
          
        </Stack>
      </Container>
    </>
  );
}

export default App;
