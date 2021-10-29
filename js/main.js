import getRandomProject from "./projectData.js";

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
});