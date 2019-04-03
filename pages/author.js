import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import AuthorPage from '../src/components/AuthorPage'
import { Loading, QueryFailed } from '../src/components/QueryStatus'

const POST_AUTHOR_QUERY = gql`
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
					}
					createdAt
          updatedAt
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
    }
  }
`

class authorPage extends Component {

  state = {}

  async getAuthor(client) {
    const author = await client.query({
      query: AUTHOR_QUERY,
      variables: { authorUsername: this.props.router.query.authorUsername && this.props.router.query.authorUsername.toLowerCase() }
    }).then((payload) => (payload.data.getAuthor))
    await this.setState({ author })
  }

  render() {
    const { author } = this.state
    return (
      <ApolloConsumer>
        { client => {
          // this.getAuthor(client)
          return (
            <Query query={POST_AUTHOR_QUERY} variables={{
              authorUsername: this.props.router.query.authorUsername && this.props.router.query.authorUsername.toLowerCase()
            }}>
              { ({ data, loading, error, fetchMore }) => {

                if (loading && !data) {
                  return <Loading />
                }

                if(data && data.postsAuthorConnection){
                  const authorData = data.postsAuthorConnection.edges[0] ? data.postsAuthorConnection.edges[0].node.author : null
                  if (authorData !== null) {
                    return (
                      <>
                        <Header />
                        <Title title={`${authorData.name}'s Articles`} />
                        <AuthorPage
                          authorData={authorData}
                          posts={data.postsAuthorConnection.edges.map(x => (x.node) )} 
                          pageInfo={data.postsAuthorConnection.pageInfo} 
                          onLoadMore={() => {
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
                        />
                        <Footer />
                      </>
                    )
                  } else {
                    return <QueryFailed />
                  }
                } else {
                  return (
                    <QueryFailed />
                  )
                }

              } }
            </Query>
          )
        } }
      </ApolloConsumer>
    )
  }

}

export default withRouter(authorPage)