'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
  name:{
    type: String,
    required: 'Enter quiz name'
  },
  publish_at:{
    type: Date,
    default: Date.now
  },
  due_at:{
    type:Date
  },
  pass_mark:{
    type: Number
  },
  question_groups:{
    type:[{
      index:{ type: Number},
      title:{ type: String},
      questions:{
        type:[{
          question:{
            type:[{
              content:{ type: String},
              mark:{ type: Number},
              choices:{ type:[{
                choice:{
                  type:[{
                    content:{ type: String},
                    correct:{type:Boolean}
                  }]
                }
              }]}
            }]
          }
        }]
      }
    }]
  }
});

module.exports = mongoose.model('Quizzes', QuizSchema);
