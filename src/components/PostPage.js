import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import dynamic from 'next/dynamic'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import { DiscussionEmbed } from 'disqus-react'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import UpvoteButton from './Card/UpvoteButton'
import categorySorter from '../lib/categorySorter'
import { UPVOTE_MUTATION } from './Card'
import { meta } from '../api/meta'
import { VerfiedBadge } from '../api/mini'
import cloudinaryUrlOptimizer from '../lib/cloudinaryUrlOptimizer'

const Dante = dynamic(import('Dante2'), {
  ssr: false
})

const PostBody = styled.div`
	margin-top: 20px;
	font-size: 18px;
	line-height: 40px;
	font-weight: 400;
	color: rgba(0,0,0,.9);
	p {
		font-size: 18px;
		line-height: 40px;
		font-weight: 400;
		color: rgba(0,0,0,.9);
	}
	blockquote {
		font-size: 20px;
		border-left: 3px solid grey;
		padding: 15px;
	}
	ul {
		font-size: 18px;
		line-height: 40px;
		list-style-type: lower-latin;
		padding-left: 40px;
	}
	li {
		font-weight: 420;
	}
`

const PostMetaAndShare = ({ postData, userId }) => (
	<>
		<div className="author_image"><div><a href={`/author/${postData.author.username}`}><img src={postData.author.profilePicture} alt={postData.author.name} /></a></div></div>
		<div className="post_meta">
			<a href={`/author/${postData.author.username}`} style={{color: postData.author.previledge.some(element => element === "VERIFIED") ? "#000" : "#414a4c"}}>{ postData.author.name }</a>{ postData.author.previledge.some(element => element === "VERIFIED") && (<>&nbsp;<VerfiedBadge /></>) }
			<span>{ format(parseISO(postData.publishedAt || postData.createdAt), 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true }) }</span>
			{postData.author.id === userId && <span><a href={`/editor/${postData.id}`}>✏️ EDIT POST</a></span>}
		</div> {/*Sep 29, 2017 at 9:48 am*/}		
		<div className="post_share ml-sm-auto">
			<span>share</span>
			<ul className="post_share_list">
				<li className="post_share_item"><a href={`https://www.facebook.com/sharer/sharer.php?u=${meta.website}/p/${postData.slug}-${postData.id}&t=${postData.title}`} target="_blank" title="Share on Facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
				<li className="post_share_item"><a href={`https://twitter.com/intent/tweet?text=${postData.title} - Written by @${postData.author.username} on ${meta.name}%0a${meta.domain}/p/${postData.slug}-${postData.id}`} title="Share on Twiiter" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
				<li className="post_share_item" style={{cursor: "not-allowed"}}><a href="#" style={{cursor: "not-allowed"}} title="Google+ is to shut down."><i className="fa fa-google" style={{cursor: "not-allowed"}} aria-hidden="true"></i></a></li>
			</ul>
		</div>
	</>
)

const UpvoteButtonOrDraft = ({ postData, upvote, upvoteState, upvotesNumber, disabled }) => (
	<>
		{ 
			(() => {
				if (postData.status === "PUBLISHED" || postData.status === "FAKEPOST") {
					return <UpvoteButton onClick={upvote} upvote={upvoteState} fontSize={15} type="post" disabled={disabled} upvotesNumber={upvotesNumber} />
				}
			})()
			// postData.status === "PUBLISHED" || postData.status === "FAKEPOST" && <UpvoteButton onClick={upvote} upvote={upvoteState} fontSize={15} type="post" disabled={disabled} upvotesNumber={upvotesNumber} /> 
		}
		{ postData.status === "DRAFT" && <p style={{textAlign: "center", marginTop: "15px"}}>THIS POST IS A DRAFT</p> }
	</>
)

class PostPage extends Component {

	userId = this.props.user && this.props.user.id

  state = {
    upvote: this.props.postData.upvotes.some(upvote => upvote.user && upvote.user.id === this.userId),
		upvotesNumber: this.props.postData.upvotesNumber // this.props.postData.upvotes.length <- real number
  }

