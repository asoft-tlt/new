window.App || (window.App = {});

App.RubricParts = {

  init: function(el, options) {
    var _this = this;

    this.id = options.id;

    this.$el = $(el);

    this.options = options;

    this.$background = this.$el.find('.rubric__background');

    this.$final = this.$el.find('.rubric__final');

    this.$final.length || this.createFinalScreen();

    this.$final.find('.rubric__final-message').on('click', this.showRubric.bind(this));

    this.fullsize = false;

    this.animation = false;

    this.swipers = [];

    this.swiper = null;
    this.swiperOptions = null;

    this.createSections();

    this.createMainSlider();

    return this;
  },

  createFinalScreen: function () {
    var _this = this;

    this.$final = this.$el.find('.rubric__final');
    if (this.$final.length) return;

    this.$final = $('<div/>').addClass('rubric__final');

    var leftScreen = $('<div/>').addClass('rubric__final-left');
    var rightScreen = $('<div/>').addClass('rubric__final-right');
    var messageScreen = $('<div/>').addClass('rubric__final-message');

    messageScreen.on('webkitTransitionEnd', function () {
      if (_this.state == 'opened') {
        _this.$final.hide();
      }
    });

    this.$final
      .append(leftScreen)
      .append(rightScreen)
      .append(messageScreen)
      .appendTo(this.$el);
  },

  createSections: function() {
    var _this = this;

    this.$sectionsEl = this.$el.find('.rubric__sections');
    if (!this.$sectionsEl.size()) {
      this.$sectionsEl = $('<div/>').addClass('rubric__sections').appendTo(this.$el)
    }

    this.options.sections.forEach(function(section, index) {

      var item = section.images[section.active];

      var imagePath = App.getImagePath(_this.id, 'rubrics') + '/' + (index + 1) + '/' + item.image,
        imageEl = $('<div style="background-image: url(' + imagePath + ');"></div>')
          .css({
            backgroundPosition: item.positions ? item.positions.join(' ') : '0px 0px'
          })
          .addClass('rubric__section')
          .addClass('rubric__section-' + index)
          .on('click', function() {
            var count = 0;
            _this.options.sections.forEach(function(sect, i) {
              if (index > i) {
                count += sect.images.length
              }
            });
            count += section.active;

            _this.increase(count, imageEl);
          });

      _this.$sectionsEl.append(imageEl);
    });
  },

  _getSectionImageByIndex: function(index) {
    var currentIndex = index;
    var countIndex = 0;
    var data = {
      sectionIndex: null,
      imageIndex: null
    };
    this.options.sections.forEach(function(sect, i) {
      if (data.imageIndex !== null) {
        return ;
      }
      
      data.sectionIndex = i;

      if (currentIndex > (countIndex + (sect.images.length - 1))) {
        countIndex += sect.images.length
      } else {
        // data.sectionIndex = i;
        data.imageIndex = currentIndex - countIndex;
      }
    });
    return data;
  },

  createMainSlider: function() {
    var _this = this;

    this.$swiperEl = this.$el.find('.rubric__slider');
    if (!this.$swiperEl.size()) {
      this.$swiperEl = $('<div/>').addClass('rubric__slider').appendTo(this.$el)
    }
    var sliderContainer = $('<div/>').addClass('rubric__slider-container').appendTo(this.$swiperEl);

    this.options.sections.forEach(function(section, index) {
      section.images.forEach(function(item) {
        var imagePath = App.getImagePath(_this.id, 'rubrics') + '/' + (index + 1) + '/' + item.image,
          slideEl = $('<div style="background-image: url(' + imagePath + '); background-position: 0px 0px;"></div>')
            .addClass('rubric__slider-item');

        sliderContainer.append(slideEl);
      });
    });

    this.swiperOptions = {
      slidesPerView: 1,
      mode: 'horizontal',
      loop: false,
      DOMAnimation: false,
      resistance: '100%',
      wrapperClass: 'rubric__slider-container',
      slideClass: 'rubric__slider-item',
      onSlideChangeEnd: function(slider) {
        _this.onChangeSlide();
      },
      onSlideClick: _this.toggleSlider.bind(_this),
      onTouchEnd: function () {
        var lastSlideX = _this.swiper.slidesGrid[_this.swiper.slidesGrid.length - 1];
        if (_this.swiper.positions.current <= -lastSlideX && _this.swiper.touches.diff < 0) {
          // Show Globe
          _this.options.onNext && _this.options.onNext.call(_this);
        } else if (_this.swiper.positions.current >= 0 && _this.swiper.touches.diff > 0) {
          // Show Globe
          _this.options.onPrev && _this.options.onPrev.call(_this);
        }
      }
    }

    this.swiper = this.$swiperEl.swiper(this.swiperOptions);

    _this.state = 'inited';
  },

  toggleSlider: function(slider) {
    if (this.fullsize) {
      this.decrease(slider);
    } else {
      this.increase(slider);
    }
  },

  onChangeSlide: function() {
    if (!this.fullsize) return;

    var slider = this.swiper;

    // find out section
    var data = this._getSectionImageByIndex(slider.activeIndex);
    var section = this.options.sections[data.sectionIndex];
    // set active
    section.active = data.imageIndex;
    var item = section.images[data.imageIndex];
    var imagePath = App.getImagePath(this.id, 'rubrics') + '/' + (data.sectionIndex + 1) + '/' + item.image;
    // update section image
    var $sectionEl = this.$sectionsEl.find('.rubric__section-' + data.sectionIndex);
    var rect = $sectionEl[0].getBoundingClientRect();
    $sectionEl
      .css({
        backgroundImage: 'url("' + imagePath + '")'
      });

    this.$background
      .css({
        top: rect.top,
        left: rect.left,
        backgroundImage: 'url("' + imagePath + '")'
      });
  },

  increase: function (index, $element) {
    var count = 0;

    if (this.fullsize || this.animation) {
      return;
    }

    var _this = this;

    var rect = $element[0].getBoundingClientRect();
    this.$background[0].style.display = 'none';
    this.$background
      .css({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        backgroundImage: $element.css('backgroundImage'),
        backgroundPosition: $element.css('backgroundPosition')
      });
    this.$background[0].offsetHeight; // no need to store this anywhere, the reference is enough
    this.$background[0].style.display = '';

    // swipe to particular index
    this.swiper.swipeTo(index);

    // First, we need to turn off Globe animation !!!
    // _this.toggleGlobe(false);

    _this.$background.off('webkitTransitionEnd');
    //Listener to AnimationEnd Event
    _this.$background.on('webkitTransitionEnd', function () {
      if (count > 0) {
        return;
      }
      count++;

      // var slide = slider.getSlide(slider.activeIndex);
      _this.fullsize = true;
      // Set Page_slider to FullScreen mode
      _this.$el.addClass('rubric_type_fullsized');

      // Hide Background Node
      // Remove event listener
      _this.$background
        .css({ 'visibility': 'hidden' })
        .off('webkitTransitionEnd');
      _this.animation = false;

      // Show Audio Player
      // if (sliderInfo.sounds && sliderInfo.sounds.length) {
      //   App.showAndPlayAudio(sliderInfo.sounds, { id: _this.options.id });
      // }
    });

    _this.$background
      .css({ 'visibility': 'visible' })
      .addClass('fullsized');

    _this.animation = true;
  },

  decrease: function (slider) {
    if (!this.fullsize || this.animation) {
      return;
    }

    var _this = this, count = 0;

    // We have to stop Audio at first
    // App.hideAndStopAudio();

    // Show background
    _this.$background.css({ 'visibility': 'visible' });
    // Remove fullsize class
    _this.$el.removeClass('rubric_type_fullsized');

    // start animation background
    _this.$background.off('webkitTransitionEnd');
    _this.$background.on('webkitTransitionEnd', function () {
      if (count > 0) {
        return;
      }
      count++;
      _this.fullsize = false;
      // Hide Background
      _this.$background
        .css({ 'visibility': 'hidden' })
        .off('webkitTransitionEnd');
      // Can Show the Globe
      // _this.process();
      _this.animation = false;
    });

    // Start Animation
    _this.$background.removeClass('fullsized');
    _this.animation = true;
  },

  showRubric: function () {
    if (this.state != 'inited') return;

    this.$final.addClass('rubric__final_state_opened');

    this.state = 'opened';
  },

  reset: function () {
    if (this.$el) {
      this.$el.addClass('rubric_state_initialized');
      this.$el.removeClass('rubric_type_fullsized');
      this.$el.find('.rubric__container').css({ width: 'auto', height: 'auto' });
    }

    if (this.$final) {
      this.$final.show();
      this.$final.removeClass('rubric__final_state_opened');
      this.$final.find('.rubric__final-message').off('click');
    }

    this.$el = null;
    this.$final = null;

    if (this.$swiperEl && this.$swiperEl.size()) {
      this.$swiperEl.empty()
    }
    this.$swiperEl = null;

    if (this.$sectionsEl) {
      this.$sectionsEl.empty();
    }

    this.id = null;
    this.options = null;
    this.state = 'reset';
    this.fullsize = false;
  },

  destroy: function () {
    this.swipers = [];
    this.swiper && this.swiper.destroy(true);
    this.swiper = null;
    this.$background.css({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      visibility: 'hidden'
    })
      .removeClass('fullsized');
    this.reset();
  }
};
