import {getSchedulesFromPraces, isHolding} from "./projectData.js";


$(document).ready(function() {
  if(window.matchMedia("(max-width: 768px)").matches){
    skeduleFromData(getSchedulesFromPraces("sevenBig"));
  }else{ 
    skeduleFromData(getSchedulesFromPraces("all"));
  
    // 常設展示のところだけずらす
    $($(".scheduler-main-colum")[2]).css({'margin-left':'20px'})
    $($(".scheduler-header")[2]).css({'margin-left':'20px'})
  
    $('#headerSelect').hide();
  }
  
  $("#headerSelect").change(function(){
    const str = $(this).val();
    skeduleFromData(getSchedulesFromPraces(str));
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
      $("#timeLine").css({"transform":"translateY("+((h-13+(mi/60))*102)+"px","display":"absolute"});
    }
  },60000);
});

function skeduleFromData(data){
  $("#skeduler-container").skeduler({
    headers: data[0],
    tasks: data[1],
    cardTemplate: '<div class="projectTitle">${title}</div><div>${value}</div><a class="projectLink" href="./projects/"+t["url"]+".html">詳しくみる</a>',
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

/*

const stageSchedules = [
  {"startTime":0.5 , "duration":0.5, "column":0, "id":1,
  "title":"こんなんだよ",  "url":"demo-dayo",  "iconUrl":"への島太郎", "value":"へのへのがへのへのでへのへの"},
  {"startTime":0.75, "duration":1.5, "column":0, "id":2,
  "title":"こんなんです",  "url":"demo-desu",  "iconUrl":"ヘブと"   , "value":"へのへのがへのへのでへのへの"},
  {"startTime":3   ,  "duration":1 , "column":0, "id":3,
  "title":"こんなんらしい", "url":"demo-rasii", "iconUrl":"への木"  , "value":"へのへのがへのへのでへのへの"}
  
]
const boothSchedules = [

]
const constantSchedules = [
  {"startTime":10 , "duration":1, "column":2, "id":4,
  "title":"こんなん",  "url":"demo-dayo",  "iconUrl":"への島太郎", "value":"へのへのが"},
]

function getSchedulesFromPraces(value) {
  let schedules = [];
  let headeres = [];
  switch(value){
    case "all":
      schedules = $.merge(schedules, stageSchedules);
      schedules = $.merge(schedules, boothSchedules);
      schedules = $.merge(schedules, constantSchedules);
      headeres = ["ステージ", "ブース", "常設展示"];
      break;
  }
  return [headeres,schedules];
}
function getRandomProject(numb) {
  let result=[];
  let projects = sevenBigSchedules.concat(sevenSmallSchedules, secondSchedules, onlineSchedules);
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

//export {getSchedulesFromPraces, getRandomProject, isHolding, getNowProjects};

// ローカルだとcorsだかなんだかが出てテストできないので、いじる場合はまるっとjsにコピペしてexport・importをコメントアウト＆htmlの<script type=module>⇨<script>でやるといい感じ