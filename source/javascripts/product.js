if (themeOptions.productImageZoom === true) {
  let carouselImages = document.querySelector('.splide__list');
  let galleryElement = '.product-images';
  let galleryChildren = '.gallery-link';
  if (carouselImages) {
    galleryElement = '.splide__list';
    galleryChildren = '.splide__slide:not(.splide__slide--clone) a'
  }
  var lightbox = new PhotoSwipeLightbox({
    gallery: galleryElement,
    children: galleryChildren,
    loop: true,
    showHideAnimationType: 'fade',
    paddingFn: (viewportSize) => {
      let paddingVal = 100;
      if (viewportSize.x < 768) {
        paddingVal = 16;
      }
      return {
        top: paddingVal,
        bottom: paddingVal,
        left: paddingVal,
        right: paddingVal
      };
    },
    bgOpacity: 1,
    pswpModule: PhotoSwipe
  });
  lightbox.init();
}
$('.product_option_select').on('change',function() {
  var selectedOption = $(this).find("option:selected");
  var option_price = selectedOption.attr("data-price");
  var original_price = selectedOption.attr("data-original-price");
  enableAddButton(option_price, original_price);
});

function updateInventoryMessage(optionId = null) {
  const product = window.bigcartel?.product;
  const messageElement = document.querySelector('[data-inventory-message]');

  if (
    !themeOptions?.showLowInventoryMessages ||
    !messageElement ||
    !product
  ) {
    return;
  }

  messageElement.textContent = '';
  const productOptions = product?.options || [];

  // If no option is selected (initial page load or reset) or product has no options
  if (!optionId) {
    const hasOptionWithStatus = (status) => 
      productOptions.length > 0 && 
      productOptions.some(option => 
        option && 
        !option.sold_out && 
        option[status]
      );

    // Single option product - check both statuses
    if (productOptions.length === 1) {
      const option = productOptions[0];
      if (option && !option.sold_out) {
        if (option.isAlmostSoldOut) {
          messageElement.textContent = themeOptions.almostSoldOutMessage;
        } else if (option.isLowInventory) {
          messageElement.textContent = themeOptions.lowInventoryMessage;
        }
      }
      return;
    }

    // Multiple options - only check for low inventory across all options
    if (productOptions.length > 1 && hasOptionWithStatus('isLowInventory')) {
      messageElement.textContent = themeOptions.lowInventoryMessage;
    }
    return;
  }

  // Handle selected option
  const selectedOption = product.options.find(option => option.id === parseInt(optionId));
  if (!selectedOption || selectedOption.sold_out) return;

  // For selected options:
  // - Single option products: check both almost sold out and low inventory
  // - Multiple option products: check both statuses when specific option selected
  if (selectedOption.isAlmostSoldOut) {
    messageElement.textContent = themeOptions.almostSoldOutMessage;
  } else if (selectedOption.isLowInventory) {
    messageElement.textContent = themeOptions.lowInventoryMessage;
  }
}

function updateButtonPrice(priceElement, updated_price, original_price) {
  var updatedNum = parseFloat(updated_price) || 0;
  var originalNum = parseFloat(original_price) || 0;
  var showStrikethrough = originalNum > updatedNum && themeOptions.showStrikethroughPricing;

  var priceHtml;
  if (showStrikethrough) {
    var originalFormatted = formatMoney(original_price, true, true);
    var saleFormatted = formatMoney(updated_price, true, true);
    priceHtml = '<s class="price-compare">' + originalFormatted + '</s> <span class="price-sale">' + saleFormatted + '</span>';
  } else {
    priceHtml = formatMoney(updated_price, true, true);
  }
  priceElement.html(priceHtml);
}

function enableAddButton(updated_price, original_price) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  var addButtonTextElement = addButton.find('.button-add-text');
  var addButtonPriceElement = addButton.find('.button-add-price');

  addButton.attr("disabled", false);
  addButtonTextElement.html(addButtonTitle);
  addButton.attr('aria-label', addButtonTitle);

  // On mobile, the price display is far from the button due to the product image between them.
  // Show the price in the button so users see price changes when selecting options.
  if (updated_price) {
    updateButtonPrice(addButtonPriceElement, updated_price, original_price);
    addButtonPriceElement.addClass('visible');
  } else {
    addButtonPriceElement.removeClass('visible');
  }

  updateInventoryMessage($('#option').val());
  updateProductPrice(updated_price, original_price);
  showBnplMessaging(updated_price, { alignment: 'left', displayMode: 'grid', pageType: 'product' });
}

function updateProductPrice(updated_price, original_price) {
  var priceContainer = $('.product_price-value');
  if (!priceContainer.length) return;

  if (!updated_price) {
    if (priceContainer.data('original-html') !== undefined) {
      priceContainer.html(priceContainer.data('original-html'));
    }
    return;
  }

  if (priceContainer.data('original-html') === undefined) {
    priceContainer.data('original-html', priceContainer.html());
  }

  // Convert to numbers for proper comparison (data attributes are strings)
  var updatedNum = parseFloat(updated_price) || 0;
  var originalNum = parseFloat(original_price) || 0;

  var showStrikethrough = originalNum > updatedNum &&
                          themeOptions.showStrikethroughPricing;

  var priceHtml;
  if (showStrikethrough) {
    var regularFormatted = formatMoney(original_price, true, true);
    var saleFormatted = formatMoney(updated_price, true, true);
    priceHtml = '<s class="price-compare">' + regularFormatted + '</s> <span class="price-sale">' + saleFormatted + '</span>';
  } else {
    priceHtml = formatMoney(updated_price, true, true);
  }

  priceContainer.html(priceHtml);
}

function disableAddButton(type) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  var addButtonTextElement = addButton.find('.button-add-text');
  var addButtonPriceElement = addButton.find('.button-add-price');

  if (type == "sold-out") {
    addButtonTitle = addButton.attr('data-sold-title');
  }
  if (!addButton.is(":disabled")) {
    addButton.attr("disabled", "disabled");
  }
  addButtonTextElement.html(addButtonTitle);
  addButtonPriceElement.removeClass('visible');
  addButton.attr('aria-label', '');
}

function enableSelectOption(select_option) {
  select_option.removeAttr("disabled");
  select_option.text(select_option.attr("data-name"));
  select_option.removeAttr("disabled-type");
  if ((select_option.parent().is('span'))) {
    select_option.unwrap();
  }
}
function disableSelectOption(select_option, type) {
  if (type === "sold-out") {
    disabled_text = select_option.parent().attr("data-sold-text");
    disabled_type = "sold-out";
    if (themeOptions.showSoldOutOptions === false) {
      hide_option = true;
    }
    else {
      hide_option = false;
    }
  }
  if (type === "unavailable") {
    disabled_text = select_option.parent().attr("data-unavailable-text");
    disabled_type = "unavailable";
    hide_option = true;
  }
  if (select_option.val() > 0) {
    var name = select_option.attr("data-name");
    select_option.attr("disabled",true);
    select_option.text(name + ' ' + disabled_text);
    select_option.attr("disabled-type",disabled_type);
    if (hide_option === true) {
      if (!(select_option.parent().is('span'))) {
        select_option.wrap('<span>');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const isProductPage = document.body.getAttribute('data-bc-page-type') === 'product';
  if (isProductPage) {
    updateInventoryMessage();
    
    const price = window.bigcartel?.product?.default_price || null;    
    showBnplMessaging(price, { alignment: 'left', displayMode: 'grid', pageType: 'product' });
  }
});