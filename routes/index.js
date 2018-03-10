const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank.js');


router.get('/', function(req, res, next){
  let tweets = tweetBank.list();
  res.render( 'index', {title: 'Twitter clone!', tweets : tweets, showForm : true} );
});

router.get('/users/:name', function(req, res, next) {
  let list = tweetBank.find( {name: req.params.name } );
  res.render( 'index', { tweets: list ,  showForm : true , username : req.params.name} );
});

router.get('/tweets/:id', function(req, res, next){
  let findByComment = tweetBank.find({ id : +req.params.id });
  res.render('index', {tweets : findByComment, showForm : true});
});

router.post('/tweets', function(req, res, next){
  console.log(req.body);
  tweetBank.add(req.body.name, req.body.content);
  res.redirect('/');

});



module.exports = router;
