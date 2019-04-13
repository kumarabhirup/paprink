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
  render() {
    return (
      <Query query={TODAY_QUERY}>
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
                      <li>Sort
                        <ul>
                          <li><a href="category.html">by Popularity</a></li>
                          <li><a href="category.html">by Newest</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="section_content" style={{width: "100%"}}>
                  <div style={{maxWidth: "900px", width: "100%"}}>
                    <Grid
                      columns="repeat(auto-fill, 260px)"
                      gap="20px"
                    >
                      { posts.map((post, index) => {
                        if(index < 2) {
                          return <Card type="small_image" post={post} key={post.id} getToday />
                        }

                        if(index === 2){
                          return <Card type="small_background" post={post} key={index} getToday />
                        }

                        if(index > 2 && index < 5){
                          return <Card type="small_image" post={post} key={index} getToday />
                        }

                        if(index > 4 && index < 7){
                          return <Card type="mini" post={post} key={index} getToday />
                        }

                      }) }
                    </Grid>
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
