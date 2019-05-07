import Head from 'next/head'
import { withRouter } from 'next/router'
import ReactGA from 'react-ga'

import { meta } from '../api/meta'

class Meta extends React.Component {

  componentDidMount() {
    ReactGA.initialize(process.env.GA_TRACKING_ID)
  }

  render() {
    return (
      <Head>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <link rel="shortcut icon" href="/static/favicon.ico" />
        {/* <link rel="manifest" href="/static/prebuilt/manifest.json" /> */}

        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
        <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
        
        {this.props.router.pathname === '/' && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/main_styles.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/responsive.css" />
          </>
        )}

        {this.props.router.asPath.startsWith('/p/') && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
          </>
        )}

        {this.props.router.asPath.startsWith('/post') && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
          </>
        )}

        {this.props.router.asPath.startsWith('/category') && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category_responsive.css" />
          </>
        )}

        {this.props.router.asPath.startsWith('/categories') && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category_responsive.css" />
          </>
        )}

        {this.props.router.asPath.startsWith('/author') && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/author-card/author-card.css" />
          </>
        )}

        {this.props.router.asPath.startsWith('/login') || this.props.router.asPath.startsWith('/signin') ? (
          <>
            <link rel="stylesheet" type="text/css" href="/static/auth/css/util.css" />
            <link rel="stylesheet" type="text/css" href="/static/auth/css/main.css" />
          </>
        ) : null}

        {this.props.router.asPath.startsWith('/settings') ? (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar_responsive.css" />
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css" />
            <link rel="stylesheet" href="https://unpkg.com/react-day-picker/lib/style.css" />
          </>
        ) : null}

        {this.props.router.asPath.startsWith('/about') ? (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar_responsive.css" />
          </>
        ) : null}

        {this.props.router.asPath.startsWith('/editor') ? (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/styles/Editor.css" />
          </>
        ) : null}

        <title>{meta.meta_ogTitle}</title>

      </Head>
    )
  }
  
}

export default withRouter(Meta)