//import {getSchedulesFromPraces, isHolding} from "./projectData.js";

$(document).ready(function() {
  if(window.matchMedia("(max-width: 768px)").matches){
    skeduleFromData(getSchedulesFromPraces("stage"));
  }else{ 
    skeduleFromData(getSchedulesFromPraces("all"));
  
    // 常設展示のところだけずらす
    $($(".scheduler-main-colum")[2]).css({'margin-left':'21px'})
    $($(".scheduler-header")[2]).css({'margin-left':'20px'})
  
    $('#headerSelect').hide();
  }
  
  $("#headerSelect").change(function(){
    const str = $(this).val();
    skeduleFromData(getSchedulesFromPraces(str));
    
    // 常設展示の場合、時間関連は非表示
    if(str == 'constant'){
      $('#skeduler-container').addClass('onlyConstant');
    }else{
      $('#skeduler-container').removeClass('onlyConstant');  
    }
  });

  $("#testButton").click(function(){
    let date = new Date($("#testDate").val());
    let times = $("#testTime").val().split(':');
    date.setHours(times[0]);
    date.setMinutes(times[1]);
    if(isHolding(date)) {
      let h = date.getHours();
      let mi = date.getMinutes();
      $("#timeLine").css({"transform":"translateY("+((h-13+(mi/60))*102)+"px","display":"block"});
    }else{
      $("#timeLine").css({"display":"none"});
    }
    });

  setInterval(function(){
    let now = new Date();
    if(isHolding(now)) {
      let h = now.getHours();
      let mi = now.getMinutes();
      $("#timeLine").css({"transform":"translateY("+((h-13+(mi/60))*102)+"px","display":"block"});
    }else{
      $("#timeLine").css({"display":"none"});
    }
  },60000);
});



function skeduleFromData(data){
  $("#skeduler-container").skeduler({
    headers: data[0],
    tasks: data[1],
    cardTemplate: '<div class="projectTitle">${title}</div><div>${value}</div><a class="projectLink" href="./projects/${url}.html">詳しくみる</a>',
    onClick: function (e, t) {
    //  window.location.href = "./projects/"+t["url"]+".html";  
    }
  });

  // 今の時間のところに線を引く
  let now = new Date();
  $(".skeduler-main-body").append($("<div id='timeLine' style='display:none'></div>"));
    if(isHolding(now)) {
      let h = now.getHours();
      let mi = now.getMinutes();
      $("#timeLine").css({"transform":"translateY("+((h-13+(mi/60))*102)+"px","display":"absolute"});
    }
}





const stageSchedules = [
  {"startTime":0 , "duration":0.16, "id":1,
  "title":"オープニング",  "url":"opening",  "iconUrl":"", "value":""},
  {"startTime":0.25 , "duration":0.08, "id":2,
  "title":"ピタゴラスイッチ",  "url":"pythagora",  "iconUrl":"", "value":""},
  {"startTime":0.5 , "duration":0.25, "id":3,
  "title":"職員バンド",  "url":"staffBand",  "iconUrl":"", "value":""},
  {"startTime":0.92 , "duration":0.25, "id":4,
  "title":"TAバンド",  "url":"opening",  "iconUrl":"", "value":""},
  {"startTime":1.32 , "duration":0.25, "id":5,
  "title":"今日好き再現",  "url":"likeToday",  "iconUrl":"", "value":""},
  {"startTime":1.84 , "duration":0.16, "id":6,
  "title":"バイオリンとギター演奏",  "url":"violinAndGuiter",  "iconUrl":"", "value":""},
  {"startTime":2.16 , "duration":0.16, "id":7,
  "title":"太川さん企画",  "url":"tagawa",  "iconUrl":"", "value":""},
  {"startTime":2.84 , "duration":0.5, "id":8,
  "title":"マジック",  "url":"magic",  "iconUrl":"", "value":""},
  {"startTime":3.5 , "duration":0.16, "id":9,
  "title":"射的表彰",  "url":"shootingAwards",  "iconUrl":"", "value":""},
  {"startTime":3.84 , "duration":0.16, "id":8,
  "title":"エンディング",  "url":"ending",  "iconUrl":"", "value":""},
]
const boothSchedules = [
  
]
const constantSchedules = [
  {"startTime":0  , "duration":0.5, "id":21,
  "title":"一日中カラオケできるコーナー",  "url":"karaoke",  "iconUrl":"", "value":""},
  {"startTime":0.5, "duration":0.5, "id":22,
  "title":"へのへのでキャンパスを埋め尽くしたい",  "url":"henoheno",  "iconUrl":"への島太郎", "value":"へのへのが"},
  {"startTime":1  , "duration":0.5, "id":23,
  "title":"馬が主催の射的大会",  "url":"shooting",  "iconUrl":"", "value":""},
  {"startTime":1.5, "duration":0.5, "id":24,
  "title":"絵の展示ブース",  "url":"picture",  "iconUrl":"", "value":""},
  {"startTime":2  , "duration":0.5, "id":25,
  "title":"VR体験会",  "url":"vr",  "iconUrl":"", "value":""},
  {"startTime":2.5, "duration":0.5, "id":26,
  "title":"剪紙製作・展示",  "url":"paperCutting",  "iconUrl":"", "value":""},
  {"startTime":3  , "duration":0.5, "id":27,
  "title":"バイオリン体験",  "url":"violin",  "iconUrl":"", "value":""},  
]

