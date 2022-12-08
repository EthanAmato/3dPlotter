import readXlsxFile from 'read-excel-file';
import { useRef, useState } from 'react';
import { Form,Button, Stack, Col, Row } from 'react-bootstrap';
 
export function PlotInput({ setData }) {
    const titleRef = useRef();
    const [displayOriginPointOptions, setDisplayOriginPointOptions] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const file = document.getElementById("myFile").files[0]

        readXlsxFile(file).then(res => {
            let colNames = res.splice(0, 1).flat(); //save first line as colnames and splice it out for rest of data
            let plotSize = { 
                height: parseInt(e.target['size'][0].value),
                width: parseInt(e.target['size'][1].value)
            } //height, width
            if (e.target['requireVectors'].checked) {
                let originCoords = []
                e.target['originCoords'].forEach((coord) => { originCoords.push(parseInt(coord.value)) })
                setData(
                    {
                        title: e.target['title'].value,
                        colNames: colNames,
                        traces: res,
                        vectorLines: e.target['requireVectors'].checked,
                        originCoords: originCoords,
                        plotSize: plotSize

                    }
                )
            } else {
                let transposedData = res[0].map((_, colIndex) => res.map(row => row[colIndex]));
                setData(
                    {
                        title: e.target['title'].value,
                        colNames: colNames,
                        x: transposedData[0],
                        y: transposedData[1],
                        z: transposedData[2],
                        names: transposedData[3],
                        vectorLines: e.target['requireVectors'].checked,
                        plotSize: plotSize
                    }
                )
            }
        })
    }


    return (
        <>
            <Form onSubmit={handleSubmit} className="w-75 m-auto">
                <Stack gap={2}>
                    <Form.Group controlId="title">
                        <Form.Label>Graph Title</Form.Label>
                        <Form.Control type="text" placeholder='Sample Title'></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="size">
                        <Row>
                            <Col sm={3}>
                                <Form.Label>Graph Height</Form.Label>
                                <Form.Control type="text" defaultValue={800}></Form.Control>
                            </Col>
                            <Col sm={3}>
                                <Form.Label>Graph Width</Form.Label>
                                <Form.Control type="text" defaultValue={800}></Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>File</Form.Label>
                        <Form.Control type="file" id="myFile" ref={titleRef} placeholder='Sample Title'></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="requireVectors">
                        <Form.Check type="checkbox" onChange={() => setDisplayOriginPointOptions(!displayOriginPointOptions)} label="Vector Lines to Origin" />
                    </Form.Group>
                    {displayOriginPointOptions ?
                        <Form.Group controlId="originCoords">
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Origin X</Form.Label>
                                    <Form.Control type="text" defaultValue={0}></Form.Control>
                                </Col>
                                <Col sm={2}>
                                    <Form.Label>Origin Y</Form.Label>
                                    <Form.Control type="text" defaultValue={0}></Form.Control>
                                </Col>
                                <Col sm={2}>
                                    <Form.Label>Origin Z</Form.Label>
                                    <Form.Control type="text" defaultValue={0}></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        : <></>
                    }
                    <Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form.Group>
                </Stack>
            </Form>
        </>
    );
}