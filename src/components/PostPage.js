import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import { Parser as HtmlToReactParser } from 'html-to-react'
import dynamic from 'next/dynamic'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'next/router'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import UpvoteButton from './Card/UpvoteButton'
import categorySorter from '../lib/categorySorter'
import { UPVOTE_MUTATION } from './Card'
import { GET_POST_QUERY } from '../../pages/post'

const Dante = dynamic(import('Dante2'), {
  ssr: false
})

const PostMetaAndShare = ({ postData }) => (
	<>	
		<div className="author_image"><div><a href={`/author/${postData.author.username}`}><img src={postData.author.profilePicture} alt={postData.author.name} /></a></div></div>
		<div className="post_meta"><a href={`/author/${postData.author.username}`}>{ postData.author.name }</a><span>{ format(parseISO(postData.createdAt), 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true }) }</span><span><a href={`/editor/${postData.id}`}>✏️ EDIT POST</a></span></div> {/*Sep 29, 2017 at 9:48 am*/}
		<div className="post_share ml-sm-auto">
			<span>share</span>
			<ul className="post_share_list">
				<li className="post_share_item"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
				<li className="post_share_item"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
				<li className="post_share_item"><a href="#"><i className="fa fa-google" aria-hidden="true"></i></a></li>
			</ul>
		</div>
	</>
)

const UpvoteButtonOrDraft = ({ postData, upvote, upvoteState }) => (
	<>
		{ postData.status === "PUBLISHED" && <UpvoteButton onClick={upvote} upvote={upvoteState} fontSize={15} type="post" data={postData.upvotes} /> }
		{ postData.status === "DRAFT" && <p style={{textAlign: "center", marginTop: "15px"}}>THIS POST IS A DRAFT</p> }
	</>
)

var htmlToReactParser = new HtmlToReactParser()

class PostPage extends Component {

	userId = this.props.user && this.props.user.id

  state = {
    upvote: this.props.postData.upvotes.some(upvote => upvote.user && upvote.user.id === this.userId)
  }

  upvote = async client => {
    
		const upvote = await client.mutate({
      mutation: UPVOTE_MUTATION,
      variables: {
        postId: this.props.postData.id
      },
      refetchQueries: [
        { query: GET_POST_QUERY, variables: { slugParam: this.props.router.query.slug } }
      ]
    })

    await this.setState({ upvote: !this.state.upvote })

  }

  render() {
		const { postData } = this.props
    return (
			<ApolloConsumer>
				{ client => (
					<PageContent>

						{/* Post Content */}

						<div className="col-lg-9">
							<div className="post_content">

								<div className="post_panel post_panel_top d-flex flex-row align-items-center justify-content-start">
									<PostMetaAndShare postData={postData} />
								</div>

								<UpvoteButtonOrDraft upvote={() => this.upvote(client)} upvoteState={this.state.upvote} postData={postData} />
								<div className="post_body" style={{marginTop: "20px"}}>
									{/* { htmlToReactParser.parse(postData.editorHtml) } */}
									<Dante content={postData.editorSerializedOutput} read_only style={{color: "black", marginTop: "-18px"}} />
									<div className="post_tags">
										<ul>
											{ categorySorter(postData.categories).map(({ id, text }) => <li key={id} className="post_tag"><a href={`/categories/${id}`}>{text}</a></li>) }
										</ul>
									</div>
								</div>
								<UpvoteButtonOrDraft upvote={() => this.upvote(client)} upvoteState={this.state.upvote} postData={postData} />
								
								<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-start">
									<PostMetaAndShare postData={postData} />
								</div>

								<div className="similar_posts">
									<div className="grid clearfix">

										{/* { today.map((post, index) => index < 3 && <Card type="small_image" post={post} key={index} />) } */}

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
				) }
			</ApolloConsumer>
    )
  }
}

export default withRouter(PostPage)