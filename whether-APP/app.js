const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=VIT%20Uvinersity%20Vellore',
  json: true
}, (error,response,body) => {
  console.log(body);
});
