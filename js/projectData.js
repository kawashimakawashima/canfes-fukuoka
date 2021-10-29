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
  let projects = $.merge(sevenBigSchedules, sevenSmallSchedules, secondSchedules, onlineSchedules);
  for(let i = 0; i < numb; l++){
    let projectNumb=Math.floor(Math.random() * projects.length);
    result.push(projects.splice(projectNumb,1)); 
  }
  return result;
}

export {getSchedulesFromPraces, getRandomProject};
// ローカルだとcorsだかなんだかが出てテストできないので、いじる場合はまるっとコピペしてexport・importをコメントアウトするとやりやすい。