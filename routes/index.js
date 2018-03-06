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

router.get('/public/stylesheets/style.css', function(req, res){
  // console.log(req.path);
  // res.sendFile(req.path);
  res.sendFile('/Users/PeterCoyle/Documents/FullStack/Junior/twitter-js' + req.path);
})

module.exports = router;
