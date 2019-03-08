import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'

import { meta } from '../../api/meta'
import { mainMenu } from '../../api/menu'
import User from '../User'
import Signout from '../Signout'
import ProfileButton from './profileButton'

class Header extends Component {
  render() {
    return (
      <User>
        {({data: {me}}) => (    
          <>
            <header className="header">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="header_content d-flex flex-row align-items-center justify-content-start">
                      <div className="logo"><img src="/static/white-theme-trans.png" alt={meta.name} /></div>
                      <nav className="main_nav">
                        <ul>
                          { mainMenu.map((item, index) => {
                            if(item.sku === 'signin'){
                              return <li key={index}><a href={`${item.link}?intent=${this.props.router.asPath}`}>{item.text}</a></li>
                            } else {
                              return <li key={index}><a href={`${item.link}`}>{item.text}</a></li>
                            }
                          }) }
                          { me ? <ProfileButton me={me} /> : <li style={{backgroundColor: '#ffffff', color: '#000000', borderRadius: '5px', padding: '5px 10px', zoom: '80%'}}><a href={`${meta.domain}/signin?intent=${this.props.router.asPath}`} style={{color: '#000000'}}>⚡️🚦 {`Sign In`.toUpperCase()}</a></li> }
                        </ul>
                      </nav>
                      <div className="search_container ml-auto">
                        <div className="weather">
                          <div className="temperature">Writing is 🤟</div>
                        </div>

                        <form action="#">
                          <input type="search" className="header_search_input" required="required" placeholder="Type to Search..." />
                          <img className="header_search_icon" src="/static/prebuilt/images/search.png" alt="Instant Search" />
                        </form>
                        
                      </div>
                      <div className="hamburger ml-auto menu_mm">
                        <i className="fa fa-bars trans_200 menu_mm" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400">
              <div className="menu_close_container"><div className="menu_close"><div></div><div></div></div></div>
              <div className="logo menu_mm"><img src="/static/black-theme-trans.png" alt={meta.name} /></div>
              <div className="search">
                <form action="#">
                  <input type="search" className="header_search_input menu_mm" required="required" placeholder="Type to Search..." />
                  <img className="header_search_icon menu_mm" src="static/prebuilt/images/search_2.png" alt="" />
                </form>
              </div>
              <nav className="menu_nav">
                <ul className="menu_mm">
                  { mainMenu.map((item, index) => {
                    if(item.sku === 'signin'){
                      return <li className="menu_mm" key={index}><a href={`${item.link}?intent=${this.props.router.asPath}`}>{item.text}</a></li>
                    } else {
                      return <li className="menu_mm" key={index}><a href={item.link}>{item.text}</a></li>
                    }
                  }) }
                  { me ? <li className="menu_mm"><Signout /></li> : <li className="menu_mm"><a href={`${meta.domain}/signin?intent=${this.props.router.asPath}`}>Sign In</a></li> }
                </ul>
              </nav>
            </div>
          </>
        )}
      </User>
    )
  }
}

export default withRouter(Header)