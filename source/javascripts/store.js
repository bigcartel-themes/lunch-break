$(function() {
  $('.product_images a').magnificPopup({
    type:'image',
    tLoading: '',
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"><svg class="mfp-close remove_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.1 14.1" enable-background="new 0 0 14.1 14.1"><path class="mfp-close" d="M14.1 1.1l-1.1-1.1-6 6-5.9-6-1.1 1.1 6 5.9-6 6 1.1 1.1 5.9-6 6 6 1.1-1.1-6-6z"/></svg></button>',
    gallery: {
      enabled: true,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-prevent-close mfp-arrow-%dir%"><svg class="mfp-prevent-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.6 15" enable-background="new 0 0 7.6 15"><path class="mfp-prevent-close" d="M6.4 15l-6.4-7.5 6.3-7.5 1.1 1-5.4 6.5 5.6 6.5z"/></svg></button>'
    }
  });
  $('.open_menu').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $('aside').toggleClass('open');
  });
  $('.remove a').click(function(e) {
    e.preventDefault();
    $(this).closest('li').find('input[id$=_qty]').val(0).closest('form').submit();
  });
  $('[name*="cart[update]"], [name="cart[shipping_country_id]"]').on('change',function() {
    $(this).closest('form').submit();
  });
  $('[name="cart[discount_code]"]').on('change',function() { 
    $(this).closest('.checkout_btn').attr('name','update');
    $(this).closest('form').submit();
  });
  $('.search_form input')
    .on('focus', function() { 
      $(this).parent().addClass('focus');
    })
    .on('blur',function() {
      $(this).parent().removeClass('focus');
      $(this).val('');
  });
  $(window).on("load resize", function() {
    $('body').css('margin-bottom', $('footer').height());
  });
  $('.social_facebook').click(function() { 
    $('.facebook_popup_holder').fadeToggle('fast');
    return false;
  });
  $('body').click(function() { 
    if (!$(event.target).closest('.social_facebook').length) {
      $('.facebook_popup_holder').fadeOut('fast');
    }
  });
});