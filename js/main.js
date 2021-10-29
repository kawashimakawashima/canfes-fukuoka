import {getRandomProject, getNowProjects} from "./projectData.js";

$(document).ready(function() {
  const randomProjects = getRandomProject(3);
  for(let i = 0; i < randomProjects.length; i++){
  $("#randomList").append($(
      '<div class="randomProject"><a href="./projects/' + 
      randomProjects[i].url +'.html">'+ randomProjects[i].title +
      '</a><img src="../images/projects/icons/' +
      randomProjects[i].iconUrl+'.png"></img></div>'
    ));
  }
  

  const nowProjects = getNowProjects(new Date());
  for(let i = 0; i < nowProjects.length; i++){
    $("#nowList").append($(
      '<div class="nowProject"><a href="./projects/' + 
      nowProjects[i].url +'.html">'+ nowProjects[i].title +
      '</a><img src="../images/projects/icons/' +
      nowProjects[i].iconUrl+'.png"></img></div>'
    ));
  }

  $("#testButton").click(function(){
    let date = new Date($("#testDate").val());
    let times = $("#testTime").val().split(':');
    date.setHours(times[0]);
    date.setMinutes(times[1]);
    
    const nowProjects = getNowProjects(date);
    for(let i = 0; i < nowProjects.length; i++){
      $("#nowList").append($(
        '<div class="nowProject"><a href="./projects/' + 
        nowProjects[i].url +'.html">'+ nowProjects[i].title +
        '</a><img src="../images/projects/icons/' +
        nowProjects[i].iconUrl+'.png"></img></div>'
      ));
    }
  });
});