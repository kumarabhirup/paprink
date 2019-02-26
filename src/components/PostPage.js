import React, { Component } from 'react'

import PageContent from './PageContent'
import Sidebar from './Sidebar';

export default class PostPage extends Component {
  render() {
    return (
      <PageContent>

        {/* Post Content */}

				<div className="col-lg-9">
					<div className="post_content">

						<div className="post_panel post_panel_top d-flex flex-row align-items-center justify-content-start">
							<div className="author_image"><div><img src="/static/prebuilt/images/author.jpg" alt="" /></div></div>
							<div className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></div>
							<div className="post_share ml-sm-auto">
								<span>share</span>
								<ul className="post_share_list">
									<li className="post_share_item"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
									<li className="post_share_item"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
									<li className="post_share_item"><a href="#"><i className="fa fa-google" aria-hidden="true"></i></a></li>
								</ul>
							</div>
						</div>

						<div className="post_body">
							<p className="post_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce enim nulla, mollis eu metus in, sagittis fringilla tortor. Phasellus eget purus id felis dignissim convallis. Suspendisse et augue dui. Morbi gravida sed justo vel venenatis. Ut tempor pretium maximus. Donec libero diam, faucibus vitae lectus nec, accumsan gravida dui. Nam interdum mi eget lacus aliquet, sit amet ultricies magna pharetra. In ut odio a ligula egestas pretium et quis sapien. Etiam faucibus magna eu porta vulputate. Aliquam euismod rhoncus malesuada. Nunc rutrum hendrerit semper.</p>
							<figure>
								<img src="/static/prebuilt/images/post_image.jpg" alt="" />
								<figcaption>Lorem Ipsum Dolor Sit Amet</figcaption>
							</figure>
							<p className="post_p">Maecenas vitae sem varius, imperdiet nisi a, tristique nisi. Sed scelerisque suscipit leo cursus accumsan. Donec vel turpis quam. Mauris non nisl nec nunc gravida ullamcorper id vestibulum magna. Donec non velit finibus, laoreet arcu nec, facilisis augue. Aliquam sed purus id erat accumsan congue. Mauris semper ullamcorper nibh non pellentesque. Aenean euismod purus sit amet quam vehicula ornare.</p>
							<div className="post_quote">
								<p className="post_p">Aliquam auctor lacus a dapibus pulvinar. Morbi in elit erat. Quisque et augue nec tortor blandit hendrerit eget sit amet sapien. Curabitur at tincidunt metus, quis porta ex. Duis lacinia metus vel eros cursus pretium eget.</p>
								<div className="post_quote_source">Robert Morgan</div>
							</div>
							<p className="post_p">Donec orci dolor, pretium in luctus id, consequat vitae nibh. Quisque hendrerit, lorem sit amet mollis malesuada, urna orci volutpat ex, sed scelerisque nunc velit et massa. Sed maximus id erat vel feugiat. Phasellus bibendum nisi non urna bibendum elementum. Aenean tincidunt nibh vitae ex facilisis ultrices. Integer ornare efficitur ultrices. Integer neque lectus, venenatis at pulvinar quis, aliquet id neque. Mauris ultrices consequat velit, sed dignissim elit posuere in. Cras vitae dictum dui.</p>

							<div className="post_tags">
								<ul>
									<li className="post_tag"><a href="#">Liberty</a></li>
									<li className="post_tag"><a href="#">Manual</a></li>
									<li className="post_tag"><a href="#">Interpretation</a></li>
									<li className="post_tag"><a href="#">Recommendation</a></li>
								</ul>
							</div>
						</div>
						
						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-start">
							<div className="author_image"><div><img src="/static/prebuilt/images/author.jpg" alt="" /></div></div>
							<div className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></div>
							<div className="post_share ml-sm-auto">
								<span>share</span>
								<ul className="post_share_list">
									<li className="post_share_item"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
									<li className="post_share_item"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
									<li className="post_share_item"><a href="#"><i className="fa fa-google" aria-hidden="true"></i></a></li>
								</ul>
							</div>
						</div>

						<div className="similar_posts">
							<div className="grid clearfix">

								<div className="card card_small_with_image grid-item">
									<img className="card-img-top" src="/static/prebuilt/images/post_25.jpg" alt="https://unsplash.com/@jakobowens1" />
									<div className="card-body">
										<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
										<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
									</div>
								</div>

								<div className="card card_small_with_image grid-item">
									<img className="card-img-top" src="/static/prebuilt/images/post_2.jpg" alt="https://unsplash.com/@jakobowens1" />
									<div className="card-body">
										<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
										<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
									</div>
								</div>

								<div className="card card_small_with_image grid-item">
									<img className="card-img-top" src="/static/prebuilt/images/post_26.jpg" alt="https://unsplash.com/@jakobowens1" />
									<div className="card-body">
										<div className="card-title card-title-small"><a href="post.html">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</a></div>
										<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
									</div>
								</div>

							</div>

							<div className="post_comment">
								<div className="post_comment_title">Post Comment</div>
								<div className="row">
									<div className="col-xl-8">
										<div className="post_comment_form_container">
											<form action="#">
												<input type="text" className="comment_input comment_input_name" placeholder="Your Name" required="required" />
												<input type="email" className="comment_input comment_input_email" placeholder="Your Email" required="required" />
												<textarea className="comment_text" placeholder="Your Comment" required="required"></textarea>
												<button type="submit" className="comment_button">Post Comment</button>
											</form>
										</div>
									</div>
								</div>
							</div>

							<div className="comments">
								<div className="comments_title">Comments <span>(12)</span></div>
								<div className="row">
									<div className="col-xl-8">
										<div className="comments_container">
											<ul className="comment_list">
												<li className="comment">
													<div className="comment_body">
														<div className="comment_panel d-flex flex-row align-items-center justify-content-start">
															<div className="comment_author_image"><div><img src="/static/prebuilt/images/comment_author_1.jpg" alt="" /></div></div>
															<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
															<button type="button" className="reply_button ml-auto">Reply</button>
														</div>
														<div className="comment_content">
															<p>Pick the yellow peach that looks like a sunset with its red, orange, and pink coat skin, peel it off with your teeth. Sink them into unripened.</p>
														</div>
													</div>

													<ul className="comment_list">
														<li className="comment">
															<div className="comment_body">
																<div className="comment_panel d-flex flex-row align-items-center justify-content-start">
																	<div className="comment_author_image"><div><img src="/static/prebuilt/images/comment_author_2.jpg" alt="" /></div></div>
																	<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
																	<button type="button" className="reply_button ml-auto">Reply</button>
																</div>
																<div className="comment_content">
																	<p>Nulla facilisi. Aenean porttitor quis tortor id tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus molestie varius tincidunt. Vestibulum congue sed libero ac sodales.</p>
																</div>
															</div>

															<ul className="comment_list">
																
															</ul>
														</li>
													</ul>
												</li>
												<li className="comment">
													<div className="comment_body">
														<div className="comment_panel d-flex flex-row align-items-center justify-content-start">
															<div className="comment_author_image"><div><img src="/static/prebuilt/images/comment_author_1.jpg" alt="" /></div></div>
															<small className="post_meta"><a href="#">Katy Liu</a><span>Sep 29, 2017 at 9:48 am</span></small>
															<button type="button" className="reply_button ml-auto">Reply</button>
														</div>
														<div className="comment_content">
															<p>Pick the yellow peach that looks like a sunset with its red, orange, and pink coat skin, peel it off with your teeth. Sink them into unripened.</p>
														</div>
													</div>
												</li>
											</ul>
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

        {/* End of Post Content */}

        <Sidebar />

      </PageContent>
    )
  }
}
