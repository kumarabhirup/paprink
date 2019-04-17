import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import categorySorter from '../lib/categorySorter'
import { Loading, QueryFailed } from './QueryStatus'

export const FEATURED_QUERY = gql`
	query FEATURED_QUERY {
		getFeatured {
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
      categories {
        category
      }
		}
	}
`

function indexRoller(index) {
  if (index === 3) return 0
  else return index + 1
}

export default class HomeSlider extends Component {
  render() {
    return (
      <Query query={FEATURED_QUERY}>
        { ({ data, error, loading }) => {

          if (loading && !data) {
            return <Loading />
          }

          if (data && data.getFeatured) {
            console.log(data.getFeatured)
            return (
              <div className="home">
                <div className="home_slider_container">
                  <div className="owl-carousel owl-theme home_slider">


                    { data.getFeatured.map((post, index) => 
                      (<div className="owl-item">
                        <div className="home_slider_background" style={{ backgroundColor: "black", backgroundImage: `url(${post.thumbnail.blackOverlayImage})` }}></div>
                        <div className="home_slider_content_container">
                          <div className="container">
                            <div className="row">
                              <div className="col">
                                <div className="home_slider_content">
                                  { categorySorter(post.categories).map((tag, index) => {
                                    return (
                                      <div key={index} className="home_slider_item_category trans_200" style={{display: 'inline-block', width: 'auto', padding: '0px 12px'}}><a href={`/categories/${tag.id}`} className="trans_200" style={{width: 'auto'}}>{ tag.text }</a></div>
                                    )
                                  }) }
                                  <div className="home_slider_item_title">
                                    <a href={`/p/${post.slug}-${post.id}`}>{ post.title }</a>
                                  </div>
                                  <div className="home_slider_item_link">
                                    <a href={`/p/${post.slug}-${post.id}`} className="trans_200">Continue Reading
                                      <svg version="1.1" id="link_arrow_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        width="19px" height="13px" viewBox="0 0 19 13" enableBackground="new 0 0 19 13" xmlSpace="preserve">
                                        <polygon fill="#FFFFFF" points="12.475,0 11.061,0 17.081,6.021 0,6.021 0,7.021 17.038,7.021 11.06,13 12.474,13 18.974,6.5" />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="similar_posts_container">
                          <div className="container">
                            <div className="row d-flex flex-row align-items-end">
                              <div className="col-lg-3 col-md-6 similar_post_col">
                                <div className="similar_post trans_200">
                                  <a href="#">How Did van Gogh’s Turbulent Mind Depict One of the Most</a>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6 similar_post_col">
                                <div className="similar_post trans_200">
                                  <a href="#">How Did van Gogh’s Turbulent Mind Depict One of the Most</a>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6 similar_post_col">
                                <div className="similar_post trans_200">
                                  <a href="#">How Did van Gogh’s Turbulent Mind Depict One of the Most</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="home_slider_next_container">
                            <div className="home_slider_next" style={{ backgroundImage: `url(${data.getFeatured[indexRoller(index)].thumbnail.image})` }}>
                              <div className="home_slider_next_background trans_400"></div>
                              <div className="home_slider_next_content trans_400">
                                <div className="home_slider_next_title">next</div>
                                <div className="home_slider_next_link">{data.getFeatured[indexRoller(index)].title}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )) }

                    
                  </div>
                  <div className="custom_nav_container home_slider_nav_container">
                    <div className="custom_prev custom_prev_home_slider">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="7px" height="12px" viewBox="0 0 7 12" enableBackground="new 0 0 7 12" xmlSpace="preserve">
                        <polyline fill="#FFFFFF" points="0,5.61 5.609,0 7,0 7,1.438 2.438,6 7,10.563 7,12 5.609,12 -0.002,6.39 "/>
                      </svg>
                    </div>
                    <ul id="custom_dots" className="custom_dots custom_dots_home_slider">
                      <li className="custom_dot custom_dot_home_slider active"><span></span></li>
                      <li className="custom_dot custom_dot_home_slider"><span></span></li>
                      <li className="custom_dot custom_dot_home_slider"><span></span></li>
                      <li className="custom_dot custom_dot_home_slider"><span></span></li>
                    </ul>
                    <div className="custom_next custom_next_home_slider">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="7px" height="12px" viewBox="0 0 7 12" enableBackground="new 0 0 7 12" xmlSpace="preserve">
                        <polyline fill="#FFFFFF" points="6.998,6.39 1.389,12 -0.002,12 -0.002,10.562 4.561,6 -0.002,1.438 -0.002,0 1.389,0 7,5.61 "/>
                      </svg>
                    </div>
                  </div>
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
