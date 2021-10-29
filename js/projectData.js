
// socondとseven同居してるのあれだなぁ...
const sevenBigSchedules = [
  {"startTime":0.5 , "duration":0.5, "column":0, "id":1,
  "title":"こんなんだよ",  "url":"demo-dayo",  "iconUrl":"への島太郎", "value":"へのへのがへのへのでへのへの"},
  {"startTime":0.75, "duration":1.5, "column":0, "id":2,
  "title":"こんなんです",  "url":"demo-desu",  "iconUrl":"ヘブと"   , "value":"へのへのがへのへのでへのへの"},
  {"startTime":3   ,  "duration":1 , "column":0, "id":3,
  "title":"こんなんらしい", "url":"demo-rasii", "iconUrl":"への木"  , "value":"へのへのがへのへのでへのへの"}

]
const sevenSmallSchedules = [

]
const secondSchedules = [

]
const onlineSchedules = [

]

function getSchedulesFromPraces(value) {
  let schedules = [];
  let headeres = [];
  switch(value){
    case "all":
      schedules = $.merge(sevenBigSchedules, sevenSmallSchedules, secondSchedules, onlineSchedules);
      headeres = ["七階大教室", "七階小教室", "二階", "オンライン"];
      break;
    case "sevenBig":
      schedules = sevenBigSchedules;
      headeres = ["七階大教室"];
      break;
    case "sevenSmall":
      schedules = sevenSmallSchedules;
      headeres = ["七階小教室"];
      break;
    case "second":
      schedules = secondSchedules;
      headeres = ["二階"];
      break;
    case "online":
      schedules = onlineSchedules;
      headeres = ["オンライン"];
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
// 魂の
export default null;

export {getSchedulesFromPraces, getRandomProject, isHolding, getNowProjects};

// ローカルだとcorsだかなんだかが出てテストできないので、いじる場合はまるっとjsにコピペしてexport・importをコメントアウト＆htmlの<script type=module>⇨<script>でやるといい感じ