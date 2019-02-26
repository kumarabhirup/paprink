import React, { Component } from 'react'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import { today } from '../api/posts'
import Card from './Card'
import { getRandomInt } from '../lib/getRandomInt'

export default class CategoryPage extends Component {
  render() {
    return (
      <PageContent>

        {/* Page Content */}

				<div className="col-lg-9">
					<div className="main_content">

						<div className="category">
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">Sports</div>
							</div>
							<div className="section_content">
								<div className="grid clearfix">

									{ today.map((post, index) => {
										const types = ['small_image', 'small_background', 'mini']
										return <Card type={'small_image'} post={post} key={index} />
									}) }

								</div>
							</div>
						</div>

					</div>
					<div className="load_more">
						<div id="load_more" className="load_more_button text-center trans_200">Load More</div>
					</div>
				</div>

        {/* End of Page Content */}

        <Sidebar />

      </PageContent>
    )
  }
}