  upvote = async client => {
		
		await this.setState({ disabled: true })

		// Show the upvote beforehand (don't use apollo's optimisticResponse)
		await this.setState({ upvote: !this.state.upvote })
    await this.setState({ upvotesNumber: this.state.upvote ? this.state.upvotesNumber + 1 : this.state.upvotesNumber - 1 })

		await client.mutate({
      mutation: UPVOTE_MUTATION,
      variables: {
        postId: this.props.postData.id
      }
    }).then(async () => {
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

							<meta name="title" content={postData.title} />
							<meta name="topic" content={postData.title} />
							<meta name="subject" content={postData.title} />
							<meta name="identifier-URL" content={meta.domain} />
							<meta name="robots" content="index,follow" />
							<meta name="description" content={`A writeup by ${postData.author.name} @ ${meta.name}!`} />
							<meta name="author" content={`${postData.author.name}, ${postData.author.email}`} />
							<meta name="url" content={`${meta.domain}/p/${postData.slug}-${postData.id}`} />
							<meta name="rating" content="General" />
							<meta name="revised" content={format(parseISO(postData.publishedAt || postData.createdAt), 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true })} />
							<meta http-equiv="Cache-Control" content="no-cache" />

							<meta property="og:title" content={postData.title} />
							<meta name="twitter:title" content={postData.title} />
							<meta property="og:type" content="article" />
							<meta name="twitter:card" content="summary" />
							<meta property="og:url" content={`${meta.domain}/p/${postData.slug}-${postData.id}`} />
							<meta name="twitter:url" content={`${meta.domain}/p/${postData.slug}-${postData.id}`} />
							<meta property="og:image" content={cloudinaryUrlOptimizer(postData.thumbnail.image)} />
							<meta name="twitter:image" content={cloudinaryUrlOptimizer(postData.thumbnail.image)} />
							<meta property="og:site_name" content={meta.name} />
							<meta property="fb:app_id" content={process.env.FB_LOGIN_APP_ID} />
							<meta property="og:description" content={`An exclusive article by ${postData.author.name} @ ${meta.name}!`} />
							<meta name="twitter:description" content={`An exclusive article by ${postData.author.name} @ ${meta.name}!`} />

						</Head>

						{/* Post Content */}

						<div className="col-lg-9">
							<div className="post_content">

								<div className="post_panel post_panel_top d-flex flex-row align-items-center justify-content-start">
									<PostMetaAndShare postData={postData} userId={this.userId} />
								</div>

								<UpvoteButtonOrDraft upvote={() => this.upvote(client)} upvoteState={this.state.upvote} postData={postData} upvotesNumber={this.state.upvotesNumber} disabled={this.state.disabled} />
								<PostBody className="post_body">

									{
										!postData.editorHtml
										? <Dante content={JSON.parse(cloudinaryUrlOptimizer(JSON.stringify(postData.editorSerializedOutput)))} read_only style={{color: "black", marginTop: "-18px"}} /> 
										: (
											<div dangerouslySetInnerHTML={{__html: `<p><b>Image Credits:</b> Thanks to <a href="${postData.thumbnail.credits.unsplashProfile}" target="_blank" rel="noopener noreferrer">(@${postData.thumbnail.credits.username}) ${postData.thumbnail.credits.name}</a>'s UnSplash photo.</p><br />${postData.editorHtml}<br /><p>Originally posted <a href="${postData.refUrl}">here</a> ✌️</p>`}}></div>
										)
									}

									<div className="post_tags">
										<ul>
											{ categorySorter(postData.categories).map(({ id, text }) => <li key={id} className="post_tag"><a href={`/categories/${id}`}>{text}</a></li>) }
										</ul>
									</div>
									
								</PostBody>
								<UpvoteButtonOrDraft upvote={() => this.upvote(client)} upvoteState={this.state.upvote} postData={postData} upvotesNumber={this.state.upvotesNumber} disabled={this.state.disabled} />
								
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