const connectToMongo =  require('./db')
var cors = require('cors')

connectToMongo()

const express = require('express')
const app = express()
const port = 5000 // 3000 is for react

app.use(cors())

app.use(express.json())

// Routes available
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`My-Notebook backend listening on port ${port}`)
})