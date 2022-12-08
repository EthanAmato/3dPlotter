import readXlsxFile from 'read-excel-file';
import { useRef } from 'react';
import { Form, FormControl, FormLabel, Button, Stack } from 'react-bootstrap';
function randomValues(num, mul) {
    const arr = [];
    const index = [];
    for (let i = 0; i < num; i++) {
        arr.push(Math.random() * mul)
        index.push(i);
    }
    return { index, arr };
}

export function PlotInput({ setData }) {
    const titleRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const file = document.getElementById("myFile").files[0]
        readXlsxFile(file).then(res => {
            let colNames = res.splice(0, 1).flat(); //save first line as colnames and splice it out for rest of data
            // const traces = res[0].forEach(point => {
            //     console.log(point)
            // })
            if (e.target['requireVectors'].checked) {
                setData(
                    {
                        title: e.target['title'].value,
                        colNames: colNames,
                        traces: res,
                        vectorLines: e.target['requireVectors'].checked
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
                        vectorLines: e.target['requireVectors'].checked
                    }
                )
            }
        })
    }


    return (
        <>
            <Form onSubmit={handleSubmit} className="w-75 m-auto">
                <Stack gap={3}>
                    <Form.Group controlId="title">
                        <Form.Label>Graph Title</Form.Label>
                        <Form.Control type="text" placeholder='Sample Title'></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>File</Form.Label>
                        <Form.Control type="file" id="myFile" ref={titleRef} placeholder='Sample Title'></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="requireVectors">
                        <Form.Check type="checkbox" label="Vector Lines to Origin" />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form.Group>
                </Stack>
            </Form>
        </>
    );
}