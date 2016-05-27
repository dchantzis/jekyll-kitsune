$(window).load(function(){

  if($('.enable-slideshow').length > 0) {
    $('.enable-slideshow').removeClass('hidden');

    $('.enable-slideshow').on('click', function() {
      $('.slideshow-container').addClass('js-slideshow-container-fade');
    });
  }

  if($('.slideshow').length > 0) {

    $('.slideshow-images li').first().addClass('js-slideshow-image-selected');
    $('.slideshow-navigation li').first().addClass('js-slideshow-navigation-selected');

    $(".slideshow-images img").each(function(){
      if ($(this).width() < $(this).height()) {
        $(this).addClass("vertical");
      }

    });

    $('.btn-close-slideshow').on('click', function(){
      closeSlideshow();
    });

    var closeSlideshow = function() {
      $(".slideshow-images li").removeClass('js-slideshow-image-selected');
      $('.slideshow-container').removeClass('js-slideshow-container-fade');
    }

    var openNextImage = function() {
      var $currentElement = $('.js-slideshow-image-selected');
      var $nextElement = $('.js-slideshow-image-selected').next();
      if ( $nextElement.html() == undefined) {
        $nextElement = $('.slideshow-images li').first();
      }
      $currentElement.removeClass('js-slideshow-image-selected');
      $nextElement.addClass('js-slideshow-image-selected');
      var pointer = $nextElement.data('image');
      $(".slideshow-navigation li").removeClass('js-slideshow-navigation-selected');
      $(".slideshow-navigation li[data-image='" + pointer + "']").addClass('js-slideshow-navigation-selected');
    }

    var openPreviousImage = function() {
      var $currentElement = $('.js-slideshow-image-selected');
      var $prevElement = $('.js-slideshow-image-selected').prev();
      if ( $prevElement.html() == undefined) {
        $prevElement = $('.slideshow-images li').last();
      }
      $currentElement.removeClass('js-slideshow-image-selected');
      $prevElement.addClass('js-slideshow-image-selected');
      var pointer = $prevElement.data('image');
      $(".slideshow-navigation li").removeClass('js-slideshow-navigation-selected');
      $(".slideshow-navigation li[data-image='" + pointer + "']").addClass('js-slideshow-navigation-selected');
    }

    $('.slideshow-controls-next').on('click', function() {
      openNextImage();
    });

    $('.slideshow-controls-previous').on('click', function() {
      openPreviousImage();
    });

    $('.slideshow-navigation li').on('click', function() {
      var $currentElement = $('.js-slideshow-image-selected');
      var pointer = $(this).data('image');
      var $nextElement = $(".slideshow-images li[data-image='" + pointer + "']");

      $('.slideshow-navigation li').removeClass('js-slideshow-navigation-selected');
      $(this).addClass('js-slideshow-navigation-selected');
      $currentElement.removeClass('js-slideshow-image-selected');
      $nextElement.addClass('js-slideshow-image-selected');
    });

    $('html').on('keydown', function(e){
      if($('.slideshow-container').hasClass('js-slideshow-container-fade')) {
        if('39' == e.keyCode || '38' == e.keyCode) {
          e.preventDefault();
          openNextImage();
        } else if('37' == e.keyCode || '40' == e.keyCode) {
          e.preventDefault();
          openPreviousImage();
        } else if('13' == e.keyCode || '27' == e.keyCode) {
          e.preventDefault();
          closeSlideshow();
        }
      }
    });

    $('html').on("swiperight",function(){
      openNextImage();
    });

    $('html').on("swipeleft",function(){
      openNextImage();
    });

  }

});
