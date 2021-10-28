// socondとseven同居してるのあれだなぁ...
const sevenBigSchedules = [
  {"startTime":0.5,  "duration":0.5,"column":0,"id":1,
  "title":"こんなんだよ","url":"dayo","value":"へのへのがへのへのでへのへの"},
  {"startTime":0.75, "duration":1.5,"column":0,"id":2,
  "title":"こんなんです","url":"desu","value":"へのへのがへのへのでへのへの"},
  {"startTime":3,    "duration":1  ,"column":0,"id":3,
  "title":"こんなんらしい","url":"rasii","value":"へのへのがへのへのでへのへの"}

]
const sevenSmallSchedules = [

]
const secondSchedules = [

]
const onlineSchedules = [

]

function getSchedulesAndHeaderes(value) {
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

export default getSchedulesAndHeaderes;