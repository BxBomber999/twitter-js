const express = require('express');
const app = express();
// template file + locals object -> rendering function -> complete html
const nunjucks = require('nunjucks');
const morgan = require('morgan');

//middle-ware fires with every incoming request and helps log helpful messages
nunjucks.configure('views', { noCache: true }); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // tells express res.render will have html files
app.engine('html', nunjucks.render); // tells express to use nunjucks res.render

app.use(morgan('dev'));

app.use(function(req, res, next){
  console.log('Request type: ', req.method, req.path );
  next();
})

const routes = require('./routes');
app.use('/', routes);

// console.log(__dirname + '/public');
app.use(express.static(__dirname + '/public'));


app.listen(3000, function(){
  console.log('Server 3000 is now running!')
})
