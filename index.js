var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Quiz = require('./api/models/quizModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nam_sa:namsa123$@cluster0-shard-00-00-gpfx7.mongodb.net:27017,cluster0-shard-00-01-gpfx7.mongodb.net:27017,cluster0-shard-00-02-gpfx7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/quizRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
