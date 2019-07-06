import React, { Component } from 'react'
import chunk from 'lodash.chunk'

import OwlCarousel from './OwlCarousel'
import { sidebar } from '../../api/posts'
import { meta } from '../../api/meta'

export default class Sidebar extends Component {

  sortPostsData = () => (chunk(sidebar, 4))

  render() {
    return (
      <div className="col-lg-3">
        <div className="sidebar">
          <div className="sidebar_background"></div>

          {/* <OwlCarousel title="Evergreen 🖼️" data={this.sortPostsData()} /> */}

          <div className="sidebar_section">
            <h4 style={{fontWeight: "bold"}}>Supporting makers!</h4>
            <iframe style={{border: "0px solid #fff"}} src="https://makerads.xyz/ad" frameBorder="0" width="275" height="144" />
            <iframe style={{border: "0px solid #fff"}} src="https://makerads.xyz/ad" frameBorder="0" width="275" height="144" />
          </div>

          {/* <div className="sidebar_section">
            <h4 style={{fontWeight: "bold"}}>We're on Product Hunt!</h4>
            <iframe style={{border: "5px solid #fff"}} src="https://cards.producthunt.com/cards/posts/157716?v=1" width="100%" height="405" frameBorder="0" scrolling="no" allowFullScreen />
          </div> */}

          {/* <div className="sidebar_section">
            <div className="advertising">
              <div className="advertising_background" style={{backgroundImage:"url(/static/prebuilt/images/post_17.jpg)"}}></div>
              <div className="advertising_content d-flex flex-column align-items-start justify-content-end">
                <div className="advertising_perc">Mail us at info@iqubex.com</div>
                <div className="advertising_link"><a href={`mailto:${meta.email}?Subject=Hey!%20Wanna%20be%20lifelong%20partners?`}>See your Ad here!</a></div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    )
  }

}
