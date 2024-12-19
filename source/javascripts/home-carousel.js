const homeSlideshowContainer = document.querySelector('.home-slideshow');
if (homeSlideshowContainer) {
  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.home-slideshow', {
      arrows: true,
      type: 'slide',
      keyboard: true,
      rewind: true,
      autoplay: themeOptions.homepageSlideshowAutoplay,
      interval: themeOptions.homepageSlideshowSpeed,
      speed: 1500,
    } );
    splide.mount();
  });
}