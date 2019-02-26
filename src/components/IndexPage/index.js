import React, { Component } from 'react'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar'
import Today from './Today'

export default class IndexPage extends Component {
  render() {
    return (
      <PageContent>

        { /* PAGE CONTENT */ }
        <div className="col-lg-9">
					<div className="main_content">

						<Today />

						<div className="blog_section">
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">What's Trending</div>
								<div className="section_tags ml-auto">
									<ul>
										<li className="active"><a href="category.html">all</a></li>
										<li><a href="category.html">style hunter</a></li>
										<li><a href="category.html">vogue</a></li>
										<li><a href="category.html">health & fitness</a></li>
										<li><a href="category.html">travel</a></li>
									</ul>
								</div>
								<div className="section_panel_more">
									<ul>
										<li>more
											<ul>
												<li><a href="category.html">new look 2018</a></li>
												<li><a href="category.html">street fashion</a></li>
												<li><a href="category.html">business</a></li>
												<li><a href="category.html">recipes</a></li>
												<li><a href="category.html">sport</a></li>
												<li><a href="category.html">celebrities</a></li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
							<div className="section_content">
								<div className="grid clearfix">

									<div className="card card_large_with_background grid-item">
										<div className="card_background" style={{backgroundImage:"url(/static/prebuilt/images/post_8.jpg)"}}></div>
										<div className="card-body">
											<div className="card-title"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card grid-item card_large_with_image">
										<img className="card-img-top" src="/static/prebuilt/images/post_9.jpg" alt="" />
										<div className="card-body">
											<div className="card-title"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<p className="card-text">Pick the yellow peach that looks like a sunset with its red, orange, and pink coat skin, peel it off with your teeth. Sink them into unripened...</p>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_small_with_image grid-item">
										<img className="card-img-top" src="/static/prebuilt/images/post_5.jpg" alt="" />
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
											<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
										</div>
									</div>

									<div className="card card_default card_default_with_background grid-item">
										<div className="card_background" style={{backgroundImage:"url(/static/prebuilt/images/post_6.jpg)"}}></div>
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most</a></div>
										</div>
									</div>

									<div className="card card_default card_default_no_image grid-item">
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most</a></div>
										</div>
									</div>

									<div className="card card_default card_default_no_image grid-item">
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most</a></div>
										</div>
									</div>

									<div className="card card_default card_default_with_background grid-item">
										<div className="card_background" style={{backgroundImage:"url(/static/prebuilt/images/post_7.jpg)"}}></div>
										<div className="card-body">
											<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most</a></div>
										</div>
									</div>

								</div>
								
							</div>
						</div>

						<div className="blog_section">
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">Most Popular Videos</div>
							</div>
							<div className="section_content">
								<div className="row">
									<div className="col">
										<div className="videos">
											<div className="player_container">
												<div id="P1" className="player" 
												     data-property="{videoURL:'2ScS5kwm7nI',containment:'self',startAt:0,mute:false,autoPlay:false,loop:false,opacity:1}">
												</div>
											</div>
											<div className="playlist">
												<div className="playlist_background"></div>

												<div className="video_container video_command active" onclick="jQuery('#P1').YTPChangeVideo({videoURL: '2ScS5kwm7nI', mute:false, addRaster:true})">
													<div className="video d-flex flex-row align-items-center justify-content-start">
														<div className="video_image"><div><img src="/static/prebuilt/images/video_1.jpg" alt="" /></div><img className="play_img" src="/static/prebuilt/images/play.png" alt="" /></div>
														<div className="video_content">
															<div className="video_title">How Did van Gogh’s Turbulent Mind</div>
															<div className="video_info"><span>1.2M views</span><span>Sep 29</span></div>
														</div>
													</div>
												</div>

												<div className="video_container video_command" onclick="jQuery('#P1').YTPChangeVideo({videoURL: 'BzMLA8YIgG0', mute:false, addRaster:true})">
													<div className="video d-flex flex-row align-items-center justify-content-start">
														<div className="video_image"><div><img src="/static/prebuilt/images/video_2.jpg" alt="" /></div><img className="play_img" src="/static/prebuilt/images/play.png" alt="" /></div>
														<div className="video_content">
															<div className="video_title">How Did van Gogh’s Turbulent Mind</div>
															<div className="video_info"><span>1.2M views</span><span>Sep 29</span></div>
														</div>
													</div>
												</div>

												<div className="video_container video_command" onclick="jQuery('#P1').YTPChangeVideo({videoURL: 'bpbcSdqvtUQ', mute:false, addRaster:true})">
													<div className="video d-flex flex-row align-items-center justify-content-start">
														<div className="video_image"><div><img src="/static/prebuilt/images/video_3.jpg" alt="" /></div><img className="play_img" src="/static/prebuilt/images/play.png" alt="" /></div>
														<div className="video_content">
															<div className="video_title">How Did van Gogh’s Turbulent Mind</div>
															<div className="video_info"><span>1.2M views</span><span>Sep 29</span></div>
														</div>
													</div>
												</div>

												<div className="video_container video_command" onclick="jQuery('#P1').YTPChangeVideo({videoURL: 'UjYemgbhJF0', mute:false, addRaster:true})">
													<div className="video d-flex flex-row align-items-center justify-content-start">
														<div className="video_image"><div><img src="/static/prebuilt/images/video_4.jpg" alt="" /></div><img className="play_img" src="/static/prebuilt/images/play.png" alt="" /></div>
														<div className="video_content">
															<div className="video_title">How Did van Gogh’s Turbulent Mind</div>
															<div className="video_info"><span>1.2M views</span><span>Sep 29</span></div>
														</div>
													</div>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="blog_section">
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">Latest Articles</div>
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
