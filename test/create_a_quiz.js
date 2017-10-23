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

  $('#questionGroupTitle').val('');
});

$(document).on('click', '.addQuestion', function(){
  groupIdx = $(this).data('id') - 1;
  questionGroups[groupIdx].questions = [{'title':'', 'mark':0, 'answers':[]}]
  var question = {'title':'', 'mark':0, 'answers':[{'answer':'', 'correct':false}]};
  $('#groupTitle').text(questionGroups[groupIdx].title);

  $('#addQuestionDialog').modal();
  answerIndex = 0;

  $(document).on('click', '.addAnswer', function(){
    $('<input>').attr('type', 'text')
      .attr('name', 'answers')
      .attr('data-index', answerIndex)
      .appendTo($('#answers'));
    $('<input>').attr('type', 'checkbox')
      .attr('name', 'corrects')
      .attr('data-index', answerIndex)
      .appendTo($('#answers'));
    $('<br />').appendTo($('#answers'));
    answerIndex++;
  });

  $(document).on('click', '#questionSave', function(){
    var answers = [];
    var anAnswer = {'answer':'', 'correct':false};

    correctAnswers = [];
    $("input:checked").each(function( index, valor ){
      var index = $(this).data('index');
      correctAnswers.push(index);
    });

    $("input[name=answers]").each(function( index, valor ){
      anAnswer.answer = valor.value;
      //if($("input[name=corrects]"))
      anAnswer.correct = false;
      answers[index] = anAnswer;
    });

  });

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
  quiz.duration = $('#quizDuration').val();
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
    }).fail(function (jqXHR, textStatus, errorThrown)
    {
      console.log('Posting failed with return data:');
      console.log(jqXHR.responseText);
      console.log(textStatus);
    });

    $.post( 'http://api.namvl.com/quizzes', function( data ) {
      $( ".result" ).html( data );
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
