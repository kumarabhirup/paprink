import React, { Component } from 'react'

export default class Title extends Component {
  render() {
    return (
      <>
        <div className="home">
          <div className="home_background parallax-window" data-parallax="scroll" data-image-src="/static/prebuilt/images/post.jpg" data-speed="0.8"></div>
          <div className="home_content">
            <div className="post_category trans_200"><a href="#" className="trans_200">sport</a></div>
            {/* <div className="post_title">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div> */}
            <div className="post_title">EVERYTHING ABOUT SPORTS</div>
            { this.props.noSidebar && (
              <div className="post_author d-flex flex-row align-items-center justify-content-center">
                <div className="author_image"><div><img src="static/prebuilt/images/author.jpg" alt="" /></div></div>
                <div className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></div>
              </div>
            ) }
          </div>
        </div>
      </>
    )
  }
}
