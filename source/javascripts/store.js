"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preload");

  let contactFields = document.querySelectorAll(".contact_form input, .contact_form textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
  const numShades = 5;

  let cssProperties = [];

  for (const themeColor in themeColors) {
    const hexValue = themeColors[themeColor];
    var hsl = tinycolor(hexValue).toHsl();
    for (var i = numShades - 1; i >= 0; i -= 1) {
      hsl.l = (i + 0.5) / numShades;
      cssProperties.push(`--${camelCaseToDash(themeColor)}-${((i * 100) / 1000) * 200}: ${tinycolor(hsl).toRgbString()};`);
    }
    numColor = tinycolor(hexValue).toRgb();
    cssProperties.push(`--${camelCaseToDash(themeColor)}-rgb: ${numColor["r"]}, ${numColor["g"]}, ${numColor["b"]};`);
  }

  const headTag = document.getElementsByTagName("head")[0];
  const styleTag = document.createElement("style");

  styleTag.innerHTML = `
    :root {
      ${cssProperties.join("\n")}
    }
  `;
  headTag.appendChild(styleTag);

  // Make slideshow clickable if homepageSlideshowLink is configured
  const isHomePage = document.body.getAttribute('data-bc-page-type') === 'home';
  const slideshowLink = themeOptions.homepageSlideshowLink && themeOptions.homepageSlideshowLink.trim() !== '' ? themeOptions.homepageSlideshowLink : null;
  if (isHomePage && slideshowLink) {
    const slideshow = document.querySelector(".home-slideshow");
    if (slideshow) {
      // Add styling and accessibility attributes to individual slides
      const slides = slideshow.querySelectorAll('.splide__slide');
      slides.forEach(slide => {
        slide.classList.add("slideshow-clickable");
        slide.setAttribute("role", "button");
        slide.setAttribute("aria-label", "Navigate to " + slideshowLink);
      });
      
      // Use event delegation with a single listener on the slideshow container
      slideshow.addEventListener("click", function(event) {
        const clickedSlide = event.target.closest('.splide__slide');
        if (clickedSlide) {
          // Don't interfere with splide controls - only handle clicks on slide content
          if (!event.target.closest('.splide__arrow, .splide__pagination')) {
            event.preventDefault();
            event.stopPropagation();
            if (isExternalLink(slideshowLink)) {
              window.open(slideshowLink, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = slideshowLink;
            }
          }
        }
      });
    }
  }
});

window.addEventListener("load", () => {
  document.body.classList.remove("transition-preload");
});

function setHeaderBottomPosition() {
  const headerBottomPosition = document.querySelector('header').getBoundingClientRect().top;
  document.documentElement.style.setProperty('--header-bottom-position', `${headerBottomPosition}px`);
}

const toggleMenuButton = document.querySelector('.open_menu');
const sidebarNavigation = document.querySelector('.sidebar-navigation');

function toggleSidebarNavigation() {
  setHeaderBottomPosition();
  toggleMenuButton.classList.toggle('open');
  sidebarNavigation.classList.toggle('open');
  document.body.classList.toggle('show_menu');
  const isHidden = toggleMenuButton.getAttribute('aria-expanded') === 'true';
  toggleMenuButton.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
}

toggleMenuButton.addEventListener('click', toggleSidebarNavigation);