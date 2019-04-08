import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import CategoryPage from '../src/components/CategoryPage'
import categorySorter from '../src/lib/categorySorter'
import { Loading, QueryFailed } from '../src/components/QueryStatus'

const CATEGORY_QUERY = gql`
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
					author {
						id
						name
						lname
						fname
					}
          upvotes {
            id
          }
					createdAt
          updatedAt
				}
			}
		}
	}
`

class categoryPage extends Component {
  render() {
    return (
      <Query query={CATEGORY_QUERY} variables={{
				categorySlug: this.props.router.query.category && this.props.router.query.category.toUpperCase()
			}}>
				{ ({ data, loading, error, fetchMore }) => {

          if (loading && !data) {
            return <Loading />
          }

					if (data && data.postsCategoryConnection) {

						const catagoryObject = categorySorter([{category: this.props.router.query.category}])
						return (
              <>
              <Header />
              <Title title={catagoryObject[0].text} />
              <CategoryPage 
                category={catagoryObject[0].text} 
                posts={data.postsCategoryConnection.edges.map(x => (x.node) )} 
                pageInfo={data.postsCategoryConnection.pageInfo} 
                onLoadMore={() => {
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

				} }
			</Query>

    )
  }
}

export default withRouter(categoryPage)