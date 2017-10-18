var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Quiz = require('./api/models/quizModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/quizRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
