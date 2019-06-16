import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Grid } from 'styled-css-grid'

import Card from '../Card/'
import { Loading, QueryFailed } from '../QueryStatus'

export const LATEST_QUERY = gql`
	query LATEST_QUERY($after: String){
		getLatest(after: $after) {
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
					createdAt
          updatedAt
          publishedAt
				}
			}
		}
	}
`

export default class Latest extends Component {
  state = {
    moreLoading: false
  }

  render() {
    return (
      <Query query={LATEST_QUERY}>
        {({ data, error, fetchMore, loading }) => {

          if (loading && !data) {
            return <Loading />
          }

          if (data && data.getLatest) {
            const posts = data.getLatest.edges.map(x => (x.node))
            const pageInfo = data.getLatest.pageInfo
            return (
              <div className="blog_section">
                <div className="section_panel d-flex flex-row align-items-center justify-content-start">
                  <div className="section_title">Latest Articles 🚗</div>
                </div>
                <div className="section_content">
                  <div style={{maxWidth: "900px", width: "100%"}}>
                    {posts.length > 0 && <Grid
                      columns="repeat(auto-fit, minmax(260px, 1fr))"
                      gap="20px"
                      style={{width: "100%", margin: "0px auto"}}
                    >
                      { posts.map((post, index) => {

                        return <Card type="small_image" post={post} key={index} user={this.props.user} getLatest />

                      }) }
                    </Grid>}
                    { posts.length === 0 && <p>No posts published.</p> }
                  </div>

                  { pageInfo.hasNextPage && <div className="load_more">
                    <button 
                      id="load_more" 
                      className="load_more_button text-center trans_200" 
                      disabled={this.state.moreLoading} 
                      style={{display: 'block'}}
                      onClick = {() => {
                        this.setState({ moreLoading: true })

                        fetchMore({

                          variables: {
                            after: data.getLatest.pageInfo.endCursor
                          },

                          updateQuery: (prev, { fetchMoreResult }) => {

                            if (!fetchMoreResult) return prev

                            var updatedQuery = {
                              getLatest: {
                                __typename: "PostConnection",
                                pageInfo: fetchMoreResult.getLatest.pageInfo,
                                edges: [
                                  ...prev.getLatest.edges,
                                  ...fetchMoreResult.getLatest.edges
                                ]
                              }
                            }

                            this.setState({ moreLoading: false })

                            return updatedQuery

                          }
                        })
                      }}
                    >
                      {this.state.moreLoading ? 'Loading posts...' : 'See More'}
                    </button>
                  </div> }
                </div>
              </div>
            )
          } else {
            return (
              <QueryFailed />
            )
          }

        }}
      </Query>
    )
  }
}