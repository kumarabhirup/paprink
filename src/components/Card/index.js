import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import { ApolloConsumer } from 'react-apollo'

import UpvoteButton from '../Card/UpvoteButton'

export default class Card extends Component {

  state = {
    upvote: false
  }

  upvote = async client => {
    let upvote = !this.state.upvote
    await this.setState({ upvote })
  }

  render() {
    const { post } = this.props
    return (
      <ApolloConsumer>
        { client => (
          <div className={`card ${ this.props.type === 'card_small_with_image' && 'card-title-small'} ${ this.props.type === 'small_image' && 'card_small_with_image' } ${ this.props.type === 'large_image' && 'card_large_with_image' } ${ this.props.type === 'small_background' && 'card_default card_small_with_background' } ${ this.props.type === 'large_background' && 'card_large_with_background' } ${ this.props.type === 'largest' && 'card_largest_with_image' } ${ this.props.type === 'mini' && 'card_default card_default_no_image' } ${ this.props.type === 'mini_background' && 'card_default card_default_with_background' } grid-item`} style={{width:"100%"}}>
            { this.props.type === 'small_background' && <div className="card_background" style={{backgroundColor: "black", backgroundImage:`url(${post.thumbnail})`}}></div> }
            { this.props.type === 'large_background' && <div className="card_background" style={{backgroundColor: "black", backgroundImage:`url(${post.thumbnail})`}}></div> }
            { this.props.type === 'mini_background' && <div className="card_background" style={{backgroundColor: "black", backgroundImage:`url(${post.thumbnail})`}}></div> }
            { this.props.type != 'small_background' && this.props.type != 'large_background' && this.props.type != 'mini_background' && this.props.type != 'mini' && <a href={`/p/${post.slug}-${post.id}`}><img className="card-img-top" src={post.thumbnail.smallCardImage || post.thumbnail.smallImage} alt={post.title} /></a> }
            <div className="card-body">
              <div className={`card-title ${ this.props.type === 'mini_background' && 'card-title-small'} ${ this.props.type === 'similar_image' && 'card-title-small'} ${ this.props.type === 'small_background' || this.props.type === 'small_image' || this.props.type === 'mini' && 'card-title-small'}`}><a href={`/p/${post.slug}-${post.id}`}>{post.title}</a></div>
              { this.props.type === 'largest' && <p className="card-text">{post.description}</p> }
              { this.props.type === 'large_image' && <p className="card-text">{post.description}</p> }
              { this.props.type != 'mini' && this.props.type != 'mini_background' && <small className="post_meta"><a href="#">{post.author.name}</a><span>{ format(parseISO(post.createdAt), 'MMMM d, YYYY', { awareOfUnicodeTokens: true }) }</span></small> }
              { this.props.type != 'mini' && this.props.type != 'mini_background' && <UpvoteButton onClick={() => this.upvote(client)} upvote={this.state.upvote} data={post.upvotes} /> }
            </div>
          </div>
        ) }
      </ApolloConsumer>
    )
  }

}
