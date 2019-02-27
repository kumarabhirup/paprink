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

        <meta name="og:title" property="og:title" content={meta.meta_ogTitle} />
        <meta name="description" content={meta.meta_description} />
        <meta name="author" content={meta.name} />
        <meta name="robots" content="index, follow" />

        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="manifest" href="/static/prebuilt/manifest.json" />

        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
        <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
        
        {this.props.router.asPath === '/' && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/main_styles.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/responsive.css" />
          </>
        )}

        {this.props.router.asPath === '/post' && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
          </>
        )}

        {this.props.router.asPath === '/category' && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category_responsive.css" />
          </>
        )}

        {this.props.router.asPath === '/author' && (
          <>
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category.css" />
            <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/category_responsive.css" />
            <link rel="stylesheet" type="text/css" href="/static/author-card/author-card.css" />
          </>
        )}

        <title>{ meta.title }</title>

      </Head>
    )
  }
  
}

export default withRouter(Meta)