import Document, { Head, Main, NextScript } from 'next/document'
import { withRouter } from 'next/router'
import { ServerStyleSheet } from 'styled-components'

// To render styles on the server-side (for styled-components)
class MyDocument extends Document {

  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    const router = withRouter(this)
    return { ...page, styleTags, router }
  }

  render() {
    return (
      <html>

        <Head>
          {this.props.styleTags}
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>

        <body>

          <noscript>
            <div style={{width: "900px", margin: "20% auto", textAlign: "center"}}>
              <h2>It's pity that you wanna live in a <span style={{color: "red"}}>world without JavaScript!</span> 🌎</h2>
            </div>
          </noscript>

          <Main />
          <NextScript />

          <script src="/static/prebuilt/js/jquery-3.2.1.min.js"></script>
          <script src="/static/prebuilt/styles/bootstrap4/popper.js"></script>
          <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js"></script>
          <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
          <script src="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.js"></script>
          <script src="/static/prebuilt/plugins/easing/easing.js"></script>
          <script src="/static/prebuilt/plugins/masonry/masonry.js"></script>
          <script src="/static/prebuilt/plugins/masonry/images_loaded.js"></script>
          <script src="/static/prebuilt/plugins/parallax-js-master/parallax.min.js"></script>

          <script src="/static/prebuilt/js/custom.js"></script>
          <script src="/static/prebuilt/js/post.js"></script>

        </body>
        
      </html>
    ) 
  }
  
}


export default MyDocument