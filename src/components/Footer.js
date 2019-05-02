import React, { Component } from 'react'
import { meta } from '../api/meta'
import social from '../api/social'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row row-lg-eq-height">
            <div className="col-lg-9 order-lg-1 order-2">
              <div className="footer_content">
                <div className="footer_logo"><img src="/static/white-theme-trans.png" alt={meta.name} /></div>
                <div className="footer_social">
                  <ul>{ social.map((icon, index) => <li key={index} className={`footer_social_${icon.name}`}><a href={icon.link} target="_blank"><i className={`fa fa-${icon.name}`} aria-hidden="true"></i></a></li>) }</ul>
                </div>
                <div className="copyright" style={{color: "rgba(255, 255, 255, .2)"}}>
                  Copyright &copy; {new Date().getFullYear()} All rights reserved | <span style={{color: "rgba(255, 255, 255, .4)"}}>Made with <i className="fa fa-heart" aria-hidden="true"></i> in India 🇮🇳</span>
                </div>
                </div>
            </div>
            <div className="col-lg-3 order-lg-2 order-1">
              <div className="subscribe">
                <div className="subscribe_background"></div>
                <div className="subscribe_content">
                  <div className="subscribe_title">Subscribe</div>
                  <form action="#">
                    <input type="email" className="sub_input" placeholder="Entries closed." required="required" disabled />
                    {/* <button className="sub_button">
                      <svg version="1.1" id="link_arrow_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="19px" height="13px" viewBox="0 0 19 13" enableBackground="new 0 0 19 13" xmlSpace="preserve">
                        <polygon fill="#FFFFFF" points="12.475,0 11.061,0 17.081,6.021 0,6.021 0,7.021 17.038,7.021 11.06,13 12.474,13 18.974,6.5 "/>
                      </svg>
                    </button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
