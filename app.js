const express = require('express');
//const http = require('http');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks')
const app = express();
app.use(volleyball);

let tweetBank = require('./tweetBank.js');

// HTML Template Setup ----- middleware

var locals = {
  title: 'An / Example',
  people: [
      { name: 'Gandalf'},
      { name: 'Frodo' },
      { name: 'Hermione'}
  ]
};

app.set('view engine', 'html');
app.engine('html', nunjucks.render)
nunjucks.configure('views', {
  noCache: true,
  //autoescape: true,
  //express: app,
});

// Routing
app.get('/', function(req, res) {
  // Render async retreives index.html from local file system, updates with local vars, and calls callbacks on response.
  res.render('index', locals, function (err, output) {
    if (err) throw err
    res.send(output);
  });
});

app.get('/1', function(req, res){

  // res.send(tweetBank.list());
  res.send(tweetBank.find(['name', 'Peter Coyle']));
})

// Old routes
// app.get('/', function (req, res) {
//   const path = arguments[0];
//   console.log(`GET REQUEST for ${path}`);
//   res.send('Hello World');
// })

// app.use(function (req, res, next) {
//   // Console.log() activities for this middleware function here.
//   let url = req.originalUrl;
//   const requestType = req.method;
//   console.log('Request Type: ', requestType, url);
//   next()
// })

// app.get('/:id', function (req, res) {
//   // const path = arguments[0].toString();
//   let path = req.params.id;
//   console.log(`GET REQUEST for ${path}`);
//   res.sendStatus(200);
// })


app.listen(3000, () => console.log('Server listening on port 3000'));
