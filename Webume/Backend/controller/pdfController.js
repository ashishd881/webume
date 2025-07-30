import fs from 'fs'
import path from 'path'
import pdf from 'pdf-parse'
import { fileURLToPath } from 'url';

// export const pdfparser=async(req.res) {
//     const 
// }
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'test', 'data', '05-versions-space.pdf')
let dataBuffer = fs.readFileSync(filePath)

pdf(dataBuffer).then(function(data){
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text); 
})
.catch(function(error){
    console.log(error)
})