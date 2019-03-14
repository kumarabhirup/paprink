import React, { Component } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import 'froala-editor/js/froala_editor.pkgd.min.js'

/**
 * FIX for `window is not defined` error
 * See: https://github.com/froala/react-froala-wysiwyg/issues/89 
 */
const FroalaEditorInput = dynamic(import('react-froala-wysiwyg'), {
  ssr: false
})

export default class PaprinkEditor extends Component {
  render() {
    return (
      <>
        <FroalaEditorInput tag='textarea'/>
      </>
    )
  }
}
