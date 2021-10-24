// socondとseven同居してるのあれだなぁ...
const sevenBigSchedules = [
  {"startTime":0.5,  "duration":0.5,"column":0,"id":00001,
  "title":"こんなんだよ","url":"dayo","value":"ダンボールでハリボテを作ってラジコン化"},
  {"startTime":0.75, "duration":1.5,"column":1,"id":00002,
  "title":"こんなんです","url":"desu","value":"ダンボールでハリボテを作ってラジコン化"},
  {"startTime":3,    "duration":1  ,"column":0,"id":00003,
  "title":"こんなんらしい","url":"rasii","value":"ダンボールでハリボテを作ってラジコン化"}

]
const sevenSmallSchedules = [

]
const secondSchedules = [

]

function getSchedulesAndHeaderes(value) {
  let schedules = [];
  let headeres = [];
  switch(value){
    case "all":
      schedules = $.merge(sevenBigSchedules, sevenSmallSchedules, twoSchedules);
      headeres = ["七階大教室", "七階小教室", "二階"];
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
  }
  return schedules,headeres;
}

export default getSchedulesAndHeaderes;