const axios = require('axios')

axios
  .post('https://ptsv2.com/t/wdv29-1621319997/post', {
    todo: 'Buy the milk',
  })
  .then((res) => {
    console.log(`statusCode: ${res.status}`)
    console.log(res)
  })
  .catch((error) => {
    console.error(error)
  })