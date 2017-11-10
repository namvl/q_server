'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
  name:{
    type: String,
    required: 'Enter quiz name'
  },
  description: String,
  tags: String,
  publish_at:{
    type: Date,
    default: Date.now
  },
  exec_limit_time:Number,
  due_at: Date,
  pass_mark:Number,
  question_groups:[{
    title: String,
    questions: [{
      title: String,
      mark: Number,
      answers:[{
        index: Number,
        content: String,
        correct: Boolean
      }]
    }]
  }]
});

module.exports = mongoose.model('Quizzes', QuizSchema);
