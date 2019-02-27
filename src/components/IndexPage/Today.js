import React, { Component } from 'react'

import { today } from '../../api/posts'
import Card from '../Card'

export default class Today extends Component {
  render() {
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
        <div className="section_content">
          <div className="grid clearfix">

            { today.map((post, index) => {
              if(index < 2) {
                return <Card type="largest" post={post} key={index} />
              }

              if(index === 2){
                return <Card type="small_background" post={post} key={index} />
              }

              if(index > 2 && index < 5){
                return <Card type="small_image" post={post} key={index} />
              }

              if(index > 4 && index < 7){
                return <Card type="mini" post={post} key={index} />
              }

            }) }

          </div>

          <div id="load_more" className="load_more_button text-center trans_200" style={{marginTop: "50px"}}>See More</div>

        </div>
      </div>
    )
  }
}
