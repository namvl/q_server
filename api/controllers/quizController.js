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


exports.create_a_quiz = function(req, res) {
  var new_quiz = new Quiz(req.body);
  new_quiz.save(function(err, quiz) {
    if (err)
      res.send(err);
    res.json(quiz);
  });
};


exports.read_a_quiz = function(req, res) {
  Quiz.findById(req.params.quizId, function(err, quiz) {
    if (err)
      res.send(err);
    res.json(quiz);
  });
};


exports.update_a_quiz = function(req, res) {
  Quiz.findOneAndUpdate({_id: req.params.quizId}, req.body, {new: true}, function(err, quiz) {
    if (err)
      res.send(err);
    res.json(quiz);
  });
};


exports.delete_a_quiz = function(req, res) {
  Quiz.remove({
    _id: req.params.quizId
  }, function(err, quiz) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
