import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'

import Signout from './Signout'

export default class ProfileButton extends Component {

  render() {
    const { me } = this.props
    return (
      <>
      <Dropdown style={{display: 'inline-block', cursor: 'pointer'}}>
        <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
          <img src={me.profilePicture} width="20px" style={{borderRadius: '100%'}} />
          &nbsp;&nbsp; { me.name }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>
            <Signout />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </>
    )
  }

}
