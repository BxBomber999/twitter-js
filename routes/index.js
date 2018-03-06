const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets }, function(err, html){
    if(err) throw err;
    res.send(html);
  } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { list: list } );
});




module.exports = router;

// router.get('/stylesheets/style.css', function(req, res){
//   // console.log(req.path);
//   // res.sendFile(req.path);
//   console.log('/Users/PeterCoyle/Documents/FullStack/Junior/twitter-js/public' + req.path);
//   res.sendFile('/Users/PeterCoyle/Documents/FullStack/Junior/twitter-js/public' + req.path);
// })
