$(document).ready(function() {
  $(".dropDown").hide();

  console.log($(".dropDownButton"));
  $(".dropDownButton").on('click', function() {
    $(".dropDown").show();
  });
  $(document).on('click touchend', function(event) {
    if (!$(event.target).closest('body').length) {
      $(".dropDown").hide();
    }
  });
})
