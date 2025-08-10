function initSplide() {
  const homeSlideshowContainer = document.querySelector('.home-slideshow');
  if (homeSlideshowContainer) {
    var splide = new Splide( '.home-slideshow', {
      arrows: true,
      type: themeOptions.homepageSlideshowTransition,
      keyboard: true,
      rewind: true,
      autoplay: themeOptions.homepageSlideshowAutoplay,
      interval: themeOptions.homepageSlideshowSpeed,
      speed: 1500,
    } );
    splide.mount();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSplide);
} else {
  initSplide();
}