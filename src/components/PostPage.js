import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import { Parser as HtmlToReactParser } from 'html-to-react'
import dynamic from 'next/dynamic'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'next/router'
import { DiscussionEmbed, CommentCount } from 'disqus-react'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import UpvoteButton from './Card/UpvoteButton'
import categorySorter from '../lib/categorySorter'
import { UPVOTE_MUTATION } from './Card'

const Dante = dynamic(import('Dante2'), {
  ssr: false
})

const PostMetaAndShare = ({ postData, userId }) => (
	<>
		<div className="author_image"><div><a href={`/author/${postData.author.username}`}><img src={postData.author.profilePicture} alt={postData.author.name} /></a></div></div>
		<div className="post_meta">
			<a href={`/author/${postData.author.username}`}>{ postData.author.name }</a>
			<span>{ format(parseISO(postData.publishedAt || postData.createdAt), 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true }) }</span>
			{postData.author.id === userId && <span><a href={`/editor/${postData.id}`}>✏️ EDIT POST</a></span>}
		</div> {/*Sep 29, 2017 at 9:48 am*/}		
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

const UpvoteButtonOrDraft = ({ postData, upvote, upvoteState, upvotesNumber, disabled }) => (
	<>
		{ postData.status === "PUBLISHED" && <UpvoteButton onClick={upvote} upvote={upvoteState} fontSize={15} type="post" disabled={disabled} upvotesNumber={upvotesNumber} /> }
		{ postData.status === "DRAFT" && <p style={{textAlign: "center", marginTop: "15px"}}>THIS POST IS A DRAFT</p> }
	</>
)

var htmlToReactParser = new HtmlToReactParser()

class PostPage extends Component {

	userId = this.props.user && this.props.user.id

  state = {
    upvote: this.props.postData.upvotes.some(upvote => upvote.user && upvote.user.id === this.userId),
		upvotesNumber: this.props.postData.upvotes.length
  }

  upvote = async client => {
		
		await this.setState({ disabled: true })

		await client.mutate({
      mutation: UPVOTE_MUTATION,
      variables: {
        postId: this.props.postData.id
      }
    }).then(async () => {
      await this.setState({ upvote: !this.state.upvote })
      await this.setState({ upvotesNumber: this.state.upvote ? this.state.upvotesNumber + 1 : this.state.upvotesNumber - 1 })
      await this.setState({ disabled: false })
    }).catch(() => {
      this.props.router.replace(`/signin?intent=${this.props.router.asPath}`)
    })
		
  }

  render() {

		const { postData } = this.props

		const disqusShortname = 'paprink'
		const disqusConfig = {
				url: `http://paprink.com/p/${this.props.postData.slug}-${this.props.postData.id}`,
				identifier: this.props.postData.id,
				title: this.props.postData.title,
		}

    return (
			<ApolloConsumer>
				{ client => (
					<PageContent>

						{/* Post Content */}

						<div className="col-lg-9">
							<div className="post_content">

								<div className="post_panel post_panel_top d-flex flex-row align-items-center justify-content-start">
									<PostMetaAndShare postData={postData} userId={this.userId} />
								</div>

								<UpvoteButtonOrDraft upvote={() => this.upvote(client)} upvoteState={this.state.upvote} postData={postData} upvotesNumber={this.state.upvotesNumber} disabled={this.state.disabled} />
								<div className="post_body" style={{marginTop: "20px"}}>
									{/* { htmlToReactParser.parse(postData.editorHtml) } */}
									<Dante content={postData.editorSerializedOutput} read_only style={{color: "black", marginTop: "-18px"}} />
									<div className="post_tags">
										<ul>
											{ categorySorter(postData.categories).map(({ id, text }) => <li key={id} className="post_tag"><a href={`/categories/${id}`}>{text}</a></li>) }
										</ul>
									</div>
								</div>
								<UpvoteButtonOrDraft upvote={() => this.upvote(client)} upvoteState={this.state.upvote} postData={postData} upvotesNumber={this.state.upvotesNumber} />
								
								<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-start">
									<PostMetaAndShare postData={postData} userId={this.userId} />
								</div>

								<div className="similar_posts">
									<div className="grid clearfix">

										{/* { today.map((post, index) => index < 3 && <Card type="small_image" post={post} key={index} />) } */}

									</div>

									<div className="post_comment">
										<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
									</div>

									<div className="comments">
										
									</div>

								</div>
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