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
});

window.addEventListener("load", () => {
  document.body.classList.remove("transition-preload");
});

function setHeaderBottomPosition() {
  const mobileNav = document.querySelector('.mobile_nav');
  const headerBottomPosition = mobileNav.getBoundingClientRect().bottom;
  document.documentElement.style.setProperty('--header-bottom-position', `${headerBottomPosition}px`);
}

// Set the initial value on page load
setHeaderBottomPosition();

// Track the value on resize
window.addEventListener('resize', setHeaderBottomPosition);



const openMenuButton = document.querySelector('.open_menu');
const sidebarNavigation = document.querySelector('.sidebar-navigation');

function openSidebarNavigation() {
  sidebarNavigation.classList.add('open');
  openMenuButton.setAttribute('aria-expanded', 'true');
  sidebarNavigation.setAttribute('aria-hidden', 'false');
}

function closeSidebarNavigation() {
  sidebarNavigation.classList.remove('open');
  openMenuButton.setAttribute('aria-expanded', 'false');
  sidebarNavigation.setAttribute('aria-hidden', 'true');
}

openMenuButton.addEventListener('click', openSidebarNavigation);