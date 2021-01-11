let barcode, name, address, postcode, city;
const ADDRESS = 'http://localhost:8000/'

createAddressLabel = async function () {
  await fetch(`${ADDRESS}createAddressLabel`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      barcode: document.getElementById('barcode').value,
      name: document.getElementById('name').value,
      address: document.getElementById('address').value,
      postcode: document.getElementById('postcode').value,
      city: document.getElementById('city').value 
    })
  })
}