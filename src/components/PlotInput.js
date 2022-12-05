import '../styles/input.css';
import readXlsxFile from 'read-excel-file';

export function PlotInput({setData}) {
    function handleSubmit(e) {
        e.preventDefault();
        const file = document.getElementById("myFile").files[0]
        readXlsxFile(file).then(res => {
            let colNames = res.splice(0,1).flat(); //save first line as colnames and splice it out for rest of data
            let transposedData = res[0].map((_, colIndex) => res.map(row => row[colIndex]));
            setData(
                {
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
            <form className='center' onSubmit={handleSubmit}>
                <input type="file" id="myFile" name="filename"/>
                <input type="submit"/>
            </form>
        </>
    );
}