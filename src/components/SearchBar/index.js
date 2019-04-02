import React, { Component } from 'react'

export default class SearchBar extends Component {

  conditionalRenderByDevice() {

    if (this.props.mobile) {
      return (
        <form action="#">
          <input type="search" className="header_search_input menu_mm" required="required" placeholder="Type to Search..." />
          <img className="header_search_icon menu_mm" src="static/prebuilt/images/search_2.png" alt="" />
        </form>
      )
    }

    return (
      <form action="#">
        <input type="search" className="header_search_input" required="required" placeholder="Type to Search..." />
        <img className="header_search_icon" src="/static/prebuilt/images/search.png" alt="Instant Search" />
      </form>
    )

  }

  render() {
    return (
      this.conditionalRenderByDevice() 
    )
  }

}
