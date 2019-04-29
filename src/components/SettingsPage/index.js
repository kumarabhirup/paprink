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

class SettingsPage extends Component {

  state = {
    name: this.props.user.name,
    username: this.props.user.username,
    bio: this.props.user.bio,
    email: this.props.user.email,
    phone: this.props.user.phone,
    gender: this.props.user.gender || 'lgbt',
    birthday: this.props.user.birthday,
    profilePicture: this.props.user.profilePicture
  }

  handleChange = (e, { value }) => this.setState({ [e.target.name]: value })
  genderChange = (e, { value }) => this.setState({ gender: value })

  // From http://react-day-picker.js.org/examples/input-advanced/
  handleDayChange = (birthday, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.setState({
      birthday: formatDate(birthday)
    });
  }

  render() {
    const { gender } = this.state
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
                      <Form.Input fluid label='Full Name' name="name" placeholder='Name' value={this.state.name} onChange={this.handleChange} required />
                      <Form.Input fluid label='Username' name="username" placeholder='Username' value={this.state.username} onChange={this.handleChange} required />
                      <Form.Input fluid label='Email' name="email" placeholder='Email' disabled value={this.state.email} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group inline>
                      <label>Gender *</label>
                      <Form.Radio
                        label='Male'
                        value='male'
                        checked={gender === 'male'}
                        onChange={this.genderChange}
                      />
                      <Form.Radio
                        label='Female'
                        value='female'
                        checked={gender === 'female'}
                        onChange={this.genderChange}
                      />
                      <Form.Radio
                        label='LGBT+'
                        value='lgbt'
                        checked={gender === 'lgbt'}
                        onChange={this.genderChange}
                      />
                      <Form.Radio
                        label='Prefer not to disclose'
                        value='none'
                        checked={gender === 'none'}
                        onChange={this.genderChange}
                      />
                    </Form.Group>
                    <Form.TextArea label='Bio' placeholder='Tell us more about you... (People read this!)' name="bio" value={this.state.bio} onChange={this.handleChange} />
                    <Form.Group widths='equal'>
                      <Form.Input fluid label='📞 Phone' placeholder='Phone number (with ISD)' name="phone" maxLength={15} value={this.state.phone} onChange={this.handleChange} />
                      <DayPickerInput 
                        component={props => (
                          <Form.Input label='Birthdate' onChange={this.handleChange} {...props} />
                        )} 
                        formatDate={formatDate}
                        parseDate={parseDate}
                        placeholder={`${formatDate(new Date())}`}
                        onDayChange={this.handleDayChange}
                        value={this.state.birthday}
                      />
                    </Form.Group>
                    <hr />
                    <ImageUploader title="🖼️ Avatar *" style={{marginTop: "40px"}} uploadPreset="paprinkProfilePicture" image={this.state.profilePicture} imageState={async images => {
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