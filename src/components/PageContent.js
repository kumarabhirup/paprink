import React, { Component } from 'react'

export default class PageContent extends Component {
  render() {
    return (
      <div className="page_content">
        <div className="container">
          <div className="row row-lg-eq-height">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
