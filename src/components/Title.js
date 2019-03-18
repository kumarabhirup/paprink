import React, { Component } from 'react'
import { withRouter } from 'next/router'

import { meta } from '../api/meta'

class Title extends Component {

  render() {
    return (
      <>
        <div className="home">
          <div className="home_background parallax-window" data-parallax="scroll" data-image-src={this.props.thumbnail || "/static/prebuilt/images/post.jpg"} data-speed="0.8"></div>
          <div className="home_content">
            <div style={{display: 'inline-block'}}>
              { this.props.tags && this.props.tags.map((tag, index) => {
                return (
                  <div key={index} className="post_category trans_200" style={{display: 'inline-block', width: 'auto', padding: '0px 12px'}}><a href="#" className="trans_200" style={{width: 'auto'}}>{tag.text}</a></div>
                )
              }) }
            </div>
            {/* <div className="post_title">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div> */}
            <div className="post_title" style={{fontSize: '35px'}}>{ this.props.title || 'Write an Awesome title!' }</div>
            <br />
            { this.props.noSidebar && (
              <div className="post_author d-flex flex-row align-items-center justify-content-center">
                <div className="author_image"><div><img src={this.props.currentUser.profilePicture} alt={this.props.currentUser.name} /></div></div>
                <div className="post_meta"><a href={`${meta.domain}/signin?intent=${this.props.router.asPath}`}>Written by <strong>{ this.props.currentUser.name }</strong></a></div>
              </div>
            ) }
          </div>
        </div>
      </>
    )
  }

}

export default withRouter(Title)