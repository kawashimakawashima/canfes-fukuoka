const colors=["black","white","#ff007f"];

$(document).ready(function() {
  setInterval(function(){
    $($(".circles li")[1]).css("background", colors[Math.floor(Math.random() * colors.length)])
  },14000);

  $('.popupButton').on('click',function(){
    console.log($('.popup.'+$(this).val()));
    $('.popup.'+$(this).val()).addClass('active');
});
  
$('.close').on('click',function(){
    $('.popup.'+$(this).val()).removeClass("active");
});
})