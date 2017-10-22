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

var questionGroups = [];
var questionGroup = {};
var name = '';
var passMark = 0;
var quiz = {};
/* -------------------------------------------------------------------------- */

$(document).on("click", ".open-AddQuestionDialog", function () {
  var groupId = $(this).data('id');
  $(".modal-body #groupId").attr('name', 'question_groups[' + groupId + ']');
});

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
/*
$(document).on("click", ".addQuestionGroups", function(){

  //questionGroups[questionGroupIndex] = {'title':'', 'questions':null};
  questionGroupId = 'question_groups_' + questionGroupIndex;
  questionTitle = 'question_groups[' + questionGroupIndex + '][title]';
  questionGroupTitleId = questionGroupId + 'title';

  $('<div>').attr( 'id', questionGroupId )
    .attr('style', 'padding:5px; border:dashed 1px gray;')
    .appendTo("#question_groups_container");

  $('<input>').attr('type','text')
    .attr('name', questionTitle)

    .attr('id', questionGroupTitleId)
    .appendTo("#" + questionGroupId);

  $('<a>').attr('data-toggle', 'modal')
    .attr('style', 'display:none; margin-left:5px')
    .attr('data-id', questionGroupIndex)
    .attr('id', "addQuestionDialog_" + questionGroupIndex)
    .attr('class', 'open-AddQuestionDialog btn btn-primary')
    .attr('href', '#addQuestionDialog')
    .text('Add Question')
    .appendTo("#" + questionGroupId);

  $(document).on("input", 'input#'+questionGroupTitleId, function(){
    if($(this).val() !== ''){
      $("#addQuestionDialog_" + questionGroupIndex).attr('style', 'display:inline; margin-left:5px');
    }
    else
    {
      $("#addQuestionDialog_" + questionGroupIndex).attr('style', 'display:none; margin-left:5px');
    }
  });

  questionIndex = 0;
  $(document).on('click', '.open-AddQuestionDialog', function(){
    var groupIdx = $(this).data('id');
    questionGroupTitle = $("#"+questionGroupTitleId).val();

    $("#groupTitle").text((groupIdx + 1) + '. ' + questionGroupTitle);

    $('<textarea>').attr('name', 'question_groups['+ groupIdx +']' + '[questions]['+questionIndex+'][title]')
      .appendTo("#questionsContainer");
    $('<input>').attr('type', 'text')
      .attr('name', 'question_groups['+ groupIdx +']' + '[questions]['+questionIndex+'][mark]')
      .appendTo("#questionsContainer");
    $('<a>').attr('class', 'addAnswer btn btn-success')
      .attr('data-gidx', groupIdx)
      .attr('data-qidx', questionIndex)
      .text('Add Answer')
      .attr('data-question', questionIndex)
      .appendTo("#questionsContainer");

    answerIndex = 0;

    $(document).on('click', '.addAnswer', function(){
      var groupIdx = $(this).data('gidx'),
      questionIdx = $(this).data('qidx');
      $('<br>').appendTo("#questionsContainer");
      $('<input>').attr('type', 'text')
        .attr('name', 'question_groups['+ groupIdx +']' + '[questions]['+questionIdx+'][answers]['+answerIndex+'][answer]')
        .appendTo("#questionsContainer");
      $('<input>').attr('type', 'checkbox')
        .attr('name', 'question_groups['+ groupIdx +']' + '[questions]['+questionIdx+'][answers]['+answerIndex+'][correct]')
        .appendTo("#questionsContainer");

      answerIndex++;
    });
    questionIndex++;
  });
  questionGroupIndex++;
});

*/

function addQuestionGroupRow(parent, questionGroupIdx, questionGroupTitle){
  var tr = $('<tr>');
  $('<td>').text(questionGroupIdx).appendTo(tr);
  $('<td>').attr('class', 'text-truncate max-size-250px text-left')
    .text(questionGroupTitle)
    .appendTo(tr);
  var td = $('<td>');
  var a1 = $('<a>').attr('class', 'addQuestion btn btn-info').attr('data-id', questionGroupIdx)

  $('<i>').attr('class', 'fa fa-list-alt')
          .attr('aria-hidden', 'true')
          .appendTo(a1);
  var a2 = $('<a>').attr('class', 'removeQuestionGroup btn btn-danger').attr('data-id', questionGroupIdx)

  $('<i>').attr('class', 'fa fa-times')
          .attr('aria-hidden', 'true')
          .appendTo(a2);
  a1.appendTo(td);
  a2.appendTo(td);
  td.appendTo(tr);
  tr.appendTo(parent);
}

