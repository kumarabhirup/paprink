import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import AuthorPage from '../src/components/AuthorPage'
import { Loading, QueryFailed } from '../src/components/QueryStatus'
import User from '../src/components/User';

export const POST_AUTHOR_QUERY = gql`
	query POST_AUTHOR_QUERY($authorUsername: String! $orderBy: PostOrderByInput $after: String){
		postsAuthorConnection(authorUsername: $authorUsername orderBy: $orderBy after: $after) {
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				node {
					id
					title
					thumbnail
          slug
					author {
						id
						name
						lname
						fname
            profilePicture
            username
            bio
					}
          upvotes {
            id
            user {
              id
            }
          }
          upvotesNumber
					createdAt
          updatedAt
          publishedAt
				}
			}
		}
	}
`

export const UPVOTED_POST_AUTHOR_QUERY = gql`
	query UPVOTED_POST_AUTHOR_QUERY($authorUsername: String! $orderBy: PostOrderByInput $after: String){
		upvotedPostsAuthorConnection(authorUsername: $authorUsername orderBy: $orderBy after: $after) {
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				node {
					id
					title
					thumbnail
          slug
					author {
						id
						name
						lname
						fname
            profilePicture
            username
            bio
					}
          upvotes {
            id
            user {
              id
            }
          }
          upvotesNumber
					createdAt
          updatedAt
          publishedAt
				}
			}
		}
	}
`

const AUTHOR_QUERY = gql`
  query AUTHOR_QUERY($authorUsername: String!) {
    getAuthor(authorUsername: $authorUsername) {
      id
      name
      lname
      fname
      profilePicture
      username
      bio
    }
  }
`

class authorPage extends Component {

  state = {}

  render() {
    const { author } = this.state
    return (
      <Query query={AUTHOR_QUERY} variables={{ authorUsername: this.props.router.query.authorUsername && this.props.router.query.authorUsername.toLowerCase() }}>
        {authorMeta => (
          <User>
            {userPayload => (
              <Query query={UPVOTED_POST_AUTHOR_QUERY} variables={{ authorUsername: this.props.router.query.authorUsername && this.props.router.query.authorUsername.toLowerCase() }}>
                { upvotedPostsPayload => {
                  return (
                    
                    <Query query={POST_AUTHOR_QUERY} variables={{
                      authorUsername: this.props.router.query.authorUsername && this.props.router.query.authorUsername.toLowerCase()
                    }}>
                      {({ data, loading, error, fetchMore }) => {

                        if (loading && !data) {
                          return <Loading />
                        }

                        if (data && data.postsAuthorConnection && authorMeta.data && authorMeta.data.getAuthor) {
                          const authorData = data.postsAuthorConnection.edges[0] ? data.postsAuthorConnection.edges[0].node.author : null
                          return (
                            <>
                              <Header />
                              <Title title={`${authorMeta.data.getAuthor.name}'s Profile`} author={authorMeta.data.getAuthor} />
                              <AuthorPage

                                authorData={authorMeta.data.getAuthor}
                                user={userPayload.data && userPayload.data.me}

                                publishedPosts={data.postsAuthorConnection.edges.map(x => (x.node))}
                                publishedPageInfo={data.postsAuthorConnection.pageInfo}
                                publishedOnLoadMore={() => {
                                  fetchMore({
                                    variables: {
                                      after: data.postsAuthorConnection.pageInfo.endCursor
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {

                                      if (!fetchMoreResult) return prev

                                      var updatedQuery = {
                                        postsAuthorConnection: {
                                          __typename: "PostConnection",
                                          pageInfo: fetchMoreResult.postsAuthorConnection.pageInfo,
                                          edges: [
                                            ...prev.postsAuthorConnection.edges,
                                            ...fetchMoreResult.postsAuthorConnection.edges
                                          ]
                                        }
                                      }

                                      return updatedQuery

                                    }
                                  })
                                }}

                                upvotedPosts={upvotedPostsPayload.data.upvotedPostsAuthorConnection.edges.map(x => (x.node))}
                                upvotedPageInfo={upvotedPostsPayload.data.upvotedPostsAuthorConnection.pageInfo}
                                upvotedOnLoadMore={() => {
                                  upvotedPostsPayload.fetchMore({
                                    variables: {
                                      after: upvotedPostsPayload.data.upvotedPostsAuthorConnection.pageInfo.endCursor
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {

                                      if (!fetchMoreResult) return prev

                                      var updatedQuery = {
                                        upvotedPostsAuthorConnection: {
                                          __typename: "PostConnection",
                                          pageInfo: fetchMoreResult.upvotedPostsAuthorConnection.pageInfo,
                                          edges: [
                                            ...prev.upvotedPostsAuthorConnection.edges,
                                            ...fetchMoreResult.upvotedPostsAuthorConnection.edges
                                          ]
                                        }
                                      }

                                      return updatedQuery

                                    }
                                  })
                                }}

                              />
                              <Footer />
                            </>
                          )
                        } else {
                          return <QueryFailed />
                        }

                      }}
                    </Query>

                  )
                } }
              </Query>
            )}
          </User>
        )}
      </Query>
    )
  }

}

export default withRouter(authorPage)