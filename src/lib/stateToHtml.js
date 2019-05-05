import { convertToHTML } from 'draft-convert'
import HtmlToReact from 'html-to-react'

export default function stateToHtml(editorCurrentContent) {

  const htmlOutput = convertToHTML({
                      styleToHTML: style => {
                        if (style.startsWith('CUSTOM_COLOR_')) {
                          return <span style={{color: style.substr(style.length - 7)}} />
                        }
                      },
                      blockToHTML: block => {
                        if (block.type === 'image') {
                          return <center><img src={block.data.url} alt={block.text} width="80%" /></center>
                        }
                      }
                    })(editorCurrentContent)

  return htmlOutput

}

export function displayHtml(htmlString) {
  var Parser = HtmlToReact.Parser
  var htmlToReactParser = new Parser()
  return htmlToReactParser.parse(htmlString)
}