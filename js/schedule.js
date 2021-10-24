import getSchedulesAndHeaderes from "./scheduleData.js";


$(document).ready(function() {
  if(window.matchMedia("(max-width: 768px)").matches){
    skeduleFromData(getSchedulesAndHeaderes("sevenBig"));
  }else{ 
    skeduleFromData(getSchedulesAndHeaderes("all"));
    $('#headerSelect').hide();
  }
  
  $("#headerSelect").change(function(){
    const str = $(this).val();
    skeduleFromData(getSchedulesAndHeaderes(str));
  });
});

function skeduleFromData(data){
  $("#skeduler-container").skeduler({
    headers: data[0],
    tasks: data[1],
    cardTemplate: '<div class="projectTitle">${title}</div><div>${value}</div>',
    onClick: function (e, t) {
      window.location.href = "./projects/demo-"+t["url"]+".html";
    }
  });
}