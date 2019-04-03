import React, { Component } from 'react'
import { Grid } from 'styled-css-grid'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import Card from './Card/'

export default class CategoryPage extends Component {
  render() {
    return (
			<PageContent>

				{/* Page Content */}

				<div className="col-lg-9">
					<div className="main_content" style={{paddingBottom: "40px"}}>

						<div className="category">
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">{ this.props.category }</div>
							</div>
							<div className="section_content" style={{width: "100%"}}>
								<div style={{maxWidth: "900px", width: "100%"}}>
								<Grid
									columns="repeat(auto-fill, 260px)"
									gap="20px"
                >
									{ this.props.posts.length > 0 ? this.props.posts.map(post => {
										return <Card type={'small_image'} post={post} key={post.id} />
									}) : <p>No posts available.</p> }
								</Grid>
								</div>
							</div>
						</div>

						{ this.props.pageInfo.hasNextPage && (
							<div className="load_more">
								<div id="load_more" className="load_more_button text-center trans_200" onClick={this.props.onLoadMore}>Load More</div>
							</div>
						) }

					</div>
				</div>

				{/* End of Page Content */}

				<Sidebar />

			</PageContent>
    )
  }
}
