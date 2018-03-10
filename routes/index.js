const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank.js');

router.get('/', function(req, res, next){
  let tweets = tweetBank.list();
  res.render( 'index', {title: 'Twitter clone!', tweets : tweets} );
});

module.exports = router;
