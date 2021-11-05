import { comparisonHash, getQuestionNames, getQuestionProps } from './questionData.js';

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

