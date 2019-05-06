import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import PostPage from '../src/components/PostPage'
import Footer from '../src/components/Footer'
import { Loading, QueryFailed } from '../src/components/QueryStatus'
import User from '../src/components/User';

export const GET_POST_QUERY = gql`
  query GET_POST_QUERY($slugParam: String!){
    getPost(slugParam: $slugParam) {
      id
      title
      editorCurrentContent
      editorSerializedOutput
      status
      slug
      author {
        id
        name
        lname
        fname
        username
        profilePicture
        previledge
        email
      }
      thumbnail
      categories {
        id
        text
        category
      }
      upvotes {
        id
        user {
          id
        }
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`

class postPage extends Component {
  render() {
    return (
      <User>
        { userPayload => (
          <Query query={GET_POST_QUERY} variables={{ slugParam: this.props.router.query.slug }}>
            { payload => {

                if(payload.loading) {
                  return <Loading />
                }

                if (payload.data && payload.data.getPost) {

                  const { title, thumbnail, categories } = payload.data.getPost

                  return (
                    <>
                      {/* <Head>
                        <script src="/static/prebuilt/js/post.js"></script>
                      </Head> */}
                      <Header />
                      <Title title={title} tags={categories} thumbnail={thumbnail.blackOverlayImage} />
                      <PostPage postData={payload.data.getPost} user={userPayload.data && userPayload.data.me} />
                      <Footer />
                    </>
                  )

                } else {
                  return (
                    <QueryFailed />
                  )
                }

              }
            }
          </Query>
        ) }
      </User>
    )
  }
}

export default withRouter(postPage)