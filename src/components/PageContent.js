import React, { Component } from 'react'

export default class PageContent extends Component {
  render() {
    return (
      <div className="page_content">
        <div className="container">
          <div className={`row ${!this.props.noSidebar ? `row-lg-eq-height` : null}`}>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
