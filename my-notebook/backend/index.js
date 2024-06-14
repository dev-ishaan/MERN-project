const connectToMongo =  require('./db')

connectToMongo()

const express = require('express')
const app = express()
const port = 5000 // 3000 is for react

app.use(express.json())

// Routes available
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})