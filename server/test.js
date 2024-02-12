const express = require('express');
const app = express();
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/uwei6az6zu/',
  publicKey: 'public_sf2BSHg1HDw4TCb9ZrQWCIsh0+g=',
  privateKey: 'private_aMWOifaRfuQwjJPGkUtJ9DpZlpY='
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(3001, function () {
  console.log('Live at Port 3001');
});