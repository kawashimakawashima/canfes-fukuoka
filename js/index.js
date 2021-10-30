//const { getQuestionProps } = require('./questionData');

const colors=['black','white','#ff007f'];

let questionName;

$(document).ready(function() {
  setInterval(function(){
    $($('.circles li')[1]).css('background', colors[Math.floor(Math.random() * colors.length)])
  },14000);

  $('.popupButton').on('click',function(){
    questionName=$(this).val();
    const prop = getQuestionProps(questionName);
    $('#qTitle').text(prop.title);
    $('#questionPopup img').attr('src','../images/questions/'+prop.questionImgUrl);
    $('#hintButton').text('ヒントを表示');
    $('#hint').text(prop.hint);
    $('#hint').removeClass('active');

    const answer=sessionStorage.getItem(questionName);
    if(answer == 'false'){
      $('#questionPopup').removeClass('corrected');  
      $('#resultErea').text('');
    }else{
      $('#resultErea').text('正解！答えは' + answer + 'です！');
      $('#questionPopup').addClass('corrected');
    }
    $('#questionPopup').addClass('active');
  });

  $('#answerButton').on('click', function(){
    const answerInput=$('#answerInput').val();
    comparisonHash(answerInput,questionName).then(result => {
      if(result){
        $('#resultErea').text('正解！答えは'+answerInput+'です！');
        $('#questionPopup').addClass('corrected');
        sessionStorage.setItem(questionName, answerInput);
      }else{
        $('#resultErea').text('残念...不正解です');
        $('#answerInput').val('');
      }
    });
  })
  $('#hintButton').on('click', function(){
    if($('#hint').hasClass('active')){
      $('#hint').removeClass('active');
      $('#hintButton').text('ヒントを表示');
    }else{
      $('#hint').addClass('active');
      $('#hintButton').text('ヒントを非表示');
    }
  });

  $('#qPopupClose').on('click',function(){
    $('#questionPopup').removeClass('active');
    $('#hint').removeClass('active');
  });
if(sessionStorage.getItem('isFirst') != 'false') {
  sessionStorage.setItem('isFirst', 'false');
  const questionNames = getQuestionNames();
  for(let i = 0; i < questionNames.length; i++){
    sessionStorage.setItem(questionNames[i], 'false');
  }
}
  const data = sessionStorage.getItem('isFirst');
})


const questions={
  'question1':{'title':'へのん','questionImgUrl':'CF謎2.png', 'hint':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
}

async function makeHash(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

async function comparisonHash(text, questionName) {
  result = false;
  await makeHash(text).then(hash=>{
    if(hash == questions[questionName].answer){
      result= true;
    }
  })
  return result;
}

function getQuestionNames(){
  return Object.keys(questions);
}

function getQuestionProps(questionName){
  return {'title':questions[questionName].title,'questionImgUrl':questions[questionName].questionImgUrl,'hint':questions[questionName].hint};
}
