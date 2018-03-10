const express = require('express');
const app = express();
// template file + locals object -> rendering function -> complete html
const nunjucks = require('nunjucks');

//middle-ware fires with every incoming request and helps log helpful messages
app.use(function(req, res, next){
  console.log('Request type: ', req.method, req.path );
  next();
})

nunjucks.configure('views', {noCache: true }); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // tells express res.render will have html files
app.engine('html', nunjucks.render); // tells express to use nunjucks res.render


const routes = require('./routes');
app.use('/', routes);









app.listen(3000, function(){
  console.log('Server 3000 is now running!')
})
