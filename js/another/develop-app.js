(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _accordion = _interopRequireDefault(require("../components/accordion"));
var _scrollSmooth = _interopRequireDefault(require("../components/scroll-smooth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import shapeResize from './components/animations/shapeResize';
// import initSelects from './components/select';
// import bntOFFER from './components/btnOffer';

(function ($) {
  // When DOM is ready
  $(function () {
    var accordions = new _accordion["default"]();
    _scrollSmooth["default"].init();
  });
})(jQuery);
var SHAPE = document.getElementById('mainFormShape');
// 1) Отслеживаем высоту документа, его скролл
// window.addEventListener('scroll', function() {

//   console.log('расстояние пролистывания ' + Math.floor(scrollY, 1) + 'px');
//   const height = document.body.offsetHeight
//   const screenHeight = window.innerHeight
//   let elHeigth =  SHAPE.offsetHeight;
//   let scrollYY = scrollY + screenHeight;
//   let centerScreen = screenHeight / 2;
//   let centerScreen1 = screenHeight / 2;
//   let scrollbottom = document.body.scrollTop + c.bottom;

//   console.log('top:' + Math.floor(scrollYY, 1) + ' bottom: ' + Math.floor(scrollbottom, 1));
//   console.log('center:' + Math.floor(centerScreen1, 1));

//   if(scrollYY < centerScreen && scrollYY >= c.top) {
//     let x = scrollYY * 100% + '%';
//     console.log(x)
//   }
//   let x = scrollYY;
//   let y = ;
//   let z = ;
//   let o = ;
//   if (scrollYY >= c.top) {
//     SHAPE.style.borderRadius = `${x} ${y} ${z} ${o} / 100% 100% 0% 0%`;
//   }
// });

// let scrolltop = document.body.scrollTop + c.top;

//  1231234567

},{"../components/accordion":2,"../components/scroll-smooth":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_WRAP = 'js-accordion-wrap';
var CLASS_ACCORDION = 'js-accordion';
var CLASS_HEAD = 'js-accordion-head';
var CLASS_OPENER = 'js-accordion-open';
var CLASS_CONTENT = 'js-accordion-content';
var CLASS_DESCRIPTION = 'js-accordion-descr';
var CLASS_OPEN = 'js-open';
var CLASS_ACTIVE = 'active';
function initAccordion() {
  var accordionList = document.querySelectorAll(".".concat(CLASS_ACCORDION));
  var openList = document.querySelectorAll(".".concat(CLASS_ACCORDION, ".").concat(CLASS_OPEN));
  if (accordionList.length) {
    accordionList.forEach(function (accordion) {
      var wrap = accordion.closest(".".concat(CLASS_WRAP));
      var open = accordion.querySelector(".".concat(CLASS_OPENER));
      open.addEventListener('click', function (e) {
        var target = e.target;
        var btn = target.closest(".".concat(CLASS_OPENER));
        var head = target.closest(".".concat(CLASS_HEAD));
        var trigger = head ? head : btn;
        if (wrap && wrap.getAttribute('data-only') != undefined) {
          var group = wrap.querySelector(".".concat(CLASS_ACCORDION)).getAttribute('data-group');
          var contentList = [];
          if (group) {
            var currentAccordionList = wrap.querySelectorAll("[data-group=\"".concat(group, "\"]"));
            currentAccordionList.forEach(function (accordion) {
              contentList.push(accordion.querySelector(".".concat(CLASS_CONTENT)));
            });
          } else {
            contentList = wrap.querySelectorAll(".".concat(CLASS_CONTENT));
          }
          showAccordion(trigger, contentList, false);
        } else {
          showAccordion(trigger);
        }
      });
    });
    resize();
  }
  if (openList.length) {
    clickAccordion(openList);
  }
  function getDesctiptionHeight(currentAccordion) {
    var description = currentAccordion.querySelector(".".concat(CLASS_DESCRIPTION));
    var height = description.offsetHeight;
    var computedStyle = window.getComputedStyle(description);
    var marginTop = +computedStyle.marginTop.replace('px', '');
    var marginBottom = +computedStyle.marginBottom.replace('px', '');
    return height + marginTop + marginBottom;
  }
  function showAccordion(head) {
    var contentAccordion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var currentContent = head.nextElementSibling;
    var parent = currentContent.closest(".".concat(CLASS_ACCORDION));
    if (head.classList.contains(CLASS_ACTIVE)) {
      head.classList.remove(CLASS_ACTIVE);
      parent.classList.remove(CLASS_ACTIVE);
      currentContent.style.maxHeight = '0';
    } else {
      var changeParent = function changeParent(el) {
        parentDescription = el.closest(".".concat(CLASS_DESCRIPTION));
        if (parentDescription) {
          paretnContent = parentDescription.closest(".".concat(CLASS_CONTENT));
        } else {
          paretnContent = null;
        }
      };
      if (!all && contentAccordion.length) {
        contentAccordion.forEach(function (content) {
          content.previousElementSibling.classList.remove(CLASS_ACTIVE);
          content.style.maxHeight = '0';
        });
      }
      var heightDescription = getDesctiptionHeight(currentContent);
      var parentDescription;
      var paretnContent;
      changeParent(currentContent);
      if (paretnContent) {
        do {
          var oldHeight = paretnContent.scrollHeight;
          paretnContent.style.maxHeight = "".concat(oldHeight + heightDescription, "px");
          changeParent(paretnContent);
        } while (paretnContent);
      }
      head.classList.add(CLASS_ACTIVE);
      parent.classList.add(CLASS_ACTIVE);
      currentContent.style.maxHeight = heightDescription + 'px';
    }
  }
  function updateResize() {
    var activeAccordions = document.querySelectorAll(".".concat(CLASS_ACCORDION, ".").concat(CLASS_ACTIVE));
    var activeOpeners = document.querySelectorAll(".".concat(CLASS_OPENER, ".").concat(CLASS_ACTIVE));
    var activeHeads = document.querySelectorAll(".".concat(CLASS_HEAD, ".").concat(CLASS_ACTIVE));
    var activeContents = document.querySelectorAll(".".concat(CLASS_CONTENT, ".").concat(CLASS_ACTIVE));
    if (activeOpeners.length) {
      activeOpeners.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
    }
    if (activeHeads.length) {
      activeHeads.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
    }
    if (activeContents.length) {
      activeContents.forEach(function (el) {
        el.classList.remove(".".concat(CLASS_ACTIVE));
        el.style.maxHeight = '0';
      });
    }
    if (activeAccordions.length) {
      activeAccordions.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
      clickAccordion(activeAccordions);
      clickAccordion(activeAccordions);
    }
  }
  function clickAccordion(list) {
    list.forEach(function (open) {
      var btn = open.querySelector(".".concat(CLASS_OPENER));
      if (btn) {
        btn.click();
      }
    });
  }
  function resize() {
    var changed = false;
    window.addEventListener('resize', function () {
      if (changed !== false) {
        clearTimeout(changed);
      }
      changed = setTimeout(updateResize, 200);
    });
  }
}
var _default = initAccordion;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
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

},{}]},{},[1]);
