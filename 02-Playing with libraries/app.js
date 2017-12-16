
const fs = require('fs');
const os = require('os');

var googleTTS = require('google-tts-api');

console.log(`Starting App! Welcome ${os.userInfo().username}, Please to Meet YOU`);

googleTTS(`Starting App! Welcome ${os.userInfo().username}, Please to Meet YOU`, 'en', 1.2)   // speed normal = 1 (default), slow = 0.24
.then(function (url) {
  console.log(url); // https://translate.google.com/translate_tts?...
})
.catch(function (err) {
  console.error(err.stack);
});
