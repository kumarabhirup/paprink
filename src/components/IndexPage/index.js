import React, { Component } from 'react'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar/'
import Today from './Today'
import Trending from './Trending'
import Latest from './Latest'

export default class IndexPage extends Component {
  render() {
    return (
      <PageContent>

        { /* PAGE CONTENT */ }
        <div className="col-lg-9">
					<div className="main_content">
						<Today />
						<Trending />
						<Latest />
					</div>
				</div>
        { /* END OF PAGE CONTENT */ }

        <Sidebar />

      </PageContent>
    )
  }
}
