import React, { Component } from 'react'
import { Grid } from 'styled-css-grid'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import Card from './Card/'

export default class AuthorPage extends Component {
  render() {
    return (
			<>
      <PageContent>

        {/* Page Content */}

				<div className="col-lg-9">
					<div className="main_content" style={{paddingBottom: "40px"}}>

						<div className="col-md-6" style={{position: "relative", margin: "20px auto", color: "#ffffff"}}>
							<div className="material-card Pink" style={{width: "350px"}}>
								<h2>
										<span><b>{ this.props.authorData.name }</b></span>
										<strong>
												<i className="fa fa-fw fa-star"></i>
												{ this.props.authorData.username }
										</strong>
								</h2>
								<div className="mc-content">
										<div className="img-container">
												<img className="img-responsive" src={this.props.authorData.profilePicture} style={{display: "block", maxWidth: "100%", height: "100%"}} />
										</div>
										<div className="mc-description" style={{color: "black", marginTop: "-10px"}}>
												He has appeared in more than 100 films and television shows, including The Deer Hunter, Annie Hall, The Prophecy trilogy, The Dogs of War ...
										</div>
								</div>
								<a className="mc-btn-action">
										<i className="fa fa-bars"></i>
								</a>
								<div className="mc-footer">
										<h4>
												Social
										</h4>
										<a className="fa fa-fw fa-facebook" style={{borderRadius: "100%"}}></a>
										<a className="fa fa-fw fa-twitter" style={{borderRadius: "100%"}}></a>
										<a className="fa fa-fw fa-linkedin" style={{borderRadius: "100%"}}></a>
										<a className="fa fa-fw fa-google-plus" style={{borderRadius: "100%"}}></a>
								</div>
							</div>
						</div>

						<div className="category">
							<div className="section_content" style={{width: "100%"}}>
								<div style={{maxWidth: "900px", width: "100%"}}>
								<Grid
									columns="repeat(auto-fill, 260px)"
									gap="20px"
                >
									{ this.props.posts.length > 0 ? this.props.posts.map(post => {
										return <Card type={'small_image'} post={post} key={post.id} author />
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
			</>
    )
  }
}
