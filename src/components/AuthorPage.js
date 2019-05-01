import React, { Component } from 'react'
import { Grid } from 'styled-css-grid'
import Head from 'next/head'
import { Tab, Tabs } from 'react-bootstrap'

import PageContent from './PageContent'
import Card from './Card/'
import { meta } from '../api/meta'

export default class AuthorPage extends Component {

  render() {
    return (
			<>
      <PageContent noSidebar>

				<Head>
					<title>{ `${this.props.authorData.name} (@${this.props.authorData.username}) - ${meta.title}` }</title>
				</Head>

        {/* Page Content */}

				<div className="col-lg-10 offset-lg-1">
					<div className="main_content" style={{paddingBottom: "40px"}}>

						{/* Created Posts */}
						<div className="category">
							<div className="section_content" style={{width: "100%"}}>
								<div style={{maxWidth: "900px", width: "100%"}}>
								
									<Tabs defaultActiveKey="published" id="uncontrolled-tab-example">
										<Tab eventKey="published" title={`${this.props.publishedPostsCount} Published`}>
											<Grid
												columns="repeat(auto-fill, 260px)"
												gap="20px"
											>
												{ this.props.publishedPosts.length > 0 ? this.props.publishedPosts.map(post => {
													return <Card type={'small_image'} post={post} key={post.id} author user={this.props.user} />
												}) : <p>No posts available.</p> }
											</Grid>
											{ this.props.publishedPageInfo.hasNextPage && (
												<div className="load_more">
													<div id="load_more" className="load_more_button text-center trans_200" onClick={this.props.publishedOnLoadMore}>Load More</div>
												</div>
											) }
										</Tab>

										<Tab eventKey="upvoted" title={`${this.props.upvotedPostsCount} Upvoted`}>
											<Grid
												columns="repeat(auto-fill, 260px)"
												gap="20px"
											>
												{ this.props.upvotedPosts.length > 0 ? this.props.upvotedPosts.map(post => {
													return <Card type={'small_image'} post={post} key={post.id} author user={this.props.user} />
												}) : <p>No posts upvoted.</p> }
											</Grid>
											{ this.props.upvotedPageInfo.hasNextPage && (
												<div className="load_more">
													<div id="load_more" className="load_more_button text-center trans_200" onClick={this.props.upvotedOnLoadMore}>Load More</div>
												</div>
											) }
										</Tab>

									</Tabs>

								</div>
							</div>
						</div>

					</div>
				</div>

        {/* End of Page Content */}

      </PageContent>
			</>
    )
  }

}
