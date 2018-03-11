'use strict'
const express = require('express');
const app = express();
// template file + locals object -> rendering function -> complete html
const nunjucks = require('nunjucks');
const routes = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

//middle-ware fires with every incoming request and helps log helpful messages
nunjucks.configure('views', { noCache: true }); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // tells express res.render will have html files
app.engine('html', nunjucks.render); // tells express to use nunjucks res.render

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public')); //load static files
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next){
//   console.log('Request type: ', req.method, req.path );
//   next();
// })

// Socket.io sets up a server using WebSockets, running alongside our Express server using HTTP — both listening through the same port!
// Idea is when you submit to the server, the sever pushes it to all connected clients.
const server = app.listen(3000,  () =>{ console.log('server 3000 started') }); //server is listening for request
// the "io" object provides all the server-side socket functionality.
const io = socketio.listen(server); //socketio is listening for requests too

app.use('/', routes(io));



