import { comparisonHash, getQuestionNames, getQuestionProps } from './questionData.js';

const colors=['black','white','#ff007f'];

let questionName;
$(document).ready(function() {
/*
  setInterval(function(){
    $($('.circles li')[1]).css('background', colors[Math.floor(Math.random() * colors.length)])
  },14000);
  */

  const questionNames = getQuestionNames();
  let noCorrectedNumb = 0;
  for(let i = 0; i < questionNames.length; i++){
    if(sessionStorage.getItem(questionNames[i]) == 'false'){
      console.log('あ');
      noCorrectedNumb++;
    }
  }
  $('#remainingNumb').text(noCorrectedNumb);

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
        noCorrectedNumb--;
        $('#remainingNumb').text(noCorrectedNumb);
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
  for(let i = 0; i < questionNames.length; i++){
    sessionStorage.setItem(questionNames[i], 'false');
  }
}
  const data = sessionStorage.getItem('isFirst');
})