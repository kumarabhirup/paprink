import React, { Component } from 'react'
import OwlCarousel from './OwlCarousel'
import { sidebar } from '../../api/posts'

export default class Sidebar extends Component {

  sortPostsData = () => {
    let data = [sidebar.filter((post, index) => index < 4), sidebar.filter((post, index) => index > 3 && index < 8), sidebar.filter((post, index) => index > 7 && index < 12)]
    // sidebar.reduce(())
    console.log(data)
    return data
  }

  render() {
    return (
      <div className="col-lg-3">
        <div className="sidebar">
          <div className="sidebar_background"></div>

          <OwlCarousel title="Evergreen 🖼️" data={this.sortPostsData()} />

          <div className="sidebar_section">
            <div className="advertising">
              <div className="advertising_background" style={{backgroundImage:"url(/static/prebuilt/images/post_17.jpg)"}}></div>
              <div className="advertising_content d-flex flex-column align-items-start justify-content-end">
                <div className="advertising_perc">Mail us at info@iqubex.com</div>
                <div className="advertising_link"><a href="#">See your Ad here!</a></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

}