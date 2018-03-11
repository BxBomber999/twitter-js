'use strict'

const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank.js');

module.exports = function makeRouterWithSockets(io){

  function respondWithAllTweets(req, res, next){
    let tweets = tweetBank.list();
    res.render( 'index', {
      title: 'Twitter clone!',
      tweets : tweets,
      showForm : true
    });
  }

  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  router.get('/users/:name', function(req, res, next) {
    let list = tweetBank.find( {name: req.params.name } );
    res.render( 'index', {
      tweets: list,
      showForm : true ,
      username : req.params.name
    });
  });

  router.get('/tweets/:id', function(req, res, next){
    let findByComment = tweetBank.find({ id : +req.params.id });
    res.render('index', {
      tweets : findByComment,
      showForm : true
    });
  });

  router.post('/tweets', function(req, res, next){
    let newTweet = tweetBank.add(req.body.name, req.body.content);
    console.log('no issues');
    io.sockets.emit('new_tweet', newTweet); //io is a passed in argument
    res.redirect('/');
  });

  return router;
}


