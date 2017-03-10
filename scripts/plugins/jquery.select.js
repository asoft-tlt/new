(function ($) {
  $.fn.jSelect = function(options) {
    var name = "jSelect";
    var isMethodCall = typeof options === "string",
        args = Array.prototype.slice.call( arguments, 1 ),
        returnValue = this;

    // allow multiple hashes to be passed on init
    options = !isMethodCall && args.length ? $.extend.apply(null, [true, options].concat(args)) : options;

    // prevent calls to internal methods
    if (isMethodCall && options.charAt( 0 ) === "_") {
      return returnValue;
    }

    if (isMethodCall) {
      this.each(function() {
        var instance = $(this).data(name),
            methodValue = instance && $.isFunction(instance[options]) ?
              instance[options].apply(instance, args) : instance;

        if (methodValue !== instance && methodValue !== undefined) {
          returnValue = methodValue;
          return false;
        }
      });
    } else {
      this.each(function() {
        var instance = $(this).data(name);
        if (instance) {
          instance.option(options || {});
        } else {
          $(this).data(name, new $.jSelect(options, this));
        }
      });
    }

    return returnValue;
  };

  $.jSelect = function(options, element) {
    this.init(options, element);
  };

  var T,
      L, // == a(".dwwr", G)
      isNotClickPick,
      isAnimation,
      currentSliderPosition = 0,
      previousMousePosition,
      dateStart,
      P = {},

      currentMousePosition,

      O, // элемент родительский
      firstElementIndex = 0, // первый элемент
      lastElementIndex = 0, // max Element

      animations = [], // массив анимаций
      // видимо текущая позиция
      gb = {
        0: 0
      },

      has3d = true,// использовать 3d анимацию, ранее (i)

      ab = 0;

  var Q = {
    mode: 'scroller',
    rows: 3,
    lineHeight: 30,
    speedUnit: 0.0012,
    confirmOnTap: true
  };

  $.jSelect.prototype = {
    init: function (options, element) {

      this.options = $.extend(Q, options);

      this.container = $(element).find('.jp-playlist');

      this.container.addClass('dwwl');

      this.wrapper = this.container.find('ul');

      this.initListeners();
    },

    initListeners: function() {
      this.container.on("touchmove mousewheel wheel", function(event) {
          // проверить X
          currentMousePosition && event.preventDefault();
        }
      );

      this.container
        .on("touchstart mousedown", this.onScrollStart.bind(this))
        .on("touchmove", this.onToucnMove.bind(this))
        .on("touchend", this.onTouchEnd.bind(this));
    },

    option: function (option) {
      this[option] && this[option]();
    },

    reset: function() {
      previousMousePosition = 0;
      firstElementIndex = 0;
      this.scrollTo(
        this.wrapper,
        ab,
        0
      );
    },

    // x - is readonly
    // _ - this.wrapper
    // ab - текущий номер скроллера. всегда ноль

    onScrollStart: function o(event) {
      if (!this.utils.testTouch(event, this)) {
        return false;
      }

      if (T || L) {
        return
      }

      event.preventDefault();
      event.stopPropagation();

      // Проверка на скролл
      isNotClickPick = "clickpick" != Q.mode;

      _ = this.wrapper;

      this.z(this.wrapper);

      isAnimation = animations[ab] !== undefined;

      currentSliderPosition = isAnimation ? this.getCurrentPosition(this.wrapper) : gb[ab];

      previousMousePosition = this.utils.getCoord(event, "Y");

      dateStart = new Date();

      currentMousePosition = previousMousePosition;

      this.scrollTo(this.wrapper, ab, currentSliderPosition, .001);

      isNotClickPick && _.closest(".dwwl").addClass("dwa");

      if ("mousedown" === event.type) {
        lastElementIndex(c)
          .on("mousemove", p)
          .on("mouseup", q);
      }
    },

    onToucnMove: function (event) {
      if(this.wrapper && isNotClickPick) {
        event.preventDefault();
        event.stopPropagation();

        currentMousePosition = this.utils.getCoord(event, 'Y');

        if (Math.abs(currentMousePosition - previousMousePosition) > 3 || isAnimation) {
          this.scrollTo(
            this.wrapper,
            ab,
            this.utils.constrain(
              currentSliderPosition + (previousMousePosition - currentMousePosition) / this.options.lineHeight,
              firstElementIndex - 1,
              lastElementIndex + 1
            )
          );

          isAnimation = true;
        }
      }
    },

    onTouchEnd: function (event) {
      var
        timeCoordinateCoeff,
        e,
        transitionSeconds,
        dateDelta = new Date - dateStart,
        preCalculatedSliderPosition = this.utils.constrain(
          Math.round(currentSliderPosition + (previousMousePosition - currentMousePosition) / this.options.lineHeight),
          firstElementIndex - 1,
          lastElementIndex + 1
        ),
        calculatedSliderPosition = preCalculatedSliderPosition,
        positionTop = _.offset().top;

      event.stopPropagation();

      if ("mouseup" === event.type) {
        // ? удалить?
        $(document)
          .off("mousemove", this.onToucnMove)
          .off("mouseup", this.onTouchEnd);
      }

      if (has3d && 300 > dateDelta) {
        timeCoordinateCoeff = (currentMousePosition - previousMousePosition) / dateDelta;

        e = timeCoordinateCoeff * timeCoordinateCoeff / Q.speedUnit;

        if (0 > currentMousePosition - previousMousePosition) {
          e = -e;
        }
      } else {
        e = currentMousePosition - previousMousePosition;
      }

      if (isAnimation) {
        calculatedSliderPosition = this.utils.constrain(
          Math.round(currentSliderPosition - e / this.options.lineHeight),
          firstElementIndex,
          lastElementIndex
        );

        transitionSeconds = timeCoordinateCoeff ? Math.max(.1, Math.abs((calculatedSliderPosition - preCalculatedSliderPosition) / timeCoordinateCoeff) * Q.timeUnit) : .1;

      } else {
        var
          selectItemNumber = Math.floor((currentMousePosition - positionTop) / this.options.lineHeight),
          selectItem = $($('li', this.wrapper)[selectItemNumber]);

        transitionSeconds = .1;

        if(this.trigger('onValueTap', { selectItem: selectItem, index: selectItemNumber }) !== false) {
          calculatedSliderPosition = selectItemNumber;
        }

        if (isNotClickPick) {
          selectItem.addClass('jp-playlist_highlited');

          setTimeout(function() {
            selectItem.removeClass('jp-playlist_highlited');
          }, 100);
        }

        if (!O && (Q.confirmOnTap === !0 || Q.confirmOnTap[ab]) && selectItem.hasClass('dw-sel')) {
          // выбрать элемент
          return;
        }
      }

      if (isNotClickPick) {
        this.scroll(this.wrapper, ab, calculatedSliderPosition, 0, transitionSeconds, true, selectItem);
      }

    },

    trigger: function(eventName, data) {
      this.options.callbacks[eventName] && this.options.callbacks[eventName](data);
    },

    /**
     * Scroll
     * @param wrapper
     * @param sliderNumber
     * @param position
     * @param e
     * @param transitionSeconds
     * @param g
     */
    scroll: function (wrapper, sliderNumber, position, e, transitionSeconds, g, selectItem) {
      var _this = this;
      position = this.utils.constrain(position, firstElementIndex, lastElementIndex);

      this.scrollTo(wrapper, sliderNumber, position, transitionSeconds, g);

      setTimeout(function() {
        //_this.F(transitionSeconds, sliderNumber, true, e, g);
        _this.trigger("onChange", { selectItem: selectItem, index: position });
      }, 10);
    },

    /**
     *
     * @param wrapper
     */
    z: function (wrapper) {
      var elements = $('li', wrapper);

      firstElementIndex = elements.index(elements.eq(0));

      lastElementIndex = Math.max(
        firstElementIndex,
        elements.index(elements.eq(-1))
      );
    },

    scrollTo: function (wrapper, currentScrollerIndex, position, transitionSeconds, e) {
      var _this = this,
          offset = -position * this.options.lineHeight,
          wrapperStyle = wrapper[0].style;

      if (!(offset == P[currentScrollerIndex] && animations[currentScrollerIndex])) {
        P[currentScrollerIndex] = offset;

        //var selectItem = $($('li', this.wrapper)[position]);
        //selectItem.addClass('jp-playlist_highlited');

        if (has3d) {
          wrapperStyle["webkitTransition"] = "-webkit-transform " + (transitionSeconds ? transitionSeconds.toFixed(3) : 0) + "s ease-out";
          wrapperStyle["webkitTransform"] = "translate3d(0," + offset + "px,0)";
        } else {
          wrapperStyle.top = offset + "px";
        }

        animations[currentScrollerIndex] && this.stopAnimation(wrapper, currentScrollerIndex);

        if (transitionSeconds && e) {
          _this.container.addClass("in-animation");

          animations[currentScrollerIndex] = setTimeout(function() {
            _this.stopAnimation(wrapper, currentScrollerIndex);
          }, 1e3 * transitionSeconds);
        }

        gb[currentScrollerIndex] = position;
      }
    },

    stopAnimation: function(a, currentScrollerIndex) {
      if (animations[currentScrollerIndex]) {
        clearTimeout(animations[currentScrollerIndex]);
        delete animations[currentScrollerIndex];
      }

      this.container.removeClass("in-animation");
    },

    getCurrentPosition: function (wrapper) {
      var val = Math.round(-this.utils.getPosition(wrapper, true) / this.options.lineHeight);
      return val;
    },

    utils: {
      testTouch: function(b, c) {
        if ("touchstart" == b.type) {
          $(c).attr("data-touch", "1");
        }
        else if ($(c).attr("data-touch")) {
          $(c).removeAttr("data-touch");
          return false;
        }
        return true;
      },
      getCoord: function(jEvent, coordinateName, c) {
        var d = jEvent.originalEvent || jEvent
          , e = (c ? "client" : "page") + coordinateName;
        return d.changedTouches ? d.changedTouches[0][e] : jEvent[e];
      },
      getPosition: function(wrapper, isVertical) {
        var
          e,
          position,
          g = window.getComputedStyle ? getComputedStyle(wrapper[0]) : wrapper[0].style;

        if (has3d) {
          e = g.webkitTransform.split(")")[0].split(", ");

          position = isVertical ? e[13] || e[5] : e[12] || e[4];

        } else {
          position = isVertical ? g.top.replace("px", "") : g.left.replace("px", "")
        }

        return position;
      },
      constrain: function(a, b, c) {
        return Math.max(b, Math.min(a, c))
      }
    }
  };

})($);
