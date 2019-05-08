import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head'

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
            previledge
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
            previledge
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

export const DRAFT_POST_AUTHOR_QUERY = gql`
	query DRAFT_POST_AUTHOR_QUERY($authorUsername: String! $orderBy: PostOrderByInput $after: String){
		getPostsInDraft(authorUsername: $authorUsername orderBy: $orderBy after: $after) {

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
            email
            profilePicture
            username
            bio
            previledge
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
      email
      previledge
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
    const authorUsername = this.props.router.query.authorUsername && this.props.router.query.authorUsername.toLowerCase()
    return (
      <>
      <Head>

        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
        <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category_responsive.css" />
        <link rel="stylesheet" type="text/css" href="/static/author-card/author-card.css" />

        <script src="/static/prebuilt/js/jquery-3.2.1.min.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/popper.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js"></script>
        <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
        <script src="/static/prebuilt/plugins/easing/easing.js"></script>
        <script src="/static/prebuilt/plugins/masonry/masonry.js"></script>
        <script src="/static/prebuilt/plugins/parallax-js-master/parallax.min.js"></script>
        <script src="/static/prebuilt/js/category.js"></script>

      </Head>
      <Query query={AUTHOR_QUERY} variables={{ authorUsername }}>
        {authorMeta => (
          <User>
            {userPayload => (
              <Query query={UPVOTED_POST_AUTHOR_QUERY} variables={{ authorUsername }}>
                {upvotedPostsPayload => {
                  return (
                    <Query query={POST_AUTHOR_QUERY} variables={{ authorUsername }}>
                      {({ data, loading, error, fetchMore }) => {

                        if (loading && !data) {
                          return <Loading />
                        }

                        if (data && data.postsAuthorConnection && authorMeta.data && authorMeta.data.getAuthor) {
                          return (
                            <Query query={DRAFT_POST_AUTHOR_QUERY} variables={{ authorUsername }}>
                              {draftPostsPayload => {
                                const draftPosts = draftPostsPayload.data && draftPostsPayload.data.getPostsInDraft
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

                                      draftPosts={draftPosts && draftPosts.edges.map(x => (x.node))}
                                      draftPageInfo={draftPosts && draftPosts.pageInfo}
                                      draftOnLoadMore={() => {

                                        draftPostsPayload.fetchMore({
                                          variables: {
                                            after: draftPosts.pageInfo.endCursor
                                          },
                                          updateQuery: (prev, { fetchMoreResult }) => {

                                            if (!fetchMoreResult) return prev

                                            var updatedQuery = {
                                              getPostsInDraft: {
                                                __typename: "PostConnection",
                                                pageInfo: fetchMoreResult.getPostsInDraft.pageInfo,
                                                edges: [
                                                  ...prev.getPostsInDraft.edges,
                                                  ...fetchMoreResult.getPostsInDraft.edges
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
                              }}
                            </Query>
                          )
                        } else {
                          return <QueryFailed />
                        }

                      }}
                    </Query>

                  )
                }}
              </Query>
            )}
          </User>
        )}
      </Query>
      </>
    )
  }

}

export default withRouter(authorPage)