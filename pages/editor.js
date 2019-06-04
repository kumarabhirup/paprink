import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
 
import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import EditorPage from '../src/components/Editor'
import PleaseSignIn from '../src/components/PleaseSignIn'
import { Loading, QueryFailed } from '../src/components/QueryStatus'
import { meta } from '../src/api/meta'
import MiniTitle from '../src/components/MiniTitle'
import PageContent from '../src/components/PageContent'

const CAN_UPDATE_POST_QUERY = gql`
  query CAN_UPDATE_POST_QUERY($id: ID!){
    canUpdatePost(id: $id)
  }
`

export const EditorSucks = props => {
  return (
    <PageContent noSidebar>
      <div style={{padding: '70px 10px'}}>
        <h1>The editor sucks on Mobile.</h1>
        <p style={{fontSize: '20px'}}>While we construct the PaprInk Mobile app, <b>you'll have to compose and edit posts using desktop devices.</b></p>
        <p style={{fontSize: '20px'}}>While you are on mobile, you can <a href="/">read and upvote posts</a> with confidence. See you again 👋</p>
      </div>
    </PageContent>
  )
}

class editorPage extends Component {
  componentDidMount() {
      window.addEventListener("resize", this.resize.bind(this))
      this.resize()
  }

  resize() {
      let isMobile = (window.innerWidth <= 800)
      if (isMobile !== this.state.isMobile) {
          this.setState({isMobile})
      }
  }

  state = { 
    title: null,
    images: {}
  }

  isNew = () => {
    if (this.props.router.query.postId === 'new') {
      return true
    }
    return false
  }

  handleCanUpdatePost = async data => {

    const { title, thumbnail, author } = data

    /**
     * Did this to get out of infinite render situation!
     * @see https://stackoverflow.com/questions/55311187/how-to-avoid-using-setstate-in-render-method/55311268#55311268
     */
    await this.setState(state => {
      if(title !== state.title) {
        return {title} 
      }
    })
    await this.setState(state => {
      if(thumbnail !== state.images) {
        return {images: thumbnail} 
      }
    })
    await this.setState(state => {
      if(author !== state.author) {
        return {author} 
      }
    })

  }

  render() {
    return (
      <>
      <Head>

        <title>Compose new post - {meta.title}</title>
        <meta name="robots" content="nofollow, noindex" />

        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
        <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar_responsive.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles/Editor.css" />

        <script src="/static/prebuilt/js/jquery-3.2.1.min.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/popper.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js"></script>
        <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
        <script src="/static/prebuilt/plugins/easing/easing.js"></script>
        <script src="/static/prebuilt/plugins/masonry/masonry.js"></script>
        <script src="/static/prebuilt/plugins/parallax-js-master/parallax.min.js"></script>
        <script src="/static/prebuilt/js/post_nosidebar.js"></script>

      </Head>
      <Query query={CAN_UPDATE_POST_QUERY} variables={{ id: this.props.router.query.postId }}>
        { payload => {

          if(payload.loading) {
            <Loading />
          }

          if(this.isNew()){
            return (
              <PleaseSignIn>
                { me => (
                  <>
                  <Header />
                  <MiniTitle>Compose new post</MiniTitle>
                  {this.state.isMobile ? <EditorSucks /> : <EditorPage titleState={async title => await this.setState({ title })} categoryState={async categories => await this.setState({ categories })} imageState={async images => await this.setState({ images })} new />}
                  <Footer />
                  <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
                  </>
                ) }
              </PleaseSignIn>
            )
          } else if (payload.data && payload.data.canUpdatePost) {

            // this.handleCanUpdatePost(payload.data.canUpdatePost)
            const { title, thumbnail, editorSerializedOutput } = payload.data.canUpdatePost

            return (
              <PleaseSignIn>
                { me => (
                  <>
                  <Head><title>Update Post - {meta.title}</title></Head>
                  <Header />
                  <Title noSidebar title={title} tags={this.state.categories} thumbnail={thumbnail.blackOverlayImage} currentUser={me} postData={payload.data.canUpdatePost} />
                  {this.state.isMobile ? <EditorSucks /> : <EditorPage titleState={async title => await this.setState({ title })} categoryState={async categories => await this.setState({ categories })} imageState={async images => await this.setState({ images })} editorContent={editorSerializedOutput} postData={payload.data.canUpdatePost} />}
                  <Footer />
                  <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
                  </>
                ) }
              </PleaseSignIn>
            )
            
          } else {
            return (
              <QueryFailed />
            )
          }

        } }
      </Query>
      </>
    )
  }
}

export default withRouter(editorPage)