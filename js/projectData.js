
const stageSchedules = [
  {"startTime":0 , "duration":0.16, "id":1,
  "title":"オープニング",  "url":"opening", "value":"13:00〜13:10  ","iconUrl":"", "isHasPage":""},
  {"startTime":0.25 , "duration":0.08, "id":2,
  "title":"ピタゴラスイッチ",  "url":"pythagora", "value":"13:15〜13:20","iconUrl":"pythagora.jpg", "isHasPage":"having"},
  {"startTime":0.5 , "duration":0.25, "id":3,
  "title":"職員バンド",  "url":"staffBand", "value":"13:30〜13:45","iconUrl":"", "isHasPage":""},
  {"startTime":0.92 , "duration":0.25, "id":4,
  "title":"TAバンド",  "url":"opening", "value":"13:55〜14:10  ","iconUrl":"", "isHasPage":""},
  {"startTime":1.32 , "duration":0.25, "id":5,
  "title":"今日好き再現",  "url":"likeToday", "value":"14:20〜14:35","iconUrl":"", "isHasPage":""},
  {"startTime":1.84 , "duration":0.16, "id":6,
  "title":"バイオリン演奏",  "url":"violin", "value":"14:50〜15:00","iconUrl":"violin.jpg", "isHasPage":"having"},
  {"startTime":2.16 , "duration":0.16, "id":7,
  "title":"田川さん企画",  "url":"tagawa", "value":"15:10〜15:20","iconUrl":"", "isHasPage":""},
  {"startTime": 2.5, "duration":0.08, "id":8,
  "title":"SAXデュエット",  "url":"sax", "value":"15:30〜15:35","iconUrl":"", "isHasPage":""},
  {"startTime":2.84 , "duration":0.5, "id":9,
  "title":"マジック",  "url":"magic", "value":"15:50〜16:20  ","iconUrl":"magic.jpg", "isHasPage":"having"},
  {"startTime":3.5 , "duration":0.16, "id":10,
  "title":"射的表彰",  "url":"horseShooting", "value":"16:30~16:40  ","iconUrl":"horseShooting.jpeg", "isHasPage":"having"},
  {"startTime":3.84 , "duration":0.16, "id":10,
  "title":"エンディング",  "url":"ending", "value":"16:50〜17:00","iconUrl":"", "isHasPage":""},
]
const boothSchedules = [
  {"startTime":0.4  , "duration":0.08  , "id":11,
  "title":"バイオリン教室",  "url":"violin", "value":"13:25~13:30","iconUrl":"violin.jpg", "isHasPage":"having"},
  {"startTime":0.84  , "duration":0.08, "id":12,
  "title":"絵の展示",  "url":"karaoke", "value":"13:50~13:55","iconUrl":"", "isHasPage":""},
  {"startTime":1.32  , "duration":0.08, "id":13,
  "title":"へのへのもへじ",  "url":"karaoke", "value":"14:15~14:20","iconUrl":"", "isHasPage":""},
  {"startTime":1.64  , "duration":0.08, "id":13,
  "title":"剪紙製作・展示",  "url":"paperCutting", "value":"14:40~14:45","iconUrl":"paperCutting.jpg", "isHasPage":"having"},
  {"startTime":1.92  , "duration":0.08, "id":14,
  "title":"VR",  "url":"karaoke", "value":"14:55~15:00","iconUrl":"", "isHasPage":""},
  {"startTime":2.08  , "duration":0.08, "id":14,
  "title":"射的",  "url":"horseShooting", "value":"15:05~15:10","iconUrl":"horseShooting.jpeg", "isHasPage":"having"},
  {"startTime":2.32  , "duration":0.08, "id":14,
  "title":"からおけ",  "url":"karaoke", "value":"15:40~15:45","iconUrl":"karaoke.png", "isHasPage":"having"}
]
const constantSchedules = [
  {"startTime":0  , "duration":0.5, "id":21,
  "title":"一日中カラオケできるコーナー",  "url":"karaoke", "value":"だれでも飛び入り参加OK、採点ランキングなし、ただのんびり歌うだけのブースです。","iconUrl":"karaoke.png", "isHasPage":"having"},
  {"startTime":0.5, "duration":0.5, "id":22,
  "title":"へのへのでキャンパスを埋め尽くしたい",  "url":"henoheno",  "iconUrl":"への島太郎.png", "value":"<h6>への<data class='popupButton' value='CFNazo_mDhQae'><span class='sentence effectAlpha'>へ</span><span class='sentence effectTop'>へ</span><span class='sentence effectBottom'>へ</span></data><span>の</span></h6>", "isHasPage":""},
  {"startTime":1  , "duration":0.5, "id":23,
  "title":"馬が主催の射的大会",  "url":"horseShooting", "value":"みんな！射的をやろう！射的の大会もあるぞ！優勝者には豪華景品が！","iconUrl":"horseShooting.jpeg", "isHasPage":"having"},
  {"startTime":1.5, "duration":0.5, "id":24,
  "title":"絵の展示ブース",  "url":"picture", "value":"","iconUrl":"", "isHasPage":""},
  {"startTime":2  , "duration":0.5, "id":25,
  "title":"VR体験会",  "url":"vr", "value":"","iconUrl":"", "isHasPage":""},
  {"startTime":2.5, "duration":0.5, "id":26,
  "title":"剪紙製作・展示",  "url":"paperCutting", "value":"中国の伝統的な民族芸術「剪紙（せんし）」をキャンパスの皆さんと制作しました！","iconUrl":"paperCutting.jpg", "isHasPage":"having"},
  {"startTime":3  , "duration":0.5, "id":27,
  "title":"バイオリン体験",  "url":"violin", "value":"","iconUrl":"violin.jpg", "isHasPage":"having"},  
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
      
      headeres = ["配信(ステージ)", "配信(ブース)", "常設展示"];
      break;
    case "stage":  
      schedules = stageSchedules.map(function(elemnt) {elemnt.column = 0; return elemnt;});
      headeres = ["配信(ステージ)"];
      break;
    case "booth":  
      schedules = boothSchedules.map(function(elemnt) {elemnt.column = 0; return elemnt;});
      headeres = ["配信(ブース)"];
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
  projects = $.merge(projects,constantSchedules);
  
  for(let i = 0; i < numb; i++){
    let projectNumb=Math.floor(Math.random() * projects.length);
    for(let j = 0; j < 20; j++){
      projectNumb=Math.floor(Math.random() * projects.length);
      if(projects[projectNumb].isHasPage==="having") {
        result.push(projects.splice(projectNumb,1)[0]); 
        break;
      }else{
        projects.splice(projectNumb,1)[0];
        console.log(projects)
      }
      if(projects.length < 1){
        return result;
      }
    }
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
export default null;

export {getSchedulesFromPraces, getRandomProject, isHolding};

// ローカルだとcorsだかなんだかが出てテストできないので、いじる場合はまるっとjsにコピペしてexport・importをコメントアウト＆htmlの<script type=module>⇨<script>でやるといい感じ