import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import isMobile from 'is-mobile'

import Signout from './Signout'

export default class ProfileButton extends Component {

  toggleStyles = () => {
    if (isMobile()) return {width: "145px", overflow: "hidden"}
    else return {width: "auto"}
  }

  render() {
    const { me } = this.props
    return (
      <>
      <Dropdown style={{display: 'inline-block', cursor: 'pointer'}}>
        <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm" style={this.toggleStyles()}>
          <img src={me.profilePicture} width="20px" style={{borderRadius: '100%'}} />
          &nbsp;&nbsp; 
          { me.name }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href={`/author/${me.username}`}>Profile</Dropdown.Item>
          <Dropdown.Item href="/settings">Settings</Dropdown.Item>
          <Dropdown.Item>
            <Signout />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </>
    )
  }

}