import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Grid } from 'styled-css-grid'

import Card from '../Card/'
import { Loading, QueryFailed } from '../QueryStatus'

export const TODAY_QUERY = gql`
	query TODAY_QUERY($orderBy: PostOrderByInput $after: String){
		getToday(orderBy: $orderBy after: $after) {
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
					}
          upvotes {
            id
            user {
              id
            }
          }
					createdAt
          updatedAt
				}
			}
		}
	}
`

export default class Today extends Component {

  state = {
    sortMethod: 'upvotesNumber_DESC'
  }

  render() {
    return (
      <Query query={TODAY_QUERY} variables={{orderBy: this.state.sortMethod}}>
        { ({ data, error, fetchMore, loading }) => {

          if (loading && !data) {
            return <Loading />
          }

          if (data && data.getToday) {
            const posts = data.getToday.edges.map(x => (x.node) )
            const pageInfo =  data.getToday.pageInfo
            return (
              <div className="blog_section">
                <div className="section_panel d-flex flex-row align-items-center justify-content-start">
                  <div className="section_title">Today 📆</div>
                  <div className="section_panel_more">
                    <ul>
                      <li>{ this.state.sortMethod === 'upvotesNumber_DESC' ? 'Fame' : this.state.sortMethod === 'createdAt_DESC' ? 'TIME' : 'Sort' }
                        <ul>
                          <li style={{cursor: 'pointer'}}><a onClick={() => this.setState({ sortMethod: 'upvotesNumber_DESC' })} href="JavaScript:Void(0)">by Fame</a></li>
                          <li style={{cursor: 'pointer'}}><a onClick={() => this.setState({ sortMethod: 'createdAt_DESC' })} href="JavaScript:Void(0)">by Recent/Time</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="section_content" style={{width: "100%"}}>
                  <div style={{maxWidth: "900px", width: "100%"}}>
                    {posts.length > 0 && <Grid
                      columns="repeat(auto-fit, minmax(260px, 1fr))"
                      gap="20px"
                      style={{width: "100%", margin: "0px auto"}}
                    >
                      { posts.map((post, index) => {

                        return <Card type="small_image" post={post} key={index} user={this.props.user} getToday />

                      }) }
                    </Grid>}
                    { posts.length === 0 && <p>No posts published today!</p> }
                  </div>

                  { pageInfo.hasNextPage && (
                    <div id="load_more" className="load_more_button text-center trans_200" style={{marginTop: "50px"}} onClick={() => {
                      fetchMore({

                        variables: {
                          after: data.getToday.pageInfo.endCursor
                        },

                        updateQuery: (prev, { fetchMoreResult }) => {

                          if (!fetchMoreResult) return prev

                          var updatedQuery = {
                            getToday: {
                              __typename: "PostConnection",
                              pageInfo: fetchMoreResult.getToday.pageInfo,
                              edges: [
                                ...prev.getToday.edges,
                                ...fetchMoreResult.getToday.edges
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
