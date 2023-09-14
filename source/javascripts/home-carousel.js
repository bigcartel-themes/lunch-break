const homeSlideshowContainer = document.querySelector('.home-slideshow');
if (homeSlideshowContainer) {
  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.home-slideshow', {
      arrows: true,
      type: 'slide',
      keyboard: true,
      rewind: true
    } );
    splide.mount();
  });
}