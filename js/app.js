(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _scrollSmooth = _interopRequireDefault(require("./components/scroll-smooth"));
var _swiperMain = _interopRequireDefault(require("./components/sliders/swiperMain"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(function ($) {
  $(function () {
    _scrollSmooth["default"].init();
    _swiperMain["default"].init();
  });
})(jQuery);

},{"./components/scroll-smooth":2,"./components/sliders/swiperMain":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// const HEADER_EL_HEIGHT = document.querySelector('.menu').clientHeight;

var scrollSmooth = function () {
  var smoothScroll = function smoothScroll() {
    var scroll = function scroll(targetEl, duration) {
      var targets = document.querySelector(targetEl);
      // const targetsPosition = targets.getBoundingClientRect().top - HEADER_EL_HEIGHT;
      var startsPosition = window.pageYOffset;
      var startTime = null;
      var ease = function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t -= 1;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };
      var animation = function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startsPosition, targetsPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    };
    var scrollTo = function scrollTo() {
      var links = document.querySelectorAll('.js-smooth-scroll');
      links.forEach(function (each) {
        each.addEventListener('click', function () {
          var currentTarget = this.getAttribute('href');
          scroll(currentTarget, 1000);
        });
      });
    };
    scrollTo();
  };
  var init = function init() {
    smoothScroll();
  };
  return {
    init: init
  };
}();
var _default = scrollSmooth;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var swiperMain = function () {
  var accountantInit = new Swiper('.swiper-main', {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 800,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false
    },
    centerInsufficientSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
        slidesPerView: 2
      },
      1024: {
        spaceBetween: 40,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 80,
        slidesPerView: 4
      }
    }
  });
  var init = function init() {};
  return {
    init: init
  };
}();
var _default = swiperMain;
exports["default"] = _default;

},{}]},{},[1]);
