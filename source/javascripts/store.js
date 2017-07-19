$(function() {
  $('.product_images a').magnificPopup({
    type:'image',
    tLoading: '',
    gallery: {
      enabled: true
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
});