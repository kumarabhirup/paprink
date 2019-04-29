import React, { Component } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import { Form } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import isEmpty from 'lodash.isempty'
import gql from 'graphql-tag'
import randomHex from 'random-hex-color'

import PageContent from '../PageContent'
import { InputBox } from '../TextBox'
import ImageUploader from '../Editor/ImageUploader'


const TitleInputBox = styled.input`
  width: 100%;
  border: none;
  padding: 30px;
  font-size: 28px;
  border-radius: 6px;
  &:focus {
    outline: none;
  }
`

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class SettingsPage extends Component {

  state = {
    name: this.props.user.name,
    username: this.props.user.username,
    bio: this.props.user.bio,
    email: this.props.user.email,
    phone: this.props.user.phone,
    birthday: this.props.user.birthday,
    profilePicture: this.props.user.profilePicture
  }

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <PageContent noSidebar>

        {/* Post Content */}

        <ApolloConsumer>
          {client => (
            
            <div className="col-lg-10 offset-lg-1">
              <div className="post_content">

                <div className="post_body">

                  <h2 style={{padding: "0px", color: "#000", textAlign: "center"}}>🛠️ Settings</h2>

                  <Form style={{marginTop: "20px"}}>
                    <Form.Group widths='equal'>
                      <Form.Input fluid label='Full Name' placeholder='Name' value={this.state.name} onChange={this.handleChange} />
                      <Form.Input fluid label='Username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
                      <Form.Input fluid label='Email' placeholder='Email' disabled value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group inline>
                      <label>Gender</label>
                      <Form.Radio
                        label='Male'
                        value='male'
                        checked={value === 'male'}
                        onChange={this.handleChange}
                      />
                      <Form.Radio
                        label='Female'
                        value='female'
                        checked={value === 'female'}
                        onChange={this.handleChange}
                      />
                      <Form.Radio
                        label='LGBT+'
                        value='lgbt'
                        checked={value === 'lgbt'}
                        onChange={this.handleChange}
                      />
                      <Form.Radio
                        label='Prefer not to disclose'
                        value='none'
                        checked={value === 'none'}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.TextArea label='Bio' placeholder='Tell us more about you... (People read this!)' value={this.state.bio} onChange={this.handleChange} />
                    <Form.Group widths='equal'>
                      <Form.Input fluid label='📞 Phone' placeholder='Phone number' value={this.state.phone} onChange={this.handleChange} />
                      <DayPickerInput 
                        component={props => (
                          <Form.Input label='Birthdate' onChange={this.handleChange} {...props} />
                        )} 
                        formatDate={formatDate}
                        parseDate={parseDate}
                        placeholder={`${formatDate(new Date())}`}
                      />
                    </Form.Group>
                    <hr />
                    <ImageUploader title="🖼️ Avatar" style={{marginTop: "40px"}} uploadPreset="paprinkProfilePicture" image={this.state.profilePicture} imageState={async images => {
                      await this.setState({ profilePicture: images.faceCroppedImage })
                    }} />
                    <hr />
                    <Form.Button>Save</Form.Button>
                  </Form>

                </div>

                <div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-center">
                  Thanks for spending your time here. ❤️ from PaprInk Team!
                </div>

              </div>
            </div>
          )}
        </ApolloConsumer>

        {/* End of Post Content */}
        
      </PageContent>
    )
  }

}

export default withRouter(SettingsPage)