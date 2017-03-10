window.App || (
  window.App = {});

var PageSlider = function (el, options) {

  var _this = this;

  this.active = true;

  this.$el = $(el);

  this.options = options;

  // background node for animation
  this.$background = $('.page-slider-background');

  // wrapper of slider
  this.$wrapper = this.$el.parents('.page__column');

  // is Fullsized screen
  this.fullsize = this.$wrapper.hasClass('page__column_type_fullsized');

  this.constant = this.$el.hasClass('page-slider_type_constant');

  this.direction = this.$el.hasClass('page-slider_align_left') ? 'left' : (this.$el.hasClass('page-slider_align_right') ? 'right' : null);

  this.swiper = this.$el.swiper({
    mode: 'horizontal',
    loop: false,
    DOMAnimation: false,
    resistance: '100%',
    wrapperClass: 'page-slider__container',
    slideClass: 'page-slider__item',
    pagination: this.$wrapper.find('.page-slider__pagination')[0],
    onSlideChangeStart: this.process.bind(this),
    onSlideChangeEnd: this.constant ? function(){} : function() {
      _this.setBackgroundImage();
    },
    onSlideClick: this.constant ? function () {
    } : this.toggleSlider.bind(this),
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
  });

  this.init();

};

PageSlider.prototype = {

  init: function() {
    var _this = this;

    this.active = true;

    // cache active index
    this.activeIndex = this.swiper.activeIndex;

    // Init Animation Background
    this.initBackground();

    this.process();
  },

  toggleSlider: function () {

    this.$wrapper.off("webkitTransitionEnd");

    if (this.fullsize) {
      this.decrease();
    } else {
      this.increase();
    }
  },

  initBackground: function() {
    var
      slide = this.swiper.getSlide(this.swiper.activeIndex),
      $slide = $(slide),
      $image = $slide.find('.page-slider__image'),
      top = this.$el.css('top'),
      left = this.$el.css('left'),
      size = $image.data('size');

    this.$background
      .removeClass('right')
      .removeClass('left')
      .addClass(this.direction)
      .removeClass('page-slider-background_type_sized')
      .css({
        top: top,
        left: left,
        width: this.$el.css('width'),
        height: this.$el.css('height'),
        backgroundImage: $image.css('backgroundImage'),
        backgroundPosition: $image.css('backgroundPosition'),
        backgroundSize: $image.hasClass('page-slider__image_type_sized') && size ? size : ''
      });

    if ($image.hasClass('page-slider__image_type_sized')) {
      this.$background.addClass('page-slider-background_type_sized');
    }
  },

  setBackgroundImage: function() {
    if (!this.active) return;

    var
      slide = this.swiper.getSlide(this.swiper.activeIndex),
      $slide = $(slide),
      $image = $slide.find('.page-slider__image'),
      size = $image.data('size');

    this.$background
      .removeClass('page-slider-background_type_sized')
      .css({
        backgroundImage: $image.css('backgroundImage'),
        backgroundPosition: $image.css('backgroundPosition'),
        backgroundSize: $image.hasClass('page-slider__image_type_sized') && size ? size : ''
      });

    if ($image.hasClass('page-slider__image_type_sized')) {
      this.$background.addClass('page-slider-background_type_sized');
    }
  },

  increase: function () {
    if (this.fullsize) {
      return;
    }

    var _this = this;

    // First, we need to turn off Globe animation !!!
    _this.toggleGlobe(false);

    _this.$background.off('webkitTransitionEnd');
    //Listener to AnimationEnd Event
    _this.$background.on('webkitTransitionEnd', function () {
      var sliderInfo = _this.options.slides[_this.swiper.activeIndex];
      _this.fullsize = true;
      // Set Page_slider to FullScreen mode
      _this.$el.addClass('page-slider_type_fullsized');
      // Recalculate swiper dimensions
      _this.swiper.resizeFix(true);
      // Hide Background Node
      // Remove event listener
      _this.$background
        .css({ 'visibility': 'hidden' })
        .off('webkitTransitionEnd');
      // Show Audio Player
      if (sliderInfo.sounds && sliderInfo.sounds.length) {
        App.showAndPlayAudio(sliderInfo.sounds, { id: _this.options.id });
      }
    });

    this.$background
      .show()
      .css({ 'visibility': 'visible'})
      .addClass('fullsized');
  },

  decrease: function () {

    if (!this.fullsize) {
      return;
    }

    var _this = this;

    // We have to stop Audio at first
    App.hideAndStopAudio();

    // Show background
    this.$background.css({ 'visibility': 'visible' });
    // Remove fullsize class
    _this.$el.removeClass('page-slider_type_fullsized');

    _this.$background.off('webkitTransitionEnd');
    _this.$background.on('webkitTransitionEnd', function () {
      _this.fullsize = false;
      // Show Swiper
      // Recalculate swiper dimensions
      _this.swiper.resizeFix(true);
      // Hide Background
      _this.$background
        .css({ 'visibility': 'hidden' })
        .off('webkitTransitionEnd');
      // Can Show the Globe
      _this.process();
    });
    // Start Animation
    _this.$background.removeClass('fullsized');
  },

  toggleGlobe: function (show) {
    App[show ? 'showGlobe' : 'hideGlobe']();
  },

  process: function () {
    if (!this.active) return;

    var
      oldSliderInfo = this.options.slides[this.activeIndex],
      sliderInfo = this.options.slides[this.swiper.activeIndex];

    if (sliderInfo.map && !this.fullsize) {
      App.showGlobe();
    } else if (oldSliderInfo.map) {
      App.hideGlobe();
    }

    if (sliderInfo.sounds && sliderInfo.sounds.length && this.fullsize) {
      App.showAndPlayAudio(sliderInfo.sounds, { id: this.options.id });
    } else if (oldSliderInfo.sounds) {
      App.hideAndStopAudio();
    }
  },

  reset: function () {
    if (this.constant) {
      return;
    }

    this.active = false;

    this.$el.removeClass('page-slider_type_fullsized');
    this.$el.off('webkitTransitionEnd');
    this.swiper.resizeFix(true);

    // unset fullsize
    this.$background.removeClass('fullsized');

    // set fullsize to false
    this.fullsize = false;
    // Show Globe
    this.toggleGlobe(false);

    this.swiper.swipeTo(0);
  },

  destroy: function () {
    // Remove additional classes
    this.reset();

    this.swiper.destroy(true);
    this.swiper = null;
    this.$el.off('click');
  }
};

App.PageSlider = PageSlider;
