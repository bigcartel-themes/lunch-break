$(function() {
  $('.open_menu').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $('aside').toggleClass('open');
    $('.content').toggleClass('hidden');
  });
  $('.remove a').click(function(e) {
    e.preventDefault();
    $(this).closest('li').find('input[id$=_qty]').val(0).closest('form').submit();
  });
  $('.product_images a').magnificPopup({
    type:'image',
    gallery: {
      enabled: true
    }
  });
  $(window).resize(function() { 
    $('body').css('margin-bottom', $('footer').height());
  });
  $('body').css('margin-bottom', $('footer').height());
});