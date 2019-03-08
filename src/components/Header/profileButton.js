import React, { Component } from 'react'

export default class ProfileButton extends Component {
  render() {
    const { me } = this.props
    return (
      <>
      <li style={{backgroundColor: '#ffffff', color: '#000000', borderRadius: '5px', padding: '5px 10px'}}>
        <span style={{cursor: 'pointer'}}>
          <img src={me.profilePicture} width="20px" style={{borderRadius: '100%'}} />
          &nbsp;&nbsp; { me.name } 
        </span>
      </li>
      </>
    )
  }
}
