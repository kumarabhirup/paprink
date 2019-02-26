import React, { Component } from 'react'
import { today } from '../../api/posts'
import Card from '../Card'

export default class Trending extends Component {
  render() {
    return (
      <div className="blog_section">
        <div className="section_panel d-flex flex-row align-items-center justify-content-start">
          <div className="section_title">Trending this week 🔥</div>
        </div>
        <div className="section_content">
          <div className="grid clearfix">

            { today.map((post, index) => {
              if(index === 0) {
                return <Card type="large_background" post={post} key={index} />
              }
              
              if(index === 1) {
                return <Card type="large_image" post={post} key={index} />
              }

              if(index === 2) {
                return <Card type="small_image" post={post} key={index} />
              }

              if(index > 2 && index < 4) {
                return <Card type="mini" post={post} key={index} />
              }
            }) }

          </div>
          
        </div>
      </div>
    )
  }
}
