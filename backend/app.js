require('dotenv').config()
const express = require('express')
const app = express()

console.log(process.env.NODE_ENV);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})
