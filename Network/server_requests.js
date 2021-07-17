const https = require('https')
const hostname = '127.0.0.1'
const options = {
    port: 443,
    hostname: 'dog.ceo',
    path: '/api/breeds/list/all',
    method: 'GET',
}

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', (error) => {
    console.error(error)
  })
  
  req.end()