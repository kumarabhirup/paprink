import React, { Component } from 'react'

export default class ProfileButton extends Component {

  state = {
    dropdown: false
  }

  popDropdown = async () => {
    await this.setState({ dropdown: !this.state.dropdown })
    console.log(this.state.dropdown)
  }

  render() {
    const { me } = this.props
    return (
      <>
      <li style={{backgroundColor: '#ffffff', color: '#000000', borderRadius: '5px', padding: '5px 10px', zoom: '90%'}}>
        <span style={{cursor: 'pointer'}}>
          <img src={me.profilePicture} width="20px" style={{borderRadius: '100%'}} />
          &nbsp;&nbsp; { me.name }
        </span> <span onClick={this.popDropdown} style={{cursor: 'pointer'}}>{this.state.dropdown ? '👆' : '👇'}</span>
      </li>
      { this.state.dropdown && (
        <div style={{position: 'absolute', background: '#d3d3d3', padding: '10px', width: '200px'}}>
          THIS IS ME
        </div>
      ) }
      </>
    )
  }

}
