import React, { Component } from 'react'
import { Grid } from 'styled-css-grid'
import Head from 'next/head'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import Card from './Card/'
import { meta } from '../api/meta'
import { FB_LOGIN_APP_ID } from '../lib/constants';

export default class CategoryPage extends Component {
  render() {
    return (
			<PageContent>

				<Head>

					<title>{ `Posts about '${this.props.category}' @ ${meta.title}` }</title>

					<meta name="title" content={ `Posts about ${this.props.category} @ ${meta.title}` } />
					<meta name="topic" content={ `Posts about ${this.props.category} @ ${meta.title}` } />
					<meta name="subject" content={ `Posts about ${this.props.category} @ ${meta.title}` } />
					<meta name="identifier-URL" content={meta.domain} />
					<meta name="robots" content="index,follow" />
					<meta name="description" content={ `Read all ${this.props.category} @ ${meta.title}!` } />
					<meta name="url" content={`${meta.domain}/categories/${this.props.queryCategory}`} />
					<meta name="rating" content="General" />
					<meta http-equiv="Cache-Control" content="no-cache" />

					<meta property="og:title" content={ `Posts about ${this.props.category} @ ${meta.title}` } />
					<meta name="twitter:title" content={ `Posts about ${this.props.category} @ ${meta.title}` } />
					<meta property="og:type" content="article" />
					<meta name="twitter:card" content="summary" />
					<meta property="og:url" content={`${meta.domain}/categories/${this.props.queryCategory}`} />
					<meta name="twitter:url" content={`${meta.domain}/categories/${this.props.queryCategory}`} />
					<meta property="og:image" content={meta.image} />
				  <meta name="twitter:image" content={meta.image} />
					<meta property="og:site_name" content={meta.name} />
					<meta property="fb:app_id" content={FB_LOGIN_APP_ID} />
					<meta property="og:description" content={ `Read all ${this.props.category} @ ${meta.title}!` } />
					<meta name="twitter:description" content={ `Read all ${this.props.category} @ ${meta.title}!` } />

				</Head>

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
									columns="repeat(auto-fit, minmax(260px, 1fr))"
									gap="20px"
									style={{width: "100%", margin: "0px auto"}}
                >
									{ this.props.posts.length > 0 ? this.props.posts.map(post => {
										return <Card type={'small_image'} post={post} key={post.id} user={this.props.user} category />
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
