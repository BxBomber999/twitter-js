const express = require('express');
//const http = require('http');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks')
const app = express();
app.use(volleyball);
app.use(express.static('public'))
const routes = require('./routes');
app.use('/', routes);


// let tweetBank = require('./tweetBank.js');

// HTML Template Setup ----- middleware

app.set('view engine', 'html');
app.engine('html', nunjucks.render)
nunjucks.configure('views', {
  noCache: true,
  //autoescape: true,
  //express: app,
});


app.listen(3000, () => console.log('Server listening on port 3000'));
