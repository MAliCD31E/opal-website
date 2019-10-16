$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 16,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive:{
      0:{
        items:2
      },
      678:{
        items:4
      },
      1024:{
        items:6
      }
    }
  });

  $('.product').on('click', '.product__size li', function() {
    $('li.status--active', $(this).parent()).each(function() {
      $(this).removeClass('status--active');
    });
    $('.product__style ul', $(this).parents('.product')).empty();
    $(this).addClass('status--active');
    let size = $(this).attr('data-size');
    let fragment = document.createDocumentFragment();
    $(`[data-image][data-size="${size}"]`, $(this).parents('.product')).each(function() {
      let li = document.createElement('li');
      li.setAttribute('data-style', $(this).attr('data-style'));
      let img = document.createElement('img');
      img.setAttribute('src', $(this).attr('data-image'));
      img.setAttribute('alt', '');
      li.appendChild(img);
      fragment.appendChild(li);
    });
    $('.product__style ul', $(this).parents('.product'))[0].appendChild(fragment);
    $('.product__style li:eq(0)', $(this).parents('.product')).trigger('click');
  });
  $('.product').on('click', '.product__style li', function() {
    $('li.status--active', $(this).parent()).each(function() {
      $(this).removeClass('status--active');
    });
    $(this).addClass('status--active');
    let size = $('li.status--active', $(this).parents('.product')).attr('data-size');
    let style = $(this).attr('data-style');
    let image = $(`[data-image][data-size="${size}"][data-style="${style}"]`, $(this).parents('.product')).attr('data-image');
    $('.product__image img', $(this).parents('.product')).attr('src', image);
  });
});
window.addEventListener('load', ev => {
  Splitting({
    target: '.slider__image',
    by: 'cells',
    image: true,
    columns: 12,
    rows: 6
  });
  const swiper = new Swiper ('.swiper-container', {
    init: false,
    effect: 'fade',
    autoplay: {
      disableOnInteraction: false
    }
  });
  swiper.on('init', function() {
    document.querySelector(`.slider__slide:nth-child(${(swiper.params.initialSlide + 1)})`).classList.add('status--active');
  });
  swiper.on('transitionEnd', function() {
    document.querySelectorAll(`.slider__slide.status--active`).forEach(element => {
      element.classList.remove('status--active');
    });
    document.querySelector(`.slider__slide:nth-child(${(swiper.activeIndex + 1)})`).classList.add('status--active');
  });
  swiper.init();
  document.getElementById('intro').classList.remove('status--acitve');
});