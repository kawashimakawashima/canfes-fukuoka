$(document).ready(function() {
  $(document).on('click',function(e){
    console.log();
    if($(e.target).hasClass("dropDownButton")){
      $(".dropDown").show();
    }else{
      $('.dropDown').hide();
    }
  });
})
