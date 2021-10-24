import getSchedulesAndHeaderes from "./scheduleData.js";

$(document).ready(function() {
  if(window.matchMedia("(max-width: 768px)").matches){
    skeduleFromData(getSchedulesAndHeaderes("all"));
  }else{ 
    skeduleFromData(getSchedulesAndHeaderes("sevenBig"));
  }
  
  $("#headerSelect").change(function(){
    const str = $(this).val();
    skeduleFromData(getSchedulesAndHeaderes(str));
  });
});

function skeduleFromData(schedules,headeres){
  $("#skeduler-container").skeduler({
    headers: headeres,
    tasks: schedules,
    cardTemplate: '<div>${title}</div><div>${value}</div>',
    onClick: function (e, t) {
      window.location.href = "./projects/"+t["url"];
    }
  });
}