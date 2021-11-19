$(document).ready(function() {
  $(document).on('click',function(e){
    console.log();
    if($(e.target).hasClass("dropDownButton")){
      $(".dropDown").show();
    }else{
      $('.dropDown').hide();
    }
  });

  //なんか動かんかったから手動のnavbar
  $('.navbar-toggler').on('click',function(){
    $('#navmenu1').toggle();
  });

})
