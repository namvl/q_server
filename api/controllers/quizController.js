'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Quizzes');

exports.list_all_quizzes = function(req, res) {
  Quiz.find({}, function(err, quiz) {
    if (err)
      res.send(err);
    res.json(quiz);
  });
};
