
$(function () {
  "use strict";

  // Init masked input
  $('input[type="tel"]').mask("+7 " + "(999)999-99-99");

  // calculatePosition();
  let timeout = null;
  $('.left-menu-block > ul > li').mouseenter(function () {
    clearTimeout(timeout);
    showSubmenu(this);
    calculatePosition($(this).children('ul'));
  });
  $('.left-menu-block > ul > li').mouseleave(function () {
    clearTimeout(timeout);
    timeout = setTimeout(hideSubmenu, 1500);
  });
  $('.submenu-close-btn').click(function () {
    $(this).parent().removeClass('opened');
  });

  $('.mobile-menu-list .parent').click(function (e) {
    let target = $(e.target);
    if (target.is($(this)))
      $(this).children().addClass('opened');
  })
  $('.mobile-submenu .back').click(function () {
    $(this).parent().removeClass('opened');
  });

  $('.show-catalog').click(function () {
    $('.submenu-opened').removeClass('submenu-opened');
  });

  $('.show-mobile-catalog').click(function () {
    $('.mobile-menu').toggleClass('opened');
    $('.overlay').toggleClass('overlay_active')
  });
  $('.overlay').on('click', function () {
    $('.mobile-menu').removeClass('opened');
    $(this).removeClass('overlay_active');
  });

  $('.footer-block__heading').on('click', function () {
    $(this).toggleClass('active');
    $(this).siblings('ul').toggleClass('active');
  })

  initProductsSlider();
  initBannerSlider();

  $('.catalog-filter__title').on('click', function () {
    $(this).parent().toggleClass('catalog-filter__block_active');
  });

  $('.catalog-panel__layout').on('click', function (e) {
    if (!$(e.target).hasClass('active')) {
      $(this).children().removeClass('active');
      $(e.target).addClass('active');
      $('.catalog-content').toggleClass('catalog-content_lines');
    }
  });

  $('.show-left-menu').on('click', function () {
    let $leftMenu = $('.left-menu');
    $leftMenu.toggleClass('left-menu_hidden');
    let $headerMain = $(this).closest('.header_main');

    if ($headerMain.length) {
      $leftMenu.css({
        'left': $(this).closest('.container').offset().left,
        'top': $(window).scrollTop() + $('.header').outerHeight()
      });
    }
  });

  $('.catalog-panel__mobile-filter').on('click', function () {
    $('.catalog-mobile-wrapper').toggleClass('catalog-mobile-wrapper_active');
    $('.catalog-filter').css('top', getTop());
    function getTop() {
      let $catalogPanel = $('.catalog-panel');
      return $catalogPanel.offset().top + $catalogPanel.outerHeight();
    }
  })

});

function getHeaderHeight() {
  return $('.header').outerHeight() + 1; //+1 чтоб не загораживалась горизонтальная полоса при появлении
}

function getLeftPosition() {
  return $('.left-panel').outerWidth();
}
function showSubmenu(menuItem) {
  hideSubmenu();
  $(menuItem).children('ul').addClass('opened');
}

function initProductsSlider() {
  $('.popular-goods-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: $('.popular-goods-pagination .prev'),
    nextArrow: $('.popular-goods-pagination .next'),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
}

function hideSubmenu() {
  $('.left-menu-block > ul > li > ul').removeClass('opened');
}

function calculatePosition(submenu) {
  submenu.css('left', getLeftPosition());
  let containerTop = $('.left-menu').offset().top;
  let parentTop = submenu.parent().offset().top;
  let bottom = submenu.offset().top + submenu.outerHeight();

  console.log('Parent top: ' + parentTop + ', bottom: ' + bottom);

  // submenu.css('top', getHeaderHeight() - containerTop + $(window).scrollTop());
  submenu.css('top', getHeaderHeight() - parentTop + $(window).scrollTop());

  /*$('.filter-menu-list .submenu').each(function() {
    let $el = $(this);
    let headerBottom = getHeaderHeight();
    let containerTop = $('.filter-menu').offset().top;
    let parentTop = $el.parent().offset().top;
    let bottom = $el.offset().top + $el.outerHeight();

    console.log('This bottom: ' + bottom + ', this parent top: ' + parentTop);
    $el.css('left', getLeftPosition());
    if (bottom > parentTop) {
      $el.css('top', headerBottom - containerTop + $(window).scrollTop());
    } else {
      $el.css('top', parentTop - bottom - headerBottom - 50 + $(window).scrollTop());
    }
  })*/
}

function initBannerSlider() {
  $('.index-banner').slick({
    prevArrow: $('.index-banner__arrow.prev'),
    nextArrow: $('.index-banner__arrow.next'),
    autoplaySpeed: 10000
  })
}