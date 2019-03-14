import React, { Component } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// import Dante from 'Dante2'
const Dante = dynamic(import('Dante2'), {
  ssr: false
})

export default class PaprinkEditor extends Component {
  render() {
    return (
      <Dante
        content={null}
        body_placeholder={'Write your next masterpiece ✍️'}
      />
    )
  }
}