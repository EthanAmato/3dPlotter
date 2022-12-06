export function DownloadToHTML(props) {

    function handleClick() {
        async function getPlotlyScript() {
            // fetch
            const plotlyRes = await fetch('https://cdn.plot.ly/plotly-latest.js')
            // get response as text
            return await plotlyRes.text()
        }
        function getChartState() {
            const el = props.plot.props
            console.log(el)
            return {
                data: el.data, // current data
                layout: el.layout // current layout
            }
        }
        async function getHtml() {
            const plotlyModuleText = await getPlotlyScript()
            const state = getChartState()

            return `
                <head>
                  <meta charset="utf-8" />
                </head>
          
                <script type="text/javascript">
                  ${plotlyModuleText}
                <\/script>
              
                <div id="plotly-output"></div>
                
                <script type="text/javascript">
                  Plotly.newPlot(
                    'plotly-output', 
                    ${JSON.stringify(state.data)},
                    ${JSON.stringify(state.layout)}
                  )
              <\/script>
            `
        }
        async function exportToHtml () {
            // Create URL
            const blob = new Blob([await getHtml()], { type: 'text/html' })
            const url = URL.createObjectURL(blob)
          
            // Create downloader
            const downloader = document.createElement('a')
            downloader.href = url
            downloader.download = 'export.html'
          
            // Trigger click
            downloader.click()
          
            // Clean up
            URL.revokeObjectURL(url)
          }
        
          exportToHtml()
        getChartState()
    }


    return <button onClick={handleClick}>Download To HTML</button>
}