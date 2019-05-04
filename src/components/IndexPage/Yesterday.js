import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Grid } from 'styled-css-grid'

import Card from '../Card/'
import { Loading, QueryFailed } from '../QueryStatus'

export const YESTERDAY_QUERY = gql`
	query YESTERDAY_QUERY($orderBy: PostOrderByInput $after: String){
		getYesterday(orderBy: $orderBy after: $after) {
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

export default class Yesterday extends Component {
  render() {
    return (
      <Query query={YESTERDAY_QUERY}>
        { ({ data, error, fetchMore, loading }) => {

          if (loading && !data) {
            return <Loading />
          }

          if (data && data.getYesterday) {
            const posts = data.getYesterday.edges.map(x => (x.node) )
            const pageInfo =  data.getYesterday.pageInfo
            return (
              <div className="blog_section">
                <div className="section_panel d-flex flex-row align-items-center justify-content-start">
                  <div className="section_title">Yesterday ❤️</div>
                </div>
                <div className="section_content" style={{width: "100%"}}>
                  <div style={{maxWidth: "900px", width: "100%"}}>
                    {posts.length > 0 && <Grid
                      columns="repeat(auto-fit, minmax(260px, 1fr))"
                      gap="20px"
                      style={{width: "100%", margin: "0px auto"}}
                    >
                      { posts.map((post, index) => {

                        return <Card type="small_image" post={post} key={index} user={this.props.user} getYesterday />

                      }) }
                    </Grid>}
                    { posts.length === 0 && <p>No posts published yesterday!</p> }
                  </div>

                  { pageInfo.hasNextPage && (
                    <div id="load_more" className="load_more_button text-center trans_200" style={{marginTop: "50px"}} onClick={() => {
                      fetchMore({

                        variables: {
                          after: data.getYesterday.pageInfo.endCursor
                        },

                        updateQuery: (prev, { fetchMoreResult }) => {

                          if (!fetchMoreResult) return prev

                          var updatedQuery = {
                            getYesterday: {
                              __typename: "PostConnection",
                              pageInfo: fetchMoreResult.getYesterday.pageInfo,
                              edges: [
                                ...prev.getYesterday.edges,
                                ...fetchMoreResult.getYesterday.edges
                              ]
                            }
                          }

                          return updatedQuery

                        }

                      })
                    }}>See More</div>
                  ) }

                </div>
              </div>
            )
          } else {
            return (
              <QueryFailed />
            )
          }

        } }
      </Query>
    )
  }
}