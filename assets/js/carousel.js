$(window).load(function(){

  if ( $('.carousel').html() != undefined) {

    $('.carousel').addClass('js-carousel-active');

    var slideNextItem = function(){
      var $currentElement = $('.js-carousel-item-active');
      var $nextElement = $('.js-carousel-item-active').next();
      if ( $nextElement.html() == undefined) {
        $nextElement = $('.carousel-items li').first();
      }
      $currentElement.removeClass('js-carousel-item-active');
      $nextElement.addClass('js-carousel-item-active');
      var pointer = $nextElement.data('image');
      $(".carousel-navigation li").removeClass('js-carousel-navigation-active');
      $(".carousel-navigation li[data-image='" + pointer + "']").addClass('js-carousel-navigation-active');
    }

    var slidePreviousItem = function(){
      var $currentElement = $('.js-carousel-item-active');
      var $prevElement = $('.js-carousel-item-active').prev();
      if ( $prevElement.html() == undefined) {
        $prevElement = $('.carousel-items li').last();
      }
      $currentElement.removeClass('js-carousel-item-active');
      $prevElement.addClass('js-carousel-item-active');
      var pointer = $prevElement.data('image');
      $(".carousel-navigation li").removeClass('js-carousel-navigation-active');
      $(".carousel-navigation li[data-image='" + pointer + "']").addClass('js-carousel-navigation-active');
    }

    $('.carousel-controls-next').on('click', function() {
      slideNextItem();
    });

    $('.carousel-controls-previous').on('click', function() {
      slidePreviousItem();
    });

    $('.carousel-navigation li').on('click', function() {
      var $currentElement = $('.js-carousel-item-active');
      var pointer = $(this).data('image');
      var $nextElement = $(".carousel-items li[data-image='" + pointer + "']");

      $('.carousel-navigation li').removeClass('js-carousel-navigation-active');
      $(this).addClass('js-carousel-navigation-active');
      $currentElement.removeClass('js-carousel-item-active');
      $nextElement.addClass('js-carousel-item-active');
    });

    $('.carousel').on("swiperight",function(){
      slideNextItem();
    });

    $('.carousel').on("swipeleft",function(){
      slidePreviousItem();
    });

    $('html').on('keydown', function(e){
      if($('.carousel').hasClass('js-carousel-active')) {
        e.preventDefault();
        if('39' == e.keyCode || '38' == e.keyCode) {
          slideNextItem();
        } else if('37' == e.keyCode || '40' == e.keyCode) {
          slidePreviousItem();
        }
      }
    });

    setInterval(function(){
      slideNextItem();
    }, 5000);

  }

});
