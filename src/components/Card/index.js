import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'

import UpvoteButton from '../Card/UpvoteButton'
import { CATEGORY_QUERY } from '../../../pages/category'
import { POST_AUTHOR_QUERY } from '../../../pages/author'
import { getOperationName } from 'apollo-link'
import { TODAY_QUERY } from '../IndexPage/Today'
import { YESTERDAY_QUERY } from '../IndexPage/Yesterday'
import { WEEKLY_QUERY } from '../IndexPage/Trending'
import { LATEST_QUERY } from '../IndexPage/Latest'

export const UPVOTE_MUTATION = gql`
  mutation UPVOTE_MUTATION($postId: ID!) {
    upvote(postId: $postId) {
      id
    }
  }
`

/**
 * Card is to be used at many places.
 * Namely, Category Archive.
 * Author Archive
 * Home Page
 * Similar Posts
 */
class Card extends Component {

  userId = this.props.user && this.props.user.id

  state = {
    upvote: this.props.post.upvotes.some(upvote => upvote.user.id === this.userId)
  }

  upvote = async client => {

    const queryToRefetch = () => {
      if (this.props.category) return getOperationName(CATEGORY_QUERY) // { query: CATEGORY_QUERY, variables: { categorySlug: this.props.router.query.category.toUpperCase() } }
      if (this.props.author) return getOperationName(POST_AUTHOR_QUERY) // { query: POST_AUTHOR_QUERY, variables: { authorUsername: this.props.router.query.authorUsername.toLowerCase() } }
      if (this.props.getToday) return getOperationName(TODAY_QUERY)
      if (this.props.getYesterday) return getOperationName(YESTERDAY_QUERY)
      if (this.props.getWeekly) return getOperationName(WEEKLY_QUERY)
      if (this.props.getLatest) return getOperationName(LATEST_QUERY)
      else return {}
    }

    const upvote = await client.mutate({
      mutation: UPVOTE_MUTATION,
      variables: {
        postId: this.props.post.id
      },
      refetchQueries: [
        queryToRefetch()
      ]
    })

    await this.setState({ upvote: !this.state.upvote })

  }

  render() {
    const { post } = this.props
    return (
      <ApolloConsumer>
        { client => (
          <div className={`card ${ this.props.type === 'card_small_with_image' && 'card-title-small'} ${ this.props.type === 'small_image' && 'card_small_with_image' } ${ this.props.type === 'large_image' && 'card_large_with_image' } ${ this.props.type === 'small_background' && 'card_default card_small_with_background' } ${ this.props.type === 'large_background' && 'card_large_with_background' } ${ this.props.type === 'largest' && 'card_largest_with_image' } ${ this.props.type === 'mini' && 'card_default card_default_no_image' } ${ this.props.type === 'mini_background' && 'card_default card_default_with_background' } grid-item`} style={{width:"100%"}}>
            { this.props.type === 'small_background' && <div className="card_background" style={{backgroundColor: "black", backgroundImage:`url(${post.thumbnail.blackOverlayImage})`}}></div> }
            { this.props.type === 'large_background' && <div className="card_background" style={{backgroundColor: "black", backgroundImage:`url(${post.thumbnail.blackOverlayImage})`}}></div> }
            { this.props.type === 'mini_background' && <div className="card_background" style={{backgroundColor: "black", backgroundImage:`url(${post.thumbnail.blackOverlayImage})`}}></div> }
            { this.props.type != 'small_background' && this.props.type != 'large_background' && this.props.type != 'mini_background' && this.props.type != 'mini' && <a href={`/p/${post.slug}-${post.id}`}><img className="card-img-top" src={post.thumbnail.smallCardImage || post.thumbnail.smallImage} alt={post.title} /></a> }
            <div className="card-body">
              <div className={`card-title ${ this.props.type === 'mini_background' && 'card-title-small'} ${ this.props.type === 'similar_image' && 'card-title-small'} ${ this.props.type === 'small_background' || this.props.type === 'small_image' || this.props.type === 'mini' && 'card-title-small'}`}><a href={`/p/${post.slug}-${post.id}`}>{post.title}</a></div>
              {/* { this.props.type === 'largest' && <p className="card-text">FUCK U</p> } */}
              { this.props.type === 'large_image' && <p className="card-text">{post.description}</p> }
              { this.props.type != 'mini' && this.props.type != 'mini_background' && <small className="post_meta"><a href={`/author/${post.author.username}`}>{post.author.name}</a><span>{ format(parseISO(post.publishedAt || post.createdAt), 'MMMM d, YYYY', { awareOfUnicodeTokens: true }) }</span></small> }
              { this.props.type != 'mini' && this.props.type != 'mini_background' && <UpvoteButton onClick={() => this.upvote(client)} upvote={this.state.upvote} data={post.upvotes} /> }
            </div>
          </div>
        ) }
      </ApolloConsumer>
    )
  }

}

export default withRouter(Card)