import React, { Component } from 'react'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar/'
import Today from './Today'
import Trending from './Trending'
import Latest from './Latest'
import Yesterday from './Yesterday';

export default class IndexPage extends Component {
  render() {
    return (
      <PageContent>

        { /* PAGE CONTENT */ }
        <div className="col-lg-9">
					<div className="main_content" style={{paddingBottom: "40px"}}>
						
              <Today />
              <Yesterday />
              {/* <Trending />
              <Latest />  */}
           
            {/* <h2 style={{marginTop: "40px"}}>Page Under Construction...</h2> */}
					</div>
				</div>
        { /* END OF PAGE CONTENT */ }

        <Sidebar />

      </PageContent>
    )
  }
}
