const sevenBigSchedules = [
  {"startTime":0.5,"duration":2,"column":0,"id":47302,"title":"へのラジコン","value":"ダンボールでハリボテを作ってラジコン化"}
]
const sevenSmallSchedules = [

]
const twoSchedules = [

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
      schedules = twoSchedules;
      headeres = ["二階"];
      break;
  }
  return schedules,headeres;
}

export default getSchedulesAndHeaderes;