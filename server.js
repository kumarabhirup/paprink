const express = require('express')
const http = require('http')
const next = require('next')

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3006

app.prepare()
.then(() => {

  const server = express()

  server.get('/login', (req, res) => {
    const actualPage = '/signin'
    app.render(req, res, actualPage)
  })

  server.get('/editor/:postId', (req, res) => {
    const actualPage = '/editor'
    const queryParams = { postId: req.params.postId }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/p/:slug', (req, res) => {
    const actualPage = '/post'
    const queryParams = { slug: req.params.slug }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/categories/:category', (req, res) => {
    const actualPage = '/category'
    const queryParams = { category: req.params.category }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/author/:authorUsername', (req, res) => {
    const actualPage = '/author'
    const queryParams = { authorUsername: req.params.authorUsername }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    // To Read a Cookie
    var cookies = parseCookies(req)
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + PORT)
  })
  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})