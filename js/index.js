//import { comparisonHash, getQuestionNames, getQuestionProps } from './questionData.js';

const colors=['black','white','#ff007f'];

let questionName;
$(document).ready(function() {
  init();
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
    $('#questionPopup img').attr('src','../images/questions/'+questionName+'.png');
    $('#hint1Button').text('ヒント1を表示');
    $('#hint2Button').text('ヒント2を表示');
    $('#hint1 .hintText').text(prop.hint1);
    $('#hint2 .hintText').text(prop.hint2);
    $('#hint2').removeClass('active');
    $('#hint1Button').removeClass('active');
    $('#hint2Button').removeClass('active');
    console.log($('#hint1 .hintText'));

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
  $('#hint1Button').on('click', function(){
    if($('#hint1 .hintText').hasClass('active')){
      $('#hint1 .hintText').removeClass('active');
      $('#hint2').removeClass('active');
      $('#hint1Button').text('ヒント1を表示');
    }else{
      $('#hint1 .hintText').addClass('active');
      $('#hint2').addClass('active');
      $('#hint1Button').text('ヒント1を非表示');
    }
  });
  $('#hint2Button').on('click', function(){
    if($('#hint2 .hintText').hasClass('active')){
      $('#hint2 .hintText').removeClass('active');
      $('#hint2Button').text('ヒント2を表示');
    }else{
      $('#hint2 .hintText').addClass('active');
      $('#hint2Button').text('ヒント2を非表示');
    }
  });

  $('#qPopupClose').on('click',function(){
    $('#questionPopup').removeClass('active');
    $('.hintText').removeClass('active');
    $('#hint2').removeClass('active');
  });
  if(sessionStorage.getItem('isFirst') != 'false') {
    sessionStorage.setItem('isFirst', 'false');
    for(let i = 0; i < questionNames.length; i++){
      sessionStorage.setItem(questionNames[i], 'false');
    }
  }
  const data = sessionStorage.getItem('isFirst');

});

$(function () {
  $(window).scroll(function () {
    const wHeight = $(window).height();
    const scrollAmount = $(window).scrollTop();
    $('.scrollanime').each(function () {
      const targetPosition = $(this).offset().top;
      if(scrollAmount > targetPosition - wHeight + 60) {
            console.log("あ");
              $(this).addClass("fadeInDown");
          }
      });
  });
});


/* 以下ページ下の波用関数等。完全コピペですはい。 */

var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#blue', '#aua', '#4094ff']);//重ねる波の色設定
    /*
    // canvas2個めの色指定
    canvasList.push(document.getElementById("waveCanvas2"));
    colorList.push(['#43c0e4']);
    
    // canvas3個めの色指定
    canvasList.push(document.getElementById("waveCanvas3"));
    colorList.push(['#fff']);
*/
    // 各キャンバスの初期化
    for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 200;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
    update();
}

function update() {
    for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
    // 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波の重なりを描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 0.5, 3, 0);
  drawWave(canvas, color[1], 0.4, 2, 250);
  drawWave(canvas, color[2], 0.2, 1.6, 100);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (let i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}





const questions={
  'CFNazo_Cky54C' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_Ds9yeA' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_GrkAhm' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_HaDiL5' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_i57t63' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_mDhQae' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_nBXLMF' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_s2QZ62' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_tAU2FQ' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_wsFEgB' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
}

async function makeHash(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

async function comparisonHash(text, questionName) {
  let result = false;
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
  return {'questionImgUrl':questions[questionName].questionImgUrl,'hint1':questions[questionName].hint1,'hint2':questions[questionName].hint2};
}

//export {makeHash, comparisonHash, getQuestionNames, getQuestionProps};