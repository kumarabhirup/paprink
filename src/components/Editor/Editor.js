import React, { Component } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Dante = dynamic(import('Dante2'), {
  ssr: false
})

export default class PaprinkEditor extends Component {

  state = {}

  shouldComponentUpdate() {
    console.log(this.state.editor)
    return true
  }

  render() {
    return (
      <Dante
        // content={null}
        body_placeholder={'Write your next masterpiece ✍️'}
        onChange={editor => { this.setState({ editor }) }}
        // debug
      />
    )
  }

}