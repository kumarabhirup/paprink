import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Grid } from 'styled-css-grid'

import Card from '../Card/'
import { Loading, QueryFailed } from '../QueryStatus'

export const WEEKLY_QUERY = gql`
	query WEEKLY_QUERY($orderBy: PostOrderByInput $after: String){
		getWeekly(orderBy: $orderBy after: $after) {
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

export default class Trending extends Component {
  render() {
    return (
      <Query query={WEEKLY_QUERY}>
        {({ data, error, fetchMore, loading }) => {

          if (loading && !data) {
            return <Loading />
          }

          if (data && data.getWeekly) {
            const posts = data.getWeekly.edges.map(x => (x.node) )
            const pageInfo =  data.getWeekly.pageInfo
            return (
              <>
                <div className="blog_section">
                  <div className="section_panel d-flex flex-row align-items-center justify-content-start">
                    <div className="section_title">Trending this week 🔥</div>
                  </div>
                  <div className="section_content" style={{ width: "100%" }}>
                    <div style={{ maxWidth: "900px", width: "100%" }}>

                      { posts.length > 0 && <Grid
                        columns="repeat(auto-fit, minmax(260px, 1fr))"
                        gap="20px"
                        style={{width: "100%", margin: "0px auto"}}
                      >
                        { posts.map((post, index) => {

                          return <Card type="small_image" post={post} key={index} user={this.props.user} getWeekly />

                        }) }
                      </Grid> }

                      { posts.length === 0 && <p>No posts published yesterday!</p> }

                    </div>
                  </div>
                </div>
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
    )
  }
}
