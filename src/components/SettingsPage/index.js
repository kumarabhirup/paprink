import React, { Component } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import { Form, Message } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { formatDate, parseDate } from 'react-day-picker/moment'
import gql from 'graphql-tag'

import PageContent from '../PageContent'
import ImageUploader from '../Editor/ImageUploader'
import { CURRENT_USER_QUERY } from '../User'

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $name: String!
    $phone: String
    $gender: String
    $bio: String
    $profilePicture: String!
    $username: String!
  ) {
    updateUser(
      name: $name
      phone: $phone
      gender: $gender
      bio: $bio
      profilePicture: $profilePicture
      username: $username
    ){
      id
      name
      fname
      lname
      email
      previledge
      gender
      username
      birthday
      profilePicture
      signUpMethod
    }
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
    profilePicture: this.props.user.profilePicture,
    success: null,
    error: null
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

  save = async client => {
    
    await this.setState({ success: null, error: null, loading: true })
    const updateUserMutation = await client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        name: this.state.name,
        username: this.state.username,
        bio: this.state.bio,
        // email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender,
        // birthday: this.state.birthday,
        profilePicture: this.state.profilePicture
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }).then(async () => {
      await this.setState({ success: true, error: null, loading: false })
    }).catch(async err => {
      await this.setState({ success: false, error: err.message, loading: false })
    })

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

                  { this.state.success === true && <Message success header='Information updated successfully!' content="You're all set!" /> }
                  { this.state.error !== null && (
                    <Message
                      warning
                      header='Oops!'
                      list={[
                        this.state.error
                      ]}
                    />
                  ) }
                  <Form style={{marginTop: "20px"}}>
                    <Form.Group widths='equal'>
                      <Form.Input fluid label='Full Name' name="name" maxLength={17} minLength={4} placeholder='Name' value={this.state.name} onChange={this.handleChange} required disabled={this.state.loading} />
                      <Form.Input fluid label='Username' name="username" maxLength={15} minLength={5} placeholder='Username' value={this.state.username} onChange={this.handleChange} required disabled={this.state.loading} />
                      <Form.Input fluid label='Email' name="email" placeholder='Email' maxLength={50} minLength={5} disabled value={this.state.email} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group inline>
                      <label>Gender *</label>
                      <Form.Radio
                        label='Male'
                        value='male'
                        checked={gender === 'male'}
                        onChange={this.genderChange}
                        disabled={this.state.loading}
                      />
                      <Form.Radio
                        label='Female'
                        value='female'
                        checked={gender === 'female'}
                        onChange={this.genderChange}
                        disabled={this.state.loading}
                      />
                      <Form.Radio
                        label='LGBT+'
                        value='lgbt'
                        checked={gender === 'lgbt'}
                        onChange={this.genderChange}
                        disabled={this.state.loading}
                      />
                      <Form.Radio
                        label='Prefer not to disclose'
                        value='none'
                        checked={gender === 'none'}
                        onChange={this.genderChange}
                        disabled={this.state.loading}
                      />
                    </Form.Group>
                    <Form.TextArea label='Bio' maxLength={500} placeholder='Tell us more about you... (People read this!)' name="bio" value={this.state.bio} onChange={this.handleChange} disabled={this.state.loading} />
                    <Form.Group widths='equal'>
                      <Form.Input fluid label='📞 Phone' placeholder='Phone number (with ISD)' name="phone" maxLength={15} value={this.state.phone} onChange={this.handleChange} disabled={this.state.loading} />
                      <DayPickerInput 
                        component={props => (
                          <Form.Input label='Birthdate' onChange={this.handleChange} {...props} disabled />
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
                    <Form.Button loading={this.state.loading} onClick={() => this.save(client)}>Save</Form.Button>
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