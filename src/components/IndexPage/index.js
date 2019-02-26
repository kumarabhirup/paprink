import React, { Component } from 'react'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar'
import Today from './Today'
import Trending from './Trending'

export default class IndexPage extends Component {
  render() {
    return (
      <PageContent>

        { /* PAGE CONTENT */ }
        <div className="col-lg-9">
					<div className="main_content">

						<Today />
						
						<Trending />

						<div className="blog_section">
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">Latest Articles 🚗</div>
							</div>
							<div className="section_content">
								<div className="grid clearfix">

									<div className="card card_small_with_image grid-item">
										<img className="card-img-top" src="/static/prebuilt/images/post_10.jpg" alt="" />
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_default card_small_no_image grid-item">
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_small_with_image grid-item">
										<img className="card-img-top" src="/static/prebuilt/images/post_15.jpg" alt="" />
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_small_with_image grid-item">
										<img className="card-img-top" src="/static/prebuilt/images/post_13.jpg" alt="https://unsplash.com/@jakobowens1" />
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_default card_small_with_background grid-item">
										<div className="card_background" style={{backgroundImage:"url(/static/prebuilt/images/post_11.jpg)"}}></div>
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_default card_small_with_background grid-item">
										<div className="card_background" style={{backgroundImage:"url(/static/prebuilt/images/post_16.jpg)"}}></div>
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_small_with_image grid-item">
										<img className="card-img-top" src="/static/prebuilt/images/post_14.jpg" alt="" />
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_default card_small_no_image grid-item">
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_default card_small_no_image grid-item">
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_default card_default_with_background grid-item">
										<div className="card_background" style={{backgroundImage:"url(/static/prebuilt/images/post_12.jpg)"}}></div>
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most</a></div>
										</div>
									</div>

									<div className="card card_default card_default_with_background grid-item">
										<div className="card_background" style={{backgroundImage:"url(/static/prebuilt/images/post_6.jpg)"}}></div>
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most</a></div>
										</div>
									</div>
								</div>
								
							</div>
						</div>

					</div>
					<div className="load_more">
						<div id="load_more" className="load_more_button text-center trans_200">Load More</div>
					</div>
				</div>

        { /* END OF PAGE CONTENT */ }

        <Sidebar />

      </PageContent>
    )
  }
}
