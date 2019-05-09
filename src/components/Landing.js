import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

import User from './User'

const Section = styled.section`

  position: relative;
  z-index: 1;
  min-height: 900px;

  p {
    color: white;
    font-weight: bold;
    font-size: 20px !important;
    line-height: 40px !important;
  }

  .banner_inner {
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: 900px; }
    .banner_inner .overlay {
      background: url(https://i.ibb.co/1bxgbyB/home-banner.jpg) no-repeat scroll center center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100%;
      bottom: 0;
      z-index: -1; }
    .banner_inner .banner_content {
      color: #fff; }
      .banner_inner .banner_content h3 {
        font-size: 50px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-bottom: 30px; }
      .banner_inner .banner_content p {
        font-size: 15px;
        font-weight: 300;
        line-height: 27px;
        margin-bottom: 50px; }

  .banner_btn {
  display: inline-block;
  background: #000; /*#f84b67;*/
  padding: 0 0 0 30px;
  border: 2px solid #fff; /*#f84b67;*/
  border-radius: 5px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 48px;
  outline: none !important;
  box-shadow: none !important;
  text-align: center;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  overflow: hidden;
  transition: all 300ms linear 0s; }
  .banner_btn:hover {
    color: #fff; }
  .banner_btn .ti-arrow-right {
    background: #fff;
    color: #000;
    padding: 18px 19px;
    border-radius: 0 0 0 21px;
    margin-left: 17px;
    transition: all 300ms linear 0s; }
  .banner_btn:hover .ti-arrow-right {
    transition: all 300ms linear 0s;
    -webkit-box-shadow: -11px 20px 35px -1px rgba(0, 0, 0, 0.36);
    -moz-box-shadow: -11px 20px 35px -1px rgba(0, 0, 0, 0.36);
    box-shadow: -11px 20px 35px -1px rgba(0, 0, 0, 0.36); }

  @media (max-width:1199px){

    .home_banner_area {
      min-height: 700px;
    }
    .home_banner_area .banner_inner {
      min-height: 700px;
    }
    .banner_content {
      background: rgba(0,0,0,.5);
      padding: 20px;
    }
    .home_banner_area .donation_inner{
      margin-bottom: -30px;
    }
    .home_banner_area .dontation_item{
      max-width: 350px;
      margin: auto;
    }

  }

  @media (max-width:767px){

    .home_banner_area {
      min-height: 500px;
    }
    .home_banner_area .banner_inner {
      min-height: 500px;
    }
    .home_banner_area .banner_inner .banner_content {
      margin-top: 0px;
    }
    .home_banner_area .banner_inner .banner_content h3 {
      font-size: 30px;
    }
    .home_banner_area .banner_inner .banner_content p br {
      display: none;
    }
    .home_banner_area .banner_inner .banner_content h3 span {
      line-height: 45px;
      padding-bottom: 0px;
      padding-top: 0px;
    }

  }

  @media (max-width:575px){

      .home_banner_area .banner_inner .banner_content h2 {
        font-size: 28px;
      }
      .home_banner_area {
        min-height: 500px;
      }
      .home_banner_area .banner_inner {
        min-height: 500px;
      }
      .blog_banner .banner_inner .blog_b_text {
        margin-top: 0px;
      }
      .home_banner_area .banner_inner .banner_content img{
        display: none;
      }
      .home_banner_area .banner_inner .banner_content h5 {
        margin-top: 0px;
      }

  }

  @media (max-width:480px){

    .home_banner_area .banner_inner .banner_content {
      padding: 30px 15px;
      margin-top: 0px;
    }
    .banner_content .white_btn {
      display: block;
    }
    .banner_area .banner_inner .banner_content h2 {
      font-size: 32px;
    }
    .home_banner_area {
      min-height: 400px;
    }
    .home_banner_area .banner_inner {
      min-height: 400px;
    }

  }

`

const COUNT_USERS_QUERY = gql`
  query COUNT_USERS_QUERY {
    countUsers
  }
`

const BannerButton = props => (
  <a class="banner_btn" href={props.link} {...props} >{ props.text }<i class="ti-arrow-right">{ props.i }</i></a>
)

class Landing extends Component {
  render() {
    return (
      <User>
        {({data: {me}}) => (
          <Query query={COUNT_USERS_QUERY}>
            { ({ data: { countUsers } }) => (
              <Section>
                <div class="banner_inner d-flex align-items-center">
                  <div class="overlay"></div>
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-6 offset-lg-6 col-xl-5 offset-xl-7">
                        <div class="banner_content" style={{marginTop: "-50px"}}>
                          <a href="https://www.producthunt.com/posts/bulk-mail-cli?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bulk-mail-cli" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=143885&theme=light" alt="bulk-mail CLI - Do hassle-free email marketing with this powerful tool 🔥 | Product Hunt Embed" style={{width: "250px", height: "54px"}} width="250px" height="54px" /></a>
                          <br /><br /><br />
                          {!me && <h3>Pledge to write<br />everyday!</h3>}
                          {me && <h3>Nice pledge,<br />{me.name}!</h3>}
                          <p>Now that you have signed in, it is time to <b>write one post daily</b> if not written. ✍️ <br /> <b>Also apprieciate other writers by upvoting 🔥 their articles!</b> </p>
                          {me ? <BannerButton link={`/editor/new`} text="WRITE NEW POST" i="🖋️" /> : <BannerButton link={`/signin?intent=${this.props.router.asPath}`} text="PLEDGE TODAY" i={`${countUsers > 0 ? countUsers : "no one"} did`} /> }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            ) }
          </Query>
        )}
      </User>
    )
  }
}

export default withRouter(Landing)