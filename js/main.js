
$(function () {
  "use strict";

  // Init masked input
  $('input[type="tel"]').mask("+7 " + "(999)999-99-99");

  // calculatePosition();
  let timeout = null;
  $('.filter-menu-list-item').mouseenter(function() {
    clearTimeout(timeout);
    showSubmenu(this);
    calculatePosition($(this).children('.submenu'));
  });
  $('.filter-menu-list-item').mouseleave(function() {
    clearTimeout(timeout);
    timeout = setTimeout(hideSubmenu, 1500);
  });
  $('.submenu-close-btn').click(function () {
    $(this).parent().css('display', 'none');
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
  })

  initProductsSlider();

});

function getHeaderHeight() {
  return $('.header').outerHeight() + 1; //+1 чтоб не загораживалась горизонтальная полоса при появлении
}

function getLeftPosition() {
  return $('.left-panel').outerWidth();
}
function showSubmenu(menuItem) {
  hideSubmenu();
  $(menuItem).children('.submenu').show();
}

function initProductsSlider() {
  $('.popular-goods-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: $('.popular-goods-pagination .prev'),
    nextArrow: $('.popular-goods-pagination .next'),
  });
}

function hideSubmenu() {
  $('.submenu').hide();
}

function calculatePosition(submenu) {
  submenu.css('left', getLeftPosition());
  let containerTop = $('.filter-menu').offset().top;
  let parentTop = submenu.parent().offset().top;
  let bottom = submenu.offset().top + submenu.outerHeight();
  let headerBottom = getHeaderHeight();
  
  console.log('Parent top: ' + parentTop + ', bottom: ' + bottom);

  submenu.css('top', getHeaderHeight() - containerTop + $(window).scrollTop());

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
