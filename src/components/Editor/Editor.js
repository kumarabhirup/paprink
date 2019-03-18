import React, { Component } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { convertToHTML as stateToHTML } from 'draft-convert'
import HtmlToReact from 'html-to-react'

const Dante = dynamic(import('Dante2'), {
  ssr: false
})

export default class PaprinkEditor extends Component {

  state = {}

  shouldComponentUpdate() {
    return true
  }

  displayHtml() {
    var Parser = HtmlToReact.Parser
    var htmlToReactParser = new Parser()
    return htmlToReactParser.parse(this.state.editorHtml)
  }

  defaultContent = { "blocks": [{ "key": "duei8", "text": "Welcome here!", "type": "header-two", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "deeqe", "text": "This is your content editor.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "7u72h", "text": "Try selecting this text.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [{ "offset": 14, "length": 9, "style": "CUSTOM_COLOR_#ff0000" }, { "offset": 14, "length": 9, "style": "BOLD" }], "entityRanges": [], "data": {} }, { "key": "5kk0f", "text": "Does that not give you a tooltip to change inline styles?", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "8sq8a", "text": "Try starting with a new paragraph. You'll see a `plus` button, that will help you embed a video or upload an image.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "5mrbr", "text": "JUST START WRITING!", "type": "image", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": { "aspect_ratio": { "width": 480, "height": 270, "ratio": 56.25 }, "width": 480, "caption": "type a caption (optional)", "height": 270, "forceUpload": false, "url": "https://i.ibb.co/VgvP9Pz/do-it.gif", "loading_progress": 0, "selected": false, "loading": true, "file": null, "direction": "center" } }, { "key": "dfk7g", "text": "Do everything! This is your editor.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [{ "offset": 0, "length": 15, "style": "BOLD" }], "entityRanges": [], "data": {} }, { "key": "cjiu", "text": "Thanks for spending you time here. ❤️ from PaprInk Team!", "type": "header-three", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }

  render() {
    return (
      <>
      <Dante
        content={this.defaultContent}
        body_placeholder={'Write your next masterpiece ✍️'}
        onChange={async editor => { 
          // All these editor states should be saved to the database for future use
          await this.setState({ editorCurrentContent: editor.state.editorState._immutable.currentContent }) // this is what we use to convert into html
          await this.setState({ editorSerializedOutput: editor.emitSerializedOutput() }) // object that looks like this.defaultContent
          await this.props.editorState(this.state.editorSerializedOutput)
          await this.setState({ // TODO: This needs a heavy edit.
            editorHtml: stateToHTML({
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
                        })(this.state.editorCurrentContent)
          })
        }}
        read_only={0}
        ref="editor"
      />
      </>
    )
  }

}