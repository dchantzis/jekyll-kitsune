$(window).load(function(){

  var $form = $('.form-site-search');

  if ( $form.html() != undefined) {

    var jsonFile = '/assets/json/search-data.json';
    window.searchContent = $.getJSON(jsonFile);

    $('.btn-close-search').on('click', function(){
      $('.form-site-search input.term').val('');
      emptyResultsContainer('predictive');
    });

    if( $('section.search').html != undefined ) {
      $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return results[1] || 0;
        }
      }

      var searchTerm = $.urlParam('term');

      if(searchTerm == 0 ||  searchTerm == null) {
        searchTerm = 'Search...';
      }
      if(searchTerm != 0 && searchTerm != null) {
        searchResults(decodeURIComponent(searchTerm).replace("+", " "), '');
      }

    }

    $('.btn-search').on('click', function(){
      var formId = $(this).closest('form').attr('id')
      $('#'+formId).attr("action", "/search-results/?term="+$(this).prev('input.term').val()).submit();
    });

  $('input#term').keyup(function(e) {
    var $this = $(this);
    var formId = $this.closest('form').attr('id');
    if (e.which == 13) {
      e.preventDefault();
      $('#'+formId).attr("action", "/search-results/?term="+$this.val()).submit();
    } else {
      if($this.val().trim().length >= 3) {
        thread = setTimeout(function(){searchResults($this.val(), 'predictive')}, 500);
      } else {
        emptyResultsContainer('predictive');
      }
    }

});


function searchResults(term, type){

  term = term.toLowerCase().trim();

  if(term.length < 3) {
    return 0;
  }

  var regExTermAny = new RegExp( '('+term+')', 'gi');
  var posts = [];
  var pages = [];
  var found = null;

  window.searchContent.then(function(loaded_data){
    $.each(loaded_data, function(index, value){

        found = false;

        tempTitle = value.title.toLowerCase().trim();
        tempSummary = value.summary.toLowerCase().trim();
        tempContent = value.content.toLowerCase().trim();

        if(tempTitle.indexOf(term) >= 0 ) {
          found = true;
          tempTitle = tempTitle.replace(regExTermAny, "<em>$1</em>");
        }
        if(tempSummary.indexOf(term) >= 0) {
          found = true;
          tempSummary = tempSummary.replace(regExTermAny, "<em>$1</em>");
        }
        if(tempContent.indexOf(term) >=0 ) {
          found = true;
          tempContent = tempContent.replace(regExTermAny, "<em>$1</em>");
        }
        if(found){
          if('post' == value.type.toLowerCase()) {
            posts.push({label : tempTitle, value : value.url});
          } else {
            pages.push({label : tempTitle, value : value.url});
          }
        }
      });

      emptyResultsContainer(type);
      displayResults(posts, pages, term, type);

    });
}


function emptyResultsContainer(type) {

  var containerElementPrefix = (type == 'predictive') ? '.search-results-container ' : '.page-search-results-container ';

  $(containerElementPrefix+'.search-results-count .counter').html('0');
  $(containerElementPrefix+'.search-results-count .term').html('0');
  $(containerElementPrefix).addClass('hidden');
  $(containerElementPrefix+'.search-no-results-text').addClass('hidden');
  $(containerElementPrefix+'.search-results-posts').addClass('hidden');
  $(containerElementPrefix+'.search-results-pages').addClass('hidden');
  $(containerElementPrefix+'.search-results-posts ul').empty();
  $(containerElementPrefix+'.search-results-pages ul').empty();
}

function displayResults(posts, pages, searchTerm, type){

  var containerElementPrefix = ('predictive' == type) ? '.search-results-container ' : '.page-search-results-container ';

  var resultsCount = posts.length + pages.length;

  $(containerElementPrefix).removeClass('hidden');
  $(containerElementPrefix+'.search-results-count .counter').html(resultsCount);
  $(containerElementPrefix+' .term').html(searchTerm);

  if('predictive' != type) {
    $('.search-results .page-title').html('Search results for '+'"<em class="term">'+searchTerm+'</em>"');
  }

  if(resultsCount == 0) {
    $(containerElementPrefix+'.search-no-results-text').removeClass('hidden');
  }

  if(posts.length > 0 ) {
    $(containerElementPrefix+'.search-results-posts').removeClass('hidden');
    $.each(posts, function(k, v){
      $(containerElementPrefix+'.search-results-posts ul').append('<li class="island-1-4">' + '<a href="' + v.value + '">' + v.label + '</a>' + '</li>');
    });
  }

  if(pages.length > 0 ) {
    $(containerElementPrefix+'.search-results-pages').removeClass('hidden');
    $.each(pages, function(k, v){
      $(containerElementPrefix+'.search-results-pages ul').append('<li class="island-1-4">' + '<a href="' + v.value + '">' + v.label + '</a>' + '</li>');
    });
  }

}


  }

});

