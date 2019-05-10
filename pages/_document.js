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
        <Head>{this.props.styleTags}</Head>
        <body>

          <noscript>
            <div style={{width: "900px", margin: "20% auto", textAlign: "center"}}>
              <h2>It's pity that you wanna live in a <span style={{color: "red"}}>world without JavaScript!</span> 🌎</h2>
            </div>
          </noscript>

          <Main />
          <NextScript />

        </body> 
      </html>
    ) 
  }
  
}


export default MyDocument