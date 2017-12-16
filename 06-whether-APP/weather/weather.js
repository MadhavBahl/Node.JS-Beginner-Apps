const request = require('request');

var getWeather = (lat,lng,callback) => {

  request({
    url: `https://api.darksky.net/forecast/f1d413224992adae584dd90b72f51905/${lat},${lng}`,
    json: true
  },(error,response,body) => {
    if(error) {
      callback('Unable to connect to forecast.io servers');
    } else if(response.statusCode === 400){
      callback('Unable to fetch whether');
    } else if (response.statusCode === 200) {
      callback(undefined , {
        temperature: body.currently.temperature,
        apperentTemperature: body.currently.apparentTemperature
      })
      // console.log(`The current Temperature is : ${body.currently.temperature}`);
    }
    // if(!error && response.statusCode === 200){
    //   console.log(`The current Temperature is : ${body.currently.temperature}`);
    // } else {
    //   console.log('Unable to fetch whether.');
    // }
  });

};

module.exports.getWeather = getWeather;
