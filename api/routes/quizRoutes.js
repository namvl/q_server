'use strict';
module.exports = function(app) {
  var quizList = require('../controllers/quizController');

  app.route('/quizzes')
    .get(quizList.list_all_quizzes)
    .post(quizList.create_a_quiz);


  app.route('/quizzes/:quizId')
    .get(quizList.read_a_quiz)
    .put(quizList.update_a_quiz)
    .delete(quizList.delete_a_quiz);
};
