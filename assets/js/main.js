$(window).load(function() {

  $('.btn-close-info').on('click', function(){
    $(".mobile-info-toggle-box").prop( "checked", false );
  });

  $('.btn-close-nav').on('click', function(){
    $(".mobile-nav-toggle-box").prop( "checked", false );
  });

  $('.mobile-info-toggle-box').change(function() {
    if($(this).is(":checked")) {
      $(".mobile-nav-toggle-box").prop( "checked", false );
    }
  });

  $('.mobile-nav-toggle-box').change(function() {
    if($(this).is(":checked")) {
      $(".mobile-info-toggle-box").prop( "checked", false );
    }
  });

});
