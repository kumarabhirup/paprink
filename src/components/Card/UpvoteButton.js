import React, { Component } from 'react'

export default class UpvoteButton extends Component {

  render() {
    return (
      <>
      <button className="upvoteButton" disabled={this.props.disabled} onClick={this.props.onClick} style={{background: this.props.upvote ? '#ff033e' : this.props.type === 'post' ? '#ffffff' : '#d3d3d3', color: this.props.upvote ? 'white' : 'black', fontSize: this.props.fontSize, width: this.props.type === "post" && "100%", border: "none", textAlign: this.props.type === "post" && "center"}}>UPVOTE{this.props.upvote ? 'D 👍' : ' 🔥'} <i>{this.props.upvotesNumber}</i></button>
      <style jsx>{`
        button.upvoteButton {
          display: inline-block;
          background: ${this.props.upvote ? '#ff033e' : '#d3d3d3'};
          padding: 5px 15px;
          margin-top: 20px;
          font-size: 10px;
          border-radius: 4px;
          font-weight: bold;
          transition: all 0.5s;
          color: ${this.props.upvote ? 'white' : 'black'};
        }
        button.upvoteButton:hover {
          cursor: pointer;
          /* zoom: 1.05; */
          box-shadow: 0 0 15px rgba(0,0,0,.1);
        }
      `}</style>
      </>
    )
  }

}
