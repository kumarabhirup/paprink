import React, { Component } from 'react'
import styled from 'styled-components'

class InputBox extends Component {

  TextField = styled.input`
    &:focus {
      outline-width: 0px;
      border-bottom: 2px solid rgba(0,0,0,1);
    }
    transition: all 0.4s;
    width: ${this.props.width || `100%`};
    padding: 10px;
    border: none;
    border-bottom: 2px solid rgba(0,0,0,.4);
    font-family: sans-serif;
  `

  render() {
    const TextField = this.TextField
    return (
      <TextField
        {...this.props}
      />
    )
  }

}

export { InputBox }