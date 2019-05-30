import React, { Component } from 'react'
import { Grid } from 'styled-css-grid'
import Head from 'next/head'
import { Tab, Tabs } from 'react-bootstrap'

import PageContent from './PageContent'
import Card from './Card/'
import { meta } from '../api/meta'
import { VerfiedBadge } from '../api/mini'

export default class AuthorPage extends Component {

  render() {
    return (
			<>
      <PageContent noSidebar>

				<Head>

					<title>{ `${this.props.authorData.name} (@${this.props.authorData.username}) - ${meta.title}` }</title>

					<meta name="title" content={ `${this.props.authorData.name} (@${this.props.authorData.username})` } />
					<meta name="topic" content={ `${this.props.authorData.name} (@${this.props.authorData.username})` } />
					<meta name="subject" content={ `${this.props.authorData.name} (@${this.props.authorData.username})` } />
					<meta name="identifier-URL" content={meta.domain} />
					<meta name="robots" content="index,follow" />
					<meta name="description" content={`${this.props.authorData.name}'s profile @ ${meta.name}!`} />
					<meta name="author" content={`${this.props.authorData.name}, ${this.props.authorData.email}`} />
					<meta name="url" content={`${meta.domain}/author/${this.props.authorData.username}`} />
					<meta name="rating" content="General" />
					<meta httpEquiv="Cache-Control" content="no-cache" />

					<meta property="og:title" content={ `${this.props.authorData.name} (@${this.props.authorData.username})` } />
					<meta name="twitter:title" content={ `${this.props.authorData.name} (@${this.props.authorData.username})` } />
					<meta property="og:type" content="article" />
					<meta name="twitter:card" content="summary" />
					<meta property="og:url" content={`${meta.domain}/author/${this.props.authorData.username}`} />
					<meta name="twitter:url" content={`${meta.domain}/author/${this.props.authorData.username}`} />
					{/* <meta property="og:image" content={this.props.authorData.profilePicture} />
					<meta name="twitter:image" content={this.props.authorData.profilePicture} /> */}
					<meta property="og:image" content={meta.image} />
				  <meta name="twitter:image" content={meta.image} />
					<meta property="og:site_name" content={meta.name} />
					<meta property="fb:app_id" content={process.env.FB_LOGIN_APP_ID} />
					<meta property="og:description" content={`${this.props.authorData.name}'s profile @ ${meta.name}!`} />
					<meta name="twitter:description" content={`${this.props.authorData.name}'s profile @ ${meta.name}!`} />

				</Head>

        {/* Page Content */}

				<div className="col-lg-10 offset-lg-1">
					<div className="main_content" style={{paddingBottom: "40px"}}>

						<div className="blog-card" style={{width: "100%"}}>
							<div className="meta">
								<div className="photo" style={{backgroundImage: `url(${this.props.authorData.profilePicture})`}}></div>
							</div>
							<div className="description">
								<h1 style={{fontFamily: "calibri,sans-serif", color: "#000"}}>{ this.props.authorData.name }{ this.props.authorData.previledge.some(element => element === "VERIFIED") && (<>&nbsp;<VerfiedBadge width={20} /></>) }</h1>
								<h2 style={{textTransform: "initial"}}>@{ this.props.authorData.username }</h2>
								<p>{ this.props.authorData.bio || "This profile hasn't written any bio yet 😅" }</p>
							</div>
						</div>

						{/* Created Posts */}
						<div className="category" style={{marginTop: "0px"}}>
							<div className="section_content" style={{width: "100%"}}>
								<div style={{maxWidth: "900px", width: "100%"}}>
								
									<Tabs defaultActiveKey="published" id="uncontrolled-tab-example">
										<Tab eventKey="published" title={`Posts Published`}>
											<Grid
												columns="repeat(auto-fit, minmax(260px, 1fr))"
												gap="20px"
												style={{width: "100%", margin: "0px auto"}}
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

										<Tab eventKey="upvoted" title={`Posts Upvoted`}>
											<Grid
												columns="repeat(auto-fit, minmax(260px, 1fr))"
												gap="20px"
												style={{width: "100%", margin: "0px auto"}}
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

										{
											this.props.draftPosts && (
												<Tab eventKey="drafted" title={<b>Your Drafts</b>}>
													<Grid
														columns="repeat(auto-fit, minmax(260px, 1fr))"
														gap="20px"
														style={{width: "100%", margin: "0px auto"}}
													>
														{ this.props.draftPosts.length > 0 ? this.props.draftPosts.map(post => {
															return <Card type={'small_image'} post={post} key={post.id} author user={this.props.user} />
														}) : <p>No drafts found.</p> }
													</Grid>
													{ this.props.draftPageInfo.hasNextPage && (
														<div className="load_more">
															<div id="load_more" className="load_more_button text-center trans_200" onClick={this.props.draftOnLoadMore}>Load More</div>
														</div>
													) }
												</Tab>
											)
										}

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
