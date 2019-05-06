import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import dynamic from 'next/dynamic'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'next/router'
import Head from 'next/head'
import { DiscussionEmbed } from 'disqus-react'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import UpvoteButton from './Card/UpvoteButton'
import categorySorter from '../lib/categorySorter'
import { UPVOTE_MUTATION } from './Card'
import { meta } from '../api/meta'
import { VerfiedBadge } from '../api/mini'

const Dante = dynamic(import('Dante2'), {
  ssr: false
})

const PostMetaAndShare = ({ postData, userId }) => (
	<>
		<div className="author_image"><div><a href={`/author/${postData.author.username}`}><img src={postData.author.profilePicture} alt={postData.author.name} /></a></div></div>
		<div className="post_meta">
			<a href={`/author/${postData.author.username}`}>{ postData.author.name }</a>{ postData.author.previledge.some(element => element === "VERIFIED") && (<>&nbsp;<VerfiedBadge /></>) }
			<span>{ format(parseISO(postData.publishedAt || postData.createdAt), 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true }) }</span>
			{postData.author.id === userId && <span><a href={`/editor/${postData.id}`}>✏️ EDIT POST</a></span>}
		</div> {/*Sep 29, 2017 at 9:48 am*/}		
		<div className="post_share ml-sm-auto">
			<span>share</span>
			<ul className="post_share_list">
				<li className="post_share_item"><a href={`https://www.facebook.com/sharer/sharer.php?u=${meta.website}/p/${postData.slug}-${postData.id}&t=${postData.title}`} target="_blank" title="Share on Facebook" onClick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
				<li className="post_share_item"><a href={`https://twitter.com/intent/tweet?text=${postData.title} - Written by @${postData.author.username} on ${meta.name}%0a${meta.domain}/p/${postData.slug}-${postData.id}`} title="Share on Twiiter" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
				<li className="post_share_item" style={{cursor: "not-allowed"}}><a href="#" style={{cursor: "not-allowed"}} title="Google+ is to shut down."><i className="fa fa-google" style={{cursor: "not-allowed"}} aria-hidden="true"></i></a></li>
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

						<Head>
							<title>{ `${postData.title} - ${meta.title}` }</title>
							<meta property="og:title" content={postData.title} />
							<meta property="og:type" content="article" />
							<meta property="og:url" content={`${meta.domain}/p/${postData.slug}-${postData.id}`} />
							<meta property="og:image" content={postData.thumbnail.image} />
							<meta property="og:site_name" content={meta.name} />
							<meta property="fb:app_id" content={process.env.FB_LOGIN_APP_ID} />
							<meta property="og:description" content={`An exclusive article by ${postData.author.name} @ ${meta.name}!`} />
						</Head>

						{/* Post Content */}

						<div className="col-lg-9">
							<div className="post_content">

								<div className="post_panel post_panel_top d-flex flex-row align-items-center justify-content-start">
									<PostMetaAndShare postData={postData} userId={this.userId} />
								</div>

								<UpvoteButtonOrDraft upvote={() => this.upvote(client)} upvoteState={this.state.upvote} postData={postData} upvotesNumber={this.state.upvotesNumber} disabled={this.state.disabled} />
								<div className="post_body" style={{marginTop: "20px"}}>

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