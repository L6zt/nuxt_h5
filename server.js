const app = require('express')()
const { Nuxt, Builder } = require('nuxt')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use('*', (req, res, next) => {
  res.setHeader("Cache-Control", "private,no-store,max-age=0,no-cache,must-revalidate,post-check=0,pre-check=0")
  next()
})
// Give nuxt middleware to express
app.use(nuxt.render)
// Start express server
app.listen(port, host)
console.log(`http://${host}:${port}`)
