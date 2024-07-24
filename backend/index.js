const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
// 3000 port for react app
//const port = 3000
const port = 3001

app.use(express.json())
//Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend app on port http://localhost:${port}`)
})