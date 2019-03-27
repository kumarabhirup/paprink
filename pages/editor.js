import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
 
import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import EditorPage from '../src/components/Editor'
import PleaseSignIn from '../src/components/PleaseSignIn'

const CAN_UPDATE_POST_QUERY = gql`
  query CAN_UPDATE_POST_QUERY($id: ID!){
    canUpdatePost(id: $id)
  }
`

class editorPage extends Component {

  state = { 
    title: null,
    images: {}
  }

  isNew = () => {
    if (this.props.router.query.postId === 'new') {
      return true
    }
    return false
  }

  handleCanUpdatePost = async data => {

    const { title, thumbnail, author } = data

    /**
     * Did this to get out of infinite render situation!
     * @see https://stackoverflow.com/questions/55311187/how-to-avoid-using-setstate-in-render-method/55311268#55311268
     */
    await this.setState(state => {
      if(title !== state.title) {
        return {title} 
      }
    })
    await this.setState(state => {
      if(thumbnail !== state.images) {
        return {images: thumbnail} 
      }
    })
    await this.setState(state => {
      if(author !== state.author) {
        return {author} 
      }
    })

  }

  render() {
    return (
      <Query query={CAN_UPDATE_POST_QUERY} variables={{ id: this.props.router.query.postId }}>
        { payload => {

          if(payload.loading) {
            <div style={{width: '98%', textAlign: 'center', maxWidth: '1000px', margin: '50px auto'}}>Loading...</div>
          }

          if(this.isNew()){
            return (
              <PleaseSignIn>
                { me => (
                  <>
                  <Header />
                  <Title noSidebar title={this.state.title} tags={this.state.categories} thumbnail={this.state.images.uploading === 'done' && this.state.images.blackOverlayImage} currentUser={me} new />
                  <EditorPage titleState={async title => await this.setState({ title })} categoryState={async categories => await this.setState({ categories })} imageState={async images => await this.setState({ images })} new />
                  <Footer />
                  <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
                  </>
                ) }
              </PleaseSignIn>
            )
          } else if (payload.data && payload.data.canUpdatePost) {

            // this.handleCanUpdatePost(payload.data.canUpdatePost)
            const { title, thumbnail, editorSerializedOutput } = payload.data.canUpdatePost

            return (
              <PleaseSignIn>
                { me => (
                  <>
                  <Header />
                  <Title noSidebar title={title} tags={this.state.categories} thumbnail={thumbnail.blackOverlayImage} currentUser={me} postData={payload.data.canUpdatePost} />
                  <EditorPage titleState={async title => await this.setState({ title })} categoryState={async categories => await this.setState({ categories })} imageState={async images => await this.setState({ images })} editorContent={editorSerializedOutput} postData={payload.data.canUpdatePost} />
                  <Footer />
                  <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
                  </>
                ) }
              </PleaseSignIn>
            )
            
          } else {
            return (
              <div style={{width: '98%', textAlign: 'center', maxWidth: '1000px', margin: '50px auto'}}>You and your mind seems to be lost. 🐡</div>
            )
          }

        } }
      </Query>
    )
  }

}

export default withRouter(editorPage)