var express = require('express'),
  app = express(),
  port = process.env.PORT || 3004,
  mongoose = require('mongoose'),
  Quiz = require('./api/models/quizModel'),
  config = require('./config'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://jquiz-client.herokuapp.com');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

var routes = require('./api/routes/quizRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
