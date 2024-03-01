import './style.css'
import { marked } from 'marked';
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
  $iframe.srcdoc= drawIframe(val);
  
}
$markdown.addEventListener('input',handlerInput)

function drawIframe(markdown) {
  const text = marked.parse(markdown)
  const content = `
  <!DOCTYPE html>
  <html lang="en">
    <body>
      ${text}
    </body>
  </html>`
  
  return content;
  
}