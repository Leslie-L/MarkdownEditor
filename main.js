import './style.css'
import { encode, decode } from 'js-base64'
import { marked } from 'marked';

let documentValue='';

const buttonMenu = document.querySelector('.menu_mobile')
buttonMenu.addEventListener('click',()=>{
  const contentNavbar = document.querySelector('.menu_content');
  contentNavbar.classList.toggle('hidden')
})
const handleShowParts= ()=>{
  showBnt.classList.toggle('hidden_bnt')
  iframeArea.classList.toggle('hidden_bnt')
}
const showBnt = document.getElementById('show')
const iframeArea = document.getElementById('not-show')
const ocultBnt = document.getElementById('show-control')
showBnt.addEventListener('click',handleShowParts)
ocultBnt.addEventListener('click',handleShowParts)

const tokenizer = {
  codespan(src) {
      return {
        type: 'codespan',
        raw: src,
        text: src
      };
    
  }
};

marked.use({ tokenizer });

const $markdown = document.getElementById('markdown');
const $iframe = document.getElementById('result');
const $docName = document.getElementById('docName')

$docName.addEventListener('input',EdithName);
function EdithName(e) {
  //console.log(e.target.value)
  const [rawName, rawMark] = window.location.pathname.slice(1).split('%7C')
  const fileName = e.target.value;
  const hashedCode = `${encode(fileName)}|${rawMark}}`
  window.history.replaceState(null, null, `/${hashedCode}`)
}

const [rawName, rawMark] = window.location.pathname.slice(1).split('%7C')
const fileName = rawName ? decode(rawName) : '';
const fileContent = rawMark ? decode(rawMark.replace(/%7D$/, '')):'';
documentValue=fileName;

$markdown.value = fileContent
$iframe.setAttribute('srcdoc',drawIframe(fileContent))
$docName.value=fileName;

function handlerInput(e) {
  documentValue=e.target.value;
  const inputContent = e.target.value;
  const newNameFile= $docName.value? $docName.value:'document';
  $iframe.setAttribute('srcdoc',drawIframe(inputContent))
  const fileName = encode(newNameFile)
  const content  = encode(inputContent)
  const hashedCode = `${fileName}|${content}}`
  window.history.replaceState(null, null, `/${hashedCode}`)
}
$markdown.addEventListener('input',handlerInput)


function drawIframe(markdown) {
  const text = marked.parse(markdown)
  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <style>
  :root {
    font-family: 'Georgia', serif;
    line-height: 1.5;
    font-weight: 300;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #15161a;
    --primary : rgb(45, 45, 223);
    --navbar:#2c2d31;
  }
  a{
    text-decoration: none;
  }
  a code{
    color:rgb(45, 45, 223);
  }
  pre {
    background-color: #2c2d31;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: auto;
  }
  code {
    font-family: 'Courier New', monospace;
    color: white;
  }
  blockquote{
    border-left: 3px solid var(--primary);
    padding: 5px;
    background: var(--navbar);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: white;
  }
  </style>
    <body>
      ${text}
    </body>
  </html>`
  
  return content;
  
}
const $deleteBnt = document.querySelector('.delete');
$deleteBnt.addEventListener('click',()=>{
  $markdown.value=''
  $iframe.setAttribute('srcdoc',drawIframe(''))
  window.history.replaceState(null, null, `/`)
})

const $download = document.querySelector('.download');
$download.addEventListener('click',()=>{
  
  // Obtener el contenido del textarea
  const contentMarkdown = $markdown.value;
  // Crear un objeto Blob con el contenido Markdown
  const blob = new Blob([contentMarkdown], { type: 'text/markdown' });
  // Crear un enlace con el Blob
  const downloadLink = document.createElement('a');
  const url = URL.createObjectURL(blob);
  downloadLink.href =url
  const fileName = documentValue;
  // Establecer el nombre del archivo
  downloadLink.download = `${fileName}.md`;
  // Simular un clic en el enlace para iniciar la descarga
  downloadLink.click();
  window.URL.revokeObjectURL(url);
})