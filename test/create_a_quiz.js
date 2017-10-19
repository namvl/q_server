/* ------------------------ Constant variable ------------------------------- */
var QUESTION_GROUP_EL = "<div id='question_groups___groupIdx__'>\
                        <input type='text' name='question_groups[__groupIdx__].[title]' placeholder='Enter question group title' />\
                        </div>";
var BTN_ADD_QUESTION = "<a class='btn btn-primary' href='#' onclick='addQuestion(__groupIdx__)'> Add question</a>";
var QUESTION_EL = "<div id='question_groups___groupIdx__'>\
  <input type='text' name='question_groups[__groupIdx__].[questions][__questionIdx__].[title]' placeholder='Enter question content' />\
  <input type='number' name='question_groups[__groupIdx__].[questions][__questionIdx__].[mark]' placeholder='Enter question mark' />\
</div>";

var ANSWER_EL = "<div id='question___questionIdx__'>\
  <input type='text' name='question_groups[__groupIdx__].[questions][__questionIdx__].[answers][__answerIdx__].[answer]' placeholder='Enter question answer' />\
  <input type='checkbox' name='question_groups[__groupIdx__].[questions][__questionIdx__].[answers][__answerIdx__].[correct]' />\
</div>";
var MODAL_BTN = "<a data-toggle='modal' data-id='__groupIdx__' title='Add this item' class='open-AddQuestionDialog btn btn-primary' href='#addQuestionDialog'>Add question</a>";
/* -------------------------------------------------------------------------- */

/* ------------------------------ common variables -------------------------- */
var isFormValid = false;
var group_index = 0;
var currentGroupIdx = 0;
/* -------------------------------------------------------------------------- */

$(document).on("click", ".open-AddQuestionDialog", function () {
  var groupId = $(this).data('id');
  $(".modal-body #groupId").attr('name', 'question_groups[' + groupId + ']');
});
var questionGroups = [];
var questionGroup = {};
var name = '';
var passMark = 0;
var quiz = {'name': name, 'pass_mark': passMark, 'question_groups':questionGroups};
/*
question_groups:[{
  'title':'string',
  'questions':[{
    title:'string',
    mark:'number',
    answers:[{
      answer:'',
      correct:'boolean'
    }]
  }]
}]
question_groups[group_index].[title]
question_groups[group_index].[questions]
question_groups[group_index].[questions][question_index].[title]
question_groups[group_index].[questions][question_index].[mark]
question_groups[group_index].[questions][question_index].[answers]
question_groups[group_index].[questions][question_index].[answers][answer_index].[correct]
question_groups[group_index].[questions][question_index].[answers][answer_index].[answer]
*/

$(document).on("click", ".addQuestionGroups", function(){
  var n = questionGroups.length;
  questionGroups[n] = {'title':'', 'questions':null};
  questionGroupId = 'question_groups_' + n;
  questionTitle = 'question_groups[' + n + '][title]';
  questionGroupTitleId = questionGroupId + 'title';

  $('<div>').attr( 'id', questionGroupId ).appendTo("#question_groups_container");

  $('<input>').attr('type','text')
    .attr('name', questionTitle)
    .attr('id', questionGroupTitleId)
    .appendTo("#" + questionGroupId);

  $('<a>').attr('data-toggle', 'modal')
    .attr('style', 'display:none')
    .attr('data-id', n)
    .attr('class', 'open-AddQuestionDialog btn btn-primary')
    .attr('href', '#addQuestionDialog')
    .text('Add Question')
    .appendTo("#" + questionGroupId);

  $(document).on("input", 'input#'+questionGroupTitleId, function(){
    if(this.val() !== ''){

    }
  });

});


/* -------------------------------------------------------------------------- */
function submitForm(){
  // form validate code here

  // checking before submit
  if(isFormValid === false){
    return false;
  }
  // if form valid -> submit form.
  return true;
}

function addQuestionGroups(){
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };

  var container = document.querySelector('#question_groups_container');

  container.innerHTML += QUESTION_GROUP_EL.replaceAll('__groupIdx__', currentGroupIdx);
  var addedQuestionGroup = document.querySelector('#question_groups_' + currentGroupIdx);
  addedQuestionGroup.innerHTML += MODAL_BTN.replaceAll('__groupIdx__', currentGroupIdx);

  currentGroupIdx++;
}

function addQuestionToGroup(groupIdx){
  var currentGroup = document.querySelector('#question_groups_' + groupIdx);
  // get all div child, check max question id
}
function addAnswer(groupIdx, questionIdx){
  //
}
function test(){
  alert('Test JS OK.');
}
