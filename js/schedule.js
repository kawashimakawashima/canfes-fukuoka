import {getSchedulesFromPraces, isHolding} from "./projectData.js";

$(document).ready(function() {
  if(window.matchMedia("(max-width: 768px)").matches){
    skeduleFromData(getSchedulesFromPraces("stage"));
  }else{ 
    skeduleFromData(getSchedulesFromPraces("all"));
  
    // 常設展示のところだけずらす
    $($(".scheduler-main-colum")[2]).css({'margin-left':'21px'})
    $($(".scheduler-header")[2]).css({'margin-left':'20px'})
  
    $('#headerSelect').hide();
  }
  
  $("#headerSelect").change(function(){
    const str = $(this).val();
    skeduleFromData(getSchedulesFromPraces(str));
    
    // 常設展示の場合、時間関連は非表示
    if(str == 'constant'){
      $('#skeduler-container').addClass('onlyConstant');
    }else{
      $('#skeduler-container').removeClass('onlyConstant');  
    }
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
      $("#timeLine").css({"transform":"translateY("+((h-13+(mi/60))*102)+"px","display":"block"});
    }else{
      $("#timeLine").css({"display":"none"});
    }
  },60000);
});



function skeduleFromData(data){
  $("#skeduler-container").skeduler({
    headers: data[0],
    tasks: data[1],
    cardTemplate: '<div class="projectTitle ${isHasPage}">${title}</div><div>${value}</div><a class="projectLink" href="./projects/${url}.html">詳しくみる</a>',
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
