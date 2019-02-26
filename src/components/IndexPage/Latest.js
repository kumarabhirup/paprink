import React, { Component } from 'react'
import { today } from '../../api/posts';
import Card from '../Card';

export default class Latest extends Component {
  render() {
    return (
      <div className="blog_section">
        <div className="section_panel d-flex flex-row align-items-center justify-content-start">
          <div className="section_title">Latest Articles 🚗</div>
        </div>
        <div className="section_content">
          <div className="grid clearfix">
            { today.map((post, index) => (<Card type="small_image" post={post} key={index} />)) }
          </div>
          <div className="load_more">
						<div id="load_more" className="load_more_button text-center trans_200">Load More</div>
					</div> 
        </div>
      </div>
    )
  }
}
