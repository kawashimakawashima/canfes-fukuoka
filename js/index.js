const colors=["black","white","#ff007f"];

$(document).ready(function() {
  setInterval(function(){
    $($(".circles li")[1]).css("background", colors[Math.floor(Math.random() * colors.length)])
  },14000);
})