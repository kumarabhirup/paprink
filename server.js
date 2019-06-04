const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

webpush.setVapidDetails('mailto:test@test.com', process.env.PUBLIC_VAPID, process.env.PRIVATE_VAPID)

const PORT = process.env.PORT || 3006

app.prepare()
.then(() => {

  const server = express()

  server.use('/serviceWorker.js', express.static(__dirname + '/serviceWorker.js'))
  
  server.use(bodyParser.json())

  server.post('/subscribeToReminder', (req, res) => {
    // Get push subscription object
    const subscription = req.body
    
    // Send 201 status - resource created
    res.status(201).json({})

    // Create payload
    const payload = JSON.stringify({
      title: "Push Test"
    })

    // Pass object into the send notification function
    webpush.sendNotification(subscription, payload)
           .catch(err => console.log(err))
  })

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