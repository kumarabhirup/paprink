import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    const { post } = this.props
    return (
      <div className={`card ${ this.props.type === 'small_image' && 'card_small_with_image' } ${ this.props.type === 'small_background' && 'card_default card_small_with_background' } ${ this.props.type === 'largest' && 'card_largest_with_image' } ${ this.props.type === 'mini' && 'card_default card_default_no_image' } grid-item`}>
        { this.props.type === 'small_background' && <div className="card_background" style={{backgroundImage:`url(${post.thumbnail})`}}></div> }
        { this.props.type != 'small_background' && this.props.type != 'mini' && <img className="card-img-top" src={post.thumbnail} alt={post.title} /> }
        <div className="card-body">
          <div className={`card-title ${ this.props.type === 'small_background' && this.props.type === 'small_image' && this.props.type === 'mini' && 'card-title-small'}`}><a href={post.link}>{post.title}</a></div>
          { this.props.type === 'largest' && <p className="card-text">{post.description}</p> }
          { this.props.type != 'mini' && <small className="post_meta"><a href="#">{post.author}</a><span>{post.date_published}</span></small> }
        </div>
      </div>
    )
  }
}
