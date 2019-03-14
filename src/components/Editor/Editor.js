import React, { Component } from 'react'
import dynamic from 'next/dynamic'
// import { ImageResize } from 'quill-image-resize-module'
// import { Quill } from 'react-quill'
import Head from 'next/head'

var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment')

const { ImageResize } = dynamic(import('quill-image-resize-module'), {
  ssr: false
})

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false
})


class PaprinkEditor extends Component {

  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    if (ExecutionEnvironment.canUseDOM) {
      var Quill = require('react-quill').Quill
      Quill.register('modules/imageResize', ImageResize)
    }
  }

  componentWillMount() {
    
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  /* 
  * Quill editor formats
  * See https://quilljs.com/docs/formats/
  */
  formats = [
    'code-block', 'align', 'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      [{'align': ['', 'center', 'right']}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
      {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['code-block']
    ],
    ImageResize: {},
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

  render() {
    return (
      <ReactQuill 
        value={this.state.text}
        onChange={this.handleChange} 
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        placeholder="So, why waiting? Write your story! ✍️"
      />
    )
  }

}

export default PaprinkEditor