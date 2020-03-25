
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
  });

  $('.relative').on('mousedown', '.clear', function (e) {
    $(this).siblings('input').val('');
  });

  $(document).on('click', '.order-make-rblock__title.promo', function () {
    let $sibling = $(this).next();
    if ($sibling.css('display') == 'none') {
      $sibling.fadeIn();
    } else {
      $sibling.fadeOut();
    }
  })

  initProductsSlider();
  initBannerSlider();
  initDetailSlider();
  initMap();

  $('.catalog-filter__title').on('click', function () {
    $(this).parent().toggleClass('catalog-filter__block_active');
  });

  $('.catalog-panel__layout').on('click', function (e) {
    if (e.target) {
      if ($(e.target).hasClass('active')) return;
      $(e.target).addClass('active').siblings().removeClass('active');
      $('.catalog-content').toggleClass('catalog-content_lines');
      if ($(e.target).hasClass('catalog-layout-lines')) {
        document.cookie = "catalog_layout=line; max-age=3600*3";
      } else {
        document.cookie = "catalog_layout=tiles; max-age=3600*3";
      }
    }
  });

  $('.show-left-menu').on('click', function () {
    let $leftMenu = $('.left-menu');
    $leftMenu.toggleClass('left-menu_hidden');
    let $headerMain = $(this).closest('.header_main');

    if ($headerMain.length) {
      $leftMenu.css({
        'top': $('.header').outerHeight()
      });
      $leftMenu.find('.left-menu-content-inner').css('width', + $(this).parent('.left-panel').outerWidth());
    }
  });

  $('.catalog-panel__mobile-filter').on('click', function () {
    $('.catalog-mobile-wrapper').toggleClass('catalog-mobile-wrapper_active');
    $('.catalog-filter').css('top', getTop());
    function getTop() {
      let $catalogPanel = $('.catalog-panel');
      return $catalogPanel.offset().top + $catalogPanel.outerHeight();
    }
  });

  $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('.tab').find('.tab__content').removeClass('active').eq($(this).index()).addClass('active');
  });

  $('.open-popup').magnificPopup({
    type: 'inline',
    closeMarkup: '<button title="%title%" type="button" class="popup-close mfp-close">Закрыть</button>'
  });

  $(document).on('click', '.open-ajax-popup', function (e) {
    e.preventDefault();
    let productId = $(this).data('id');
    $(this).magnificPopup({
      type: 'ajax',
      callbacks: {
        ajaxContentAdded: function (data) {
          initDetailSlider();
        }
      }
    }).magnificPopup('open');
  });

  $(document).on('click', '#oneClickBtn', function (e) {
    e.preventDefault();
    var productId = $(this).data('id');
    $('[name="product_id"]').val(productId);
    $.magnificPopup.close();
    $.magnificPopup.open({
      items: {
        src: '#one-click'
      },
      type: 'inline'
    })
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
  let $slider = $('.popular-goods-slider'),
    slidersCount = 5;

  if ($('.catalog-detail').length) {
    slidersCount = 6;
  }

  $slider.slick({
    slidesToShow: slidersCount,
    slidesToScroll: 1,
    prevArrow: $('.popular-goods-pagination .prev'),
    nextArrow: $('.popular-goods-pagination .next'),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
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

function initDetailSlider() {
  let $slider = $('.catalog-detail__thumbs:not(.slick-initilized)'),
    $detailImg = $('.catalog-detail__detail-img img');

  $slider.slick({
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          vertical: false,
          verticalSwiping: false
        }
      }
    ]
  });

  $slider.on('click', function (e) {
    if (e.target) {
      let $img = $(e.target).data('src');
      $detailImg.attr('src', $img);
    }
  })
}

function hideSubmenu() {
  $('.left-menu-block > ul > li > ul').removeClass('opened');
}

function calculatePosition(submenu) {
  submenu.css('left', getLeftPosition());
  let containerTop = $('.left-menu').offset().top;
  let parentTop = submenu.parent().offset().top;
  let bottom = submenu.offset().top + submenu.outerHeight();

  // console.log('Parent top: ' + parentTop + ', bottom: ' + bottom);

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

function initMap() {
  let map, marker;
  const coordinates = {
    vladivostok: [43.236825, 132.013804],
    ussuriysk: [43.843118, 131.938102],
  }

  if (typeof DG !== 'undefined') {
    let mapWrapper = document.querySelector('.map-wrapper');
    DG.then(function () {
      map = DG.map('map', {
        center: coordinates.vladivostok,
        scrollWheelZoom: false,
        zoom: 16
      });

      marker = new DG.Marker(coordinates.vladivostok);
      marker.addTo(map);

      document.querySelectorAll('.show-vladivostok').forEach(item => {
        item.addEventListener('click', () => {
          applyMapSettings(coordinates.vladivostok)
        });
      })
      document.querySelectorAll('.show-ussuriysk').forEach(item => {
        item.addEventListener('click', () => {
          applyMapSettings(coordinates.ussuriysk)
        });
      })

      function applyMapSettings(coordinates) {
        map.setView(coordinates);
        marker.setLatLng(coordinates);
        mapWrapper.classList.add('map-wrapper_active');
      }
    });
  }
}