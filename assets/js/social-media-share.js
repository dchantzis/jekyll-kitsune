if($('.social-btns').length > 0) {
    $('.social-btn').on('click', function(e){
        e.preventDefault();
        socialURL = $(this).attr('href');
        //encodeURIComponent(social_url)
        window.open(
          socialURL,
          '',
          'status=1, width=550,height=420');

        return false;
    });
}
