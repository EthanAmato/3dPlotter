import '../styles/input.css';
import readXlsxFile from 'read-excel-file';
import { useRef } from 'react';

export function PlotInput({setData}) {
    const titleRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const file = document.getElementById("myFile").files[0]
        readXlsxFile(file).then(res => {
            let colNames = res.splice(0,1).flat(); //save first line as colnames and splice it out for rest of data
            let transposedData = res[0].map((_, colIndex) => res.map(row => row[colIndex]));
            setData(
                {
                    title: titleRef.current.value,
                    colNames: colNames,
                    x: transposedData[0],
                    y: transposedData[1],
                    z: transposedData[2],
                    names: transposedData[3],
                    desc: transposedData[4]
                }
            )
        })
    }


    return (
        <>
        <div className='form-wrapper'>
            <form className='center' onSubmit={handleSubmit}>
                <label for="title">Graph Title</label>
                <input id="title" ref={titleRef}/>
                <input type="file" id="myFile" name="filename"/>
                <input type="submit"/>
            </form>
        </div>
        </>
    );
}