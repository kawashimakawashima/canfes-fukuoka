import {getSchedulesFromPraces, isHolding} from "./projectData.js";


$(document).ready(function() {
  if(window.matchMedia("(max-width: 768px)").matches){
    skeduleFromData(getSchedulesFromPraces("sevenBig"));
  }else{ 
    skeduleFromData(getSchedulesFromPraces("all"));
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

  let now = new Date();
  $(".skeduler-main-body").append($("<div id='timeLine' style='display:none'></div>"));
  if(isHolding(now)) {
    let h = now.getHours();
    let mi = now.getMinutes();
    $("#timeLine").css({"transform":"translateY("+((h-13+(mi/60))*102)+"px","display":"absolute"});
  }
}