$(document).on('click', '.addQuestionGroup', function(){
  console.log('addQuestionGroup button clicked!')

  //var questionGroupTitle = $('#questionGroupTitle').val();
  questionGroups[questionGroups.length] = {'title': $('#questionGroupTitle').val(), 'questions':[]};

  addQuestionGroupRow($('#question_groups_container tbody'), questionGroups.length, $('#questionGroupTitle').val());

  $('#questionGroupTitle').val('');
  $(this).addClass('disabled');

});

function initQuestionAtGroup(groupIndex){
  $('#addQuestionDialog').modal();
  $('#questionGroupIndex').val(groupIndex);
}
function addQuestionToGroup(groupIndex){

  var answers = [];
  $('input[name=corrects]').each(function(){
    var answerIndex = $(this).val();

    var answer = $('input[name=answers]')[answerIndex-1].value;
    var correct = false;
    if( $(this).is(":checked") ){
      correct = true;
    }
    answers[answerIndex-1] = {'answer': answer, 'correct': correct};
  });
  var question = {'title': $('#questionTitle').val(), 'mark':$('#questionMark').val(), 'answers':answers}
  console.log(question);
  var questionIndex = questionGroups[groupIndex-1].questions.length;
  questionGroups[groupIndex-1].questions[questionIndex] = question;
  console.log(questionGroups);
}
var answerIdx = 0;
function addQuestionFormReset(){
  $('#answersContainer').empty();
  $('#questionGroupIndex').val('');
  $('#questionTitle').val('');
  $('input[name=answers]').val('');
  $('input[name=corrects]').prop('checked', false);
  answerIdx = 0;
}
$(document).on('change keydown keyup paste', '#questionGroupTitle', function() {

  if($.trim($(this).val()) != ''){
    $('.addQuestionGroup').removeClass('disabled');
  }
  else{
    $('.addQuestionGroup').addClass('disabled');
  }
});

$(document).on('change keydown keyup paste', '#quizName', function() {
  if($.trim($(this).val()) != ''){
    $('#quizName').removeClass('is-invalid');
  }
  else{
    $('#quizName').addClass('is-invalid');
  }
});


$(document).on('click', '.addQuestion', function(){
  initQuestionAtGroup($(this).data('id'));
});

$(document).on('click', '.addAnswer', function(){
  answerIdx++;
  $('<div>').prepend($('<input>').attr('type', 'text').attr('name', 'answers')).prepend($('<input>').attr('type', 'checkbox').attr('name', 'corrects').val(answerIdx)).appendTo($('#answersContainer'));
});


$(document).on('click', '.saveQuestion', function(){
  addQuestionToGroup($('#questionGroupIndex').val());
  addQuestionFormReset();
  $('#addQuestionDialog').modal('toggle');
})

$(document).on('click', '.quizPreview', function(){
  onPreview();

  console.log(quiz)
})

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

$(document).ready(function(){
  onPageLoad();
});

$(document).on('click', '.addNewQuiz', function(){
  formValidation();
  quiz.name = $('#quizName').val();
  quiz.pass_mark = $('#quizPassMark').val();
  quiz.publish_at = $('#publishAt').val();
  quiz.due_at = $('#dueAt').val();
  quiz.question_groups = questionGroups;
  addNewQuiz();
});

/* -------------------------------------------------------------------------- */
function onPageLoad(){
  var now = new Date();
  var presentTime = new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().substring(0,19);
  var nextWeek = addDays(now, 7);
  var expiredTime = new Date(nextWeek.getTime()-nextWeek.getTimezoneOffset()*60000).toISOString().substring(0,19);
  $('#publishAt').val(presentTime);
  $('#dueAt').val(expiredTime);
}
function formValidation(){
  if( $.trim($('#quizName').val()) == ""){
    alert("Test");
    $('#quizName').val('');
    $('#quizName').addClass('is-invalid');
    return;
  }
}
function onPreview(){
  formValidation();
  quiz.name = $('#quizName').val();
  quiz.pass_mark = $('#quizPassMark').val();
  quiz.publish_at = $('#publishAt').val();
  quiz.due_at = $('#dueAt').val();
  quiz.question_groups = questionGroups;
}
function addNewQuiz(){
  $.ajax({
        type: 'post',
        url: 'http://api.namvl.com/quizzes',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(quiz)
    }).done(function (data)
    {
      console.log('Posting successful with return data:');
      console.log(data);
    }).error(function (jqXHR, textStatus, errorThrown)
    {
      console.log('Posting failed with return data:');
      console.log(jqXHR.responseText);
      console.log(textStatus);
    });
}
function onSubmit(){
  // form validate code here

  // checking before submit
  if(isFormValid === false){
    return false;
  }
  // if form valid -> submit form.
  return true;
}
