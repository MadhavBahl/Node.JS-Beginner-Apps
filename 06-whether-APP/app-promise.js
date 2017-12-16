const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Enter the address to fetch whether for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/f1d413224992adae584dd90b72f51905/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently: ${temperature} deg F`);
  console.log(`But, it feels like: ${apparentTemperature} deg F`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to api servers');
  } else{
    console.log(e.message);
  }
});
