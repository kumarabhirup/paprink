import React, { Component } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import { Button as BootstrapButton } from 'react-bootstrap'
import isEmpty from 'lodash.isempty'
import gql from 'graphql-tag'
import randomHex from 'random-hex-color'

import PageContent from '../PageContent'
import CategorySelector from './CategorySelector'
import Editor from './Editor'
import ImageUploader from './ImageUploader'
import categorySorter from '../../lib/categorySorter'


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

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!) {
    deletePost(id: $id) {
      id
      author {
        username
      }
    }
  }
`

const SAVE_POST_MUTATION = gql`
  mutation SAVE_POST_MUTATION(
    $title: String!
    $editorSerializedOutput: Json!
    $editorCurrentContent: Json!
    # $editorHtml: String!
    $categories: Json!
    $thumbnail: Json!
    $status: PostStatus!
  ) {
    savePost(
      title: $title
      editorSerializedOutput: $editorSerializedOutput
      editorCurrentContent: $editorCurrentContent
      # editorHtml: $editorHtml
      categories: $categories
      thumbnail: $thumbnail
      status: $status
    ) {
      id
      author {
        id
        email
        name
        fname
        lname
      }
      title
      thumbnail
      categories {
        id
        text
        category
      }
      status
      slug
    }
  }
`

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION(
    $id: ID!
    $title: String!
    $editorSerializedOutput: Json!
    $editorCurrentContent: Json!
    # $editorHtml: String!
    $categories: Json!
    $thumbnail: Json!
    $status: PostStatus!
  ) {
    updatePost(
      id: $id
      title: $title
      editorSerializedOutput: $editorSerializedOutput
      editorCurrentContent: $editorCurrentContent
      # editorHtml: $editorHtml
      categories: $categories
      thumbnail: $thumbnail
      status: $status
    ) {
      id
      author {
        id
        email
        name
        fname
        lname
      }
      title
      thumbnail
      categories {
        id
        text
        category
      }
      status
      slug
    }
  }
`

class EditorPage extends Component {

  state = {
    title: this.props.new ? 'Write an awesome title!' : this.props.postData.title,
		categories: this.props.new ? [] : categorySorter(this.props.postData.categories),
    images: this.props.new ? {} : this.props.postData.thumbnail,
    error: false,
    published: this.props.new ? false : this.props.postData.status !== "PUBLISHED" ? false : true,
    draft: this.props.new ? false : this.props.postData.status !== "DRAFT" ? false : true
  }

  onTitleChange = async event => {
    await this.setState({ title: event.target.value })
		this.props.titleState(this.state.title)
  }

  draft = async client => {

    if(this.state.published === true) {
      return
    } else {

      if(this.props.new) {

        await this.setState({ error: false })
        await this.setState({ drafted: 'loading' })
        var draftPost = await client.mutate({
          mutation: SAVE_POST_MUTATION,
          variables: {
            title: this.state.title,
            thumbnail: this.state.images,
            // editorHtml: this.state.editorHtml,
            editorSerializedOutput: this.state.editorSerializedOutput,
            editorCurrentContent: this.state.editorCurrentContent,
            categories: this.state.categories.map(object => (object.id.toUpperCase())),
            status: 'DRAFT'
          }
        })
        if (draftPost.data.savePost){
          await this.setState({ drafted: true })
          this.props.router.replace(`/editor/${draftPost.data.savePost.id}`)
        } else {
          await this.setState({ drafted: 'error' })
        }

      } else {

        await this.setState({ error: false })
        await this.setState({ drafted: 'loading' })
        var draftPost = await client.mutate({
          mutation: UPDATE_POST_MUTATION,
          variables: {
            id: this.props.router.query.postId,
            title: this.state.title,
            thumbnail: this.state.images,
            // editorHtml: this.state.editorHtml,
            editorSerializedOutput: this.state.editorSerializedOutput,
            editorCurrentContent: this.state.editorCurrentContent,
            categories: this.state.categories.map(object => (object.id.toUpperCase())),
            status: 'DRAFT'
          }
        })
        if (draftPost.data.updatePost){
          await this.setState({ drafted: true, draftUpdated: true, draft: false })
          window.location.reload(`/editor/${draftPost.data.updatePost.id}`)
        } else {
          await this.setState({ drafted: 'error' })
        }

      }

    }

  }