function getSchedulesFromPraces(value) {
  let schedules = [];
  let headeres = [];
  switch(value){
    case "all":
      schedules = $.merge(schedules,stageSchedules.map(function(elemnt) {
        elemnt.column = 0;
        return elemnt;
      }));
      schedules = $.merge(schedules,boothSchedules.map(function(elemnt) {
        elemnt.column = 1;
        return elemnt;
      }));
      schedules = $.merge(schedules,constantSchedules.map(function(elemnt) {
        elemnt.column = 2;
        return elemnt;
      }));
      
      headeres = ["ステージ", "ブース", "常設展示"];
      break;
    case "stage":  
      schedules = stageSchedules.map(function(elemnt) {elemnt.column = 0; return elemnt;});
      headeres = ["ステージ"];
      break;
    case "booth":  
      schedules = boothSchedules.map(function(elemnt) {elemnt.column = 0; return elemnt;});
      headeres = ["ブース"];
      break;
    case "constant":  
      schedules = constantSchedules.map(function(elemnt) {elemnt.column = 0; return elemnt;});
      headeres = ["常設展示"];
      break;
  
  }
  console.log(schedules)
  return [headeres,schedules];
}

function getRandomProject(numb) {
  let result=[];
  let projects=[];
  projects = $.merge(projects,stageSchedules);
  projects = $.merge(projects,boothSchedules);
  projects = $.merge(projects,constantSchedules);
  
  for(let i = 0; i < numb; i++){
    let projectNumb=Math.floor(Math.random() * projects.length);
    result.push(projects.splice(projectNumb,1)[0]); 
  }
  return result;
}

const Xday = "2021-12-05";

function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

function isHolding(date) {
  let formatedDate = formatDate(date);
  if(formatedDate==Xday){
    let time = date.getHours()*60+date.getMinutes()
    if(time >= 13*60+0 && time <= 18*60+0){
      return true;
    }
  }

  return false;
}
/*
function getNowProjects(date) {
  let result=[];
  if(isHolding(date)){
    let nowTime = date.getHours()*60+date.getMinutes();
    for(let i = 0; i < sevenBigSchedules.length; i++){
      if(nowTime < (13+sevenBigSchedules[i].startTime)*60){
        break;
      }else{
        if((13+sevenBigSchedules[i].startTime+sevenBigSchedules[i].duration)*60 > nowTime){
          result.push(sevenBigSchedules[i]);
        }
      }
    }
    for(let i = 0; i< sevenSmallSchedules.length; i++){
      if(nowTime < (13+sevenSmallSchedules[i].startTime)*60){
        break;
      }else{
        if((13+sevenSmallSchedules[i].startTime+sevenSmallSchedules[i].duration)*60 > nowTime){
          result.push(sevenSmallSchedules[i]);
        }
      }
    }
    for(let i = 0; i< secondSchedules.length; i++){
      if(nowTime < (13+secondSchedules[i].startTime)*60){
        break;
      }else{
        if((13+secondSchedules[i].startTime+secondSchedules[i].duration)*60 > nowTime){
          result.push(secondSchedules[i]);
        }
      }
    }
    for(let i = 0; i< onlineSchedules.length; i++){
      if(nowTime < (13+onlineSchedules[i].startTime)*60){
        break;
      }else{
        if((13+onlineSchedules[i].startTime+onlineSchedules[i].duration)*60 > nowTime){
          result.push(onlineSchedules[i]);
        }
      }
    }
  }

  return result;
}
*/
// 魂の
//export default null;

//export {getSchedulesFromPraces, getRandomProject, isHolding};

// ローカルだとcorsだかなんだかが出てテストできないので、いじる場合はまるっとjsにコピペしてexport・importをコメントアウト＆htmlの<script type=module>⇨<script>でやるといい感じ