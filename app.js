const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const db = require('./db')
const package = require('./package.json');

const app = express()
const port = process.env.PORT || 5000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())

app.use('/employees', require('./routes/employees'))

app.get('/status', (req, res) => {
  const status = {
    status: 'Running',
    version: package.version,
    node_version: process.version,
    npm_version: process.env.npm_package_version
  }
  res.send(status)
})

db.connectToServer((err)=>{
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(port, () => {
    console.log(`Manolo server listening on port ${port}`)
  })
})
