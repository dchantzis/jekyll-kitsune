$(window).load(function() {

  var $form = $('.form-contact');
  if($form.length > 0) {

  var formValues = {};

  $form.on('submit', function (e) {
    e.preventDefault();

    $('input[type="submit"]').val('Submitting...');
    $form.addClass('form-submitting');

    var validationError = false;
    var formTitle = $form.attr('data-title');
    var $formElements = $('.' + formTitle + ' input' + ', ' + '.' + formTitle + ' textarea' );
    formResetErrors(formTitle);
    formValues = {};

    $formElements.each(function(i, v){
      if (v.type !== 'submit'
          && !$(this).hasClass("hidden")) {
            fieldHumanName = $(this).attr('data-title').split('--').pop().replace(/\s*/g,'').replace('-', ' ');
            fieldName = v.name.split('--').pop().replace(/\s*/g,'');

          if( $(this).val().trim() ){
            formValues[fieldName] = v.value;
          } else {
            validationError = true;

            if("first-name" == fieldName
                || "last-name" == fieldName) {
              $('.' + formTitle + ' fieldset.form-name').addClass('form-error');
              $('.' + formTitle + ' fieldset.form-name .field-error').remove();
              $('.' + formTitle + ' fieldset.form-name').prepend('<div class="field-error push-1-4 gutter-1-2 pad-t-1-4 pad-b-1-4 milli">name is required.' + '</div>');
            } else {
              $('.' + formTitle + ' fieldset.' + $(this).attr('data-title')).addClass('form-error');
              $('.' + formTitle + ' fieldset.' + $(this).attr('data-title')).prepend('<div class="field-error push-1-4 gutter-1-2 pad-t-1-4 pad-b-1-4 milli">' + fieldHumanName + ' is required.' + '</div>');
            }

          }
      }
    });

    if( !validationError ) {
      $.ajax({
        url: $form.attr('action'),
        method: "POST",
        data: formValues,
        dataType: "json",
        success: function(resp) {
          $form.removeClass('form-submitting');
          $('.' + formTitle + ' .form-contact-notification').text('Thank you for contacting me.').removeClass('hidden');
          $('.' + formTitle + ' input, ' + '.' + formTitle + ' textarea').val('');
          $('.' + formTitle + ' input[type="submit"]').val('Send it.');
        },
        error: function(resp) {
          $('.' + formTitle + ' .form-contact-notification').text('There was an error submitting the form.').removeClass('hidden').addClass('form-error');
          $form.removeClass('form-submitting');
          $('.' + formTitle + ' input[type="submit"]').val('Send it.');
        }
      });
    } else {
      $('.' + formTitle + ' .form-contact-notification').text('Your form has encountered a problem. Please scroll down to review.').removeClass('hidden').addClass('form-error');
      $form.removeClass('form-submitting');
      $('.' + formTitle + ' input[type="submit"]').val('Send it.');
    }


  });

  }

});

function formResetErrors(formTitle) {
  $('.' + formTitle + ' .form-contact-notification').text('').addClass('hidden').removeClass('form-error');
  $('.' + formTitle + ' input, '+'.' + formTitle + ' select').removeClass('input-error');
  $('.' + formTitle + ' label.form-error').html("");
  $('.' + formTitle + ' .field-error').remove();
  $('.' + formTitle + ' fieldset').removeClass('form-error');
}
