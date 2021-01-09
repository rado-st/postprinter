const fs = require('fs')
const child_process = require('child_process')

const printAddressLabels = () => {
  console.log('Hello there')
}


const createAddressLabel = async (req, res) => {
  const barcode = req.body.barcode
  const barcode1 = req.body.barcode
  const name = req.body.name
  const address = req.body.address
  const postcode = req.body.postcode
  const city = req.body.city

  const random = Math.random().toString().replace('.', '')

  let addressUserTemplate = require('../../templates/address.json').template

  const json = JSON.stringify({
    
    barcode,
    name,
    address,
    postcode,
    city
    
  })
  res.json(json)
  

  addressUserTemplate = addressUserTemplate.replace('{barcode}', `${barcode}`)
  addressUserTemplate = addressUserTemplate.replace('{barcode1}', `${barcode1}`)
  addressUserTemplate = addressUserTemplate.replace('{name}', `${name}`)
  addressUserTemplate = addressUserTemplate.replace('{address}', `${address}`)
  addressUserTemplate = addressUserTemplate.replace('{postcode}', `${postcode}`)
  addressUserTemplate = addressUserTemplate.replace('{city}', `${city}`)

  console.log('\nSERVER: label after => \n', addressUserTemplate)

  fs.writeFile(`${random}.zpl`, addressUserTemplate, 'utf8', () => {
    console.log(`\n${random}.zpl was made\n`)

    fs.readFile(`${random}.zpl`, `utf8`, (err, data) =>{
      if(err){
        console.log('Server:', err)
        return
      }
      console.log(`checking saved address label ${data}`)

      setTimeout(function() {
        child_process.exec(`lpr -P ${req.app.locals.printerAddressLabels} -o raw ${random}.zpl`,
          function(error, stdout, sterr){
            console.log(error)
            console.log(stdout)
          }
        )
      }, 3000)

      setTimeout(function() {
        child_process.exec('find . -name "*.zpl" -type f -delete', function (error, stdout, stderr) {
          console.log('\nSERVER: deleted all zpl files\n')
        })
      }, 10000)
    })
  })
}


module.exports = {
  printAddressLabels,
  createAddressLabel
}