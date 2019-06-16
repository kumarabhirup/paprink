import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import Head from 'next/head'
import gql from 'graphql-tag'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import CategoryPage from '../src/components/CategoryPage'
import categorySorter from '../src/lib/categorySorter'
import { Loading, QueryFailed } from '../src/components/QueryStatus'
import User from '../src/components/User'

export const CATEGORY_QUERY = gql`
	query CATEGORY_QUERY($categorySlug: String! $orderBy: PostOrderByInput $after: String){
		postsCategoryConnection(categorySlug: $categorySlug orderBy: $orderBy after: $after) {
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
          upvotesNumber
					author {
						id
						name
						lname
						fname
            username
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

class categoryPage extends Component {
  state = {
    moreLoading: false
  }

  render() {
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

          <script src="/static/prebuilt/js/jquery-3.2.1.min.js"></script>
          <script src="/static/prebuilt/styles/bootstrap4/popper.js"></script>
          <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js"></script>
          <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
          <script src="/static/prebuilt/plugins/easing/easing.js"></script>
          <script src="/static/prebuilt/plugins/masonry/masonry.js"></script>
          <script src="/static/prebuilt/plugins/parallax-js-master/parallax.min.js"></script>
          <script src="/static/prebuilt/js/category.js"></script>

        </Head>
        <User>
          {payload => (
            <Query query={CATEGORY_QUERY} variables={{
              categorySlug: this.props.router.query.category && this.props.router.query.category.toUpperCase()
            }}>
              {({ data, loading, error, fetchMore }) => {

                if (loading && !data) {
                  return <Loading />
                }

                if (data && data.postsCategoryConnection) {

                  const catagoryObject = categorySorter([{ category: this.props.router.query.category }])
                  return (
                    <>
                      <Header />
                      <Title title={catagoryObject[0].text} />
                      <CategoryPage
                        user={payload.data && payload.data.me}
                        category={catagoryObject[0].text}
                        queryCategory={this.props.router.query.category}
                        posts={data.postsCategoryConnection.edges.map(x => (x.node))}
                        pageInfo={data.postsCategoryConnection.pageInfo}
                        postsLoading={this.state.moreLoading}
                        onLoadMore={() => {
                          this.setState({ moreLoading: true })

                          fetchMore({
                            variables: {
                              after: data.postsCategoryConnection.pageInfo.endCursor
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {

                              if (!fetchMoreResult) return prev

                              var updatedQuery = {
                                postsCategoryConnection: {
                                  __typename: "PostConnection",
                                  pageInfo: fetchMoreResult.postsCategoryConnection.pageInfo,
                                  edges: [
                                    ...prev.postsCategoryConnection.edges,
                                    ...fetchMoreResult.postsCategoryConnection.edges
                                  ]
                                }
                              }

                              this.setState({ moreLoading: false })

                              return updatedQuery

                            }
                          })
                        }}
                      />
                      <Footer />
                    </>
                  )

                } else {
                  return (
                    <QueryFailed />
                  )
                }

              }}
            </Query>
          )}
        </User>
      </>
    )
  }
}

export default withRouter(categoryPage)