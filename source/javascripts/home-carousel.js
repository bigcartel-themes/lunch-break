const homeSlideshowContainer = document.querySelector('.home-carousel');
if (homeSlideshowContainer) {
  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.home-carousel', {
      arrows: false,
      type: 'slide',
      keyboard: true,
    } );
    splide.mount();
  });
}