import React, { Component } from 'react'
import Head from 'next/head'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import { today } from '../api/posts'
import Card from './Card/'

export default class CategoryPage extends Component {
  render() {
    return (
			<>
			<Head></Head>
      <PageContent>

        {/* Page Content */}

				<div className="col-lg-9">
					<div className="main_content">

						<div className="col-md-6" style={{position: "relative", margin: "20px auto", color: "#ffffff"}}>
							<div className="material-card Pink">
								<h2>
										<span><b>Christopher Walken</b></span>
										<strong>
												<i className="fa fa-fw fa-star"></i>
												The Deer Hunter
										</strong>
								</h2>
								<div className="mc-content">
										<div className="img-container">
												<img className="img-responsive" src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg" style={{display: "block", maxWidth: "100%", height: "100%"}} />
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
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">Sports</div>
							</div>
							<div className="section_content">
								<div className="grid clearfix">
									{ today.map((post, index) => {
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
			</>
    )
  }
}
