const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
const bodyParser = require('body-parser')

const eSenderController = require('./controllers/esender')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.locals.printerAddressLabels = 'PC42d-203-FP'

app.use(express.static('./../public'))

app.post('/printAddressLabels', eSenderController.printAddressLabels)
app.post('/createAddressLabel', eSenderController.createAddressLabel)


app.listen(port, () => {
  console.log(`SERVER: Example app listening at http://localhost:${port}`)
})