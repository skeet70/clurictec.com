/*
 * Module dependencies
 */
var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib');
var app = express();

// Custom compiling function for nib/stylus
function compile(string, path) {
  return stylus(string).set('filename', path).use(nib());
}

// App setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
   {
      src: __dirname + '/static',
      compile: compile
   }
));
app.use(express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
   response.render('index',
      { title : 'Home' }
   );
});

app.get('/resume', function (request, response) {
   response.render('resume',
      { title : 'Résumé'}
   );
});

app.get('/blog', function (request, response) {
   response.render('blog',
      { title : 'Blog'}
   );
});

app.get('/projects', function (request, response) {
   response.render('projects',
      { title : 'Projects'}
   );
});

// Runtime
app.listen(3000);