  publish = async client => {

    if(this.props.new) {

      await this.setState({ error: false })
      if (this.state.title.length === 0 || this.state.categories.length === 0 || isEmpty(this.state.images) || this.state.images.image === null || this.state.editorSerializedOutput.blocks.length === 1) {
        await this.setState({ error: true })
      } else {
        await this.setState({ published: 'loading' })
        var savePost = await client.mutate({
          mutation: SAVE_POST_MUTATION,
          variables: {
            title: this.state.title,
            thumbnail: this.state.images,
            // editorHtml: this.state.editorHtml,
            editorSerializedOutput: this.state.editorSerializedOutput,
            editorCurrentContent: this.state.editorCurrentContent,
            categories: this.state.categories.map(object => (object.id.toUpperCase())),
            status: 'PUBLISHED'
          }
        })
        if (savePost.data.savePost){
          await this.setState({ published: true, draft: false })
          this.props.router.replace(`/p/${savePost.data.savePost.slug}-${savePost.data.savePost.id}`)
        } else {
          await this.setState({ published: 'error' })
        }
      }

    } else {

      await this.setState({ error: false })
      if (this.state.title.length === 0 || this.state.categories.length === 0 || isEmpty(this.state.images) || this.state.images.image === null || this.state.editorSerializedOutput.blocks.length === 1) {
        await this.setState({ error: true, draft: false })
      } else {
        await this.setState({ published: 'loading' })
        var updatePost = await client.mutate({
          mutation: UPDATE_POST_MUTATION,
          variables: {
            id: this.props.router.query.postId,
            title: this.state.title,
            thumbnail: this.state.images,
            // editorHtml: this.state.editorHtml,
            editorSerializedOutput: this.state.editorSerializedOutput,
            editorCurrentContent: this.state.editorCurrentContent,
            categories: this.state.categories.map(object => (object.id.toUpperCase())),
            status: 'PUBLISHED'
          }
        })
        if (updatePost.data.updatePost){
          await this.setState({ published: true, draft: false })
          this.props.router.replace(`/p/${updatePost.data.updatePost.slug}-${updatePost.data.updatePost.id}`)
        } else {
          await this.setState({ published: 'error' })
        }
      }

    }

  }

  delete = async client => {

    const deletePost = await client.mutate({
      mutation: DELETE_POST_MUTATION,
      variables: { id: this.props.router.query.postId }
    }).then(async ({ data }) => {
      await this.setState({ deleted: true })
      this.props.router.replace(`/author/${data.deletePost.author.username}`)
    }).catch(async err => {
      await this.setState({ deleted: 'error' })
    })

  }

  render() {
    return (
      <PageContent noSidebar>

        {/* Post Content */}

        <ApolloConsumer>
          {client => (
            
            <div className="col-lg-10 offset-lg-1">
              <div className="post_content">

                <TitleInputBox type="text" placeholder={this.props.new ? "Write an awesome title!" : this.props.postData.title} value={this.state.title === '' ? null : this.state.title} onChange={event => this.onTitleChange(event)} maxLength="55" />

                <hr style={{opacity: 0.3}} />

                <div className="post_body" style={{marginTop: "20px", color: "#000000"}}>

                  <div className="post_tags" style={{margin: '10px auto'}}>
                    <ul>
                      { this.state.categories.map(category => <li className="post_tag"><a href="#">{category.text}</a></li>) }
                    </ul>
                  </div>

                  <Editor editorState={async editorContent => await this.setState({ editorSerializedOutput: editorContent.editorSerializedOutput, editorCurrentContent: editorContent.editorCurrentContent })} editorContent={this.props.editorContent} />

                </div>

                <CategorySelector categoryState={async categories => {
                  await this.setState({ categories })
                  this.props.categoryState(this.state.categories)
                }}
                categories={this.state.categories}
                />

                <ImageUploader image={this.state.images.image} uploadPreset="paprink" imageState={async images => {
                  await this.setState({ images })
                  this.props.imageState(this.state.images)
                }} />
                
                <div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-end">
                  { this.state.error && <p style={{color: "red", fontWeight: "bold"}}>You have to fill all those blanks!</p> }
                  { this.state.draftUpdated && <p style={{color: randomHex(), fontWeight: "bold"}}>Draft updated successfully!</p> }
                  { this.state.draft && <p style={{color: randomHex(), fontWeight: "bold"}}>This is yet just a draft. NOT YET PUBLISHED!</p> }
                  &nbsp; &nbsp; &nbsp;
                  {!this.props.new && <BootstrapButton variant="danger" style={{marginRight: "10px", cursor: 'pointer'}} onClick={() => this.delete(client)}>{this.state.deleted ? "DELETED!" : "DELETE POST"}</BootstrapButton>}
                  {!this.state.published && <BootstrapButton variant="dark" style={{marginRight: "10px", cursor: 'pointer'}} onClick={() => this.draft(client)}>{this.state.drafted ? '📝 SAVE CHANGES' : '📝 SAVE AS DRAFT'}</BootstrapButton>}
                  {<BootstrapButton variant={this.state.published === 'error' ? "danger" : this.state.published === true ? "info" : "success"} style={{cursor: 'pointer'}} onClick={() => this.publish(client)}>{this.state.published === true ? '👌 UPDATE' : this.state.published === 'error' ? 'Something went wrong ☹️' : this.state.published === 'loading' ? 'PUBLISHING...' : '🎉 PUBLISH'}</BootstrapButton>}
                  {/* {this.state.published && <BootstrapButton variant={this.state.published === 'error' ? "danger" : this.state.published === true ? "info" : "success"} style={{cursor: 'pointer'}} onClick={() => this.publish(client)}>{this.state.published === true ? '👌 UPDATE' : this.state.published === 'error' ? 'Something went wrong ☹️' : this.state.published === 'loading' ? 'PUBLISHING...' : '🎉 PUBLISH'}</BootstrapButton>} */}
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

export default withRouter(EditorPage)