import './style.css'
import { marked } from 'marked';

const buttonMenu = document.querySelector('.menu_mobile')
buttonMenu.addEventListener('click',()=>{
  const contentNavbar = document.querySelector('.menu_content');
  contentNavbar.classList.toggle('hidden')
})
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
function handlerInput(e) {
  const val = e.target.value
  $iframe.setAttribute('srcdoc',drawIframe(val))
  
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