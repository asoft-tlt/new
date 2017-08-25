window.App || (window.App = {});

App.RubricSlider = {

  init: function(el, options) {
    var _this = this;

    this.id = options.id;

    this.$el = $(el);

    this.options = options;

    this.$final = this.$el.find('.rubric__final');

    this.$final.length || this.createFinalScreen();

    this.$final.find('.rubric__final-message').on('click', this.showSlider.bind(this));

    this.swiper = null;
    // active slide
    this.activeSlide = null;

    this.state = 'init';

    this.images = options.images;

    this.createSlides();

    this.initSlider();

    return this;
  },

  createFinalScreen: function() {
    var _this = this;

    this.$final = this.$el.find('.rubric__final');
    if (this.$final.length) return;

    this.$final = $('<div/>').addClass('rubric__final');

    var leftScreen = $('<div/>').addClass('rubric__final-left');
    var rightScreen = $('<div/>').addClass('rubric__final-right');
    var messageScreen = $('<div/>').addClass('rubric__final-message');

    messageScreen.on('webkitTransitionEnd', function() {
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

  closeSlider: function () {
    var _this = this;
    if (!this.swiper || this.state != 'opened') return;

    this.$final.show();
    setTimeout(function () {
      _this.$final.removeClass('rubric__final_state_opened');
    }, 100);
	if((typeof(App.RubricSlider.options.sounds)!='undefined') ){
	  App.isPlaying = false;
	  App.playList.pause();
	  $(App.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
	}
    this.state = 'inited';
  },

  showSlider: function () {
    if (!this.swiper || this.state != 'inited') return;

    this.$final.addClass('rubric__final_state_opened');

    this.state = 'opened';
	/*добавляем музыку */
	if((typeof(App.RubricSlider.options.sounds)!='undefined') ){
		var pathsound=App.getAudioPath('14-2', App.RubricSlider.options.sounds.mp3);
		  var commentsound = [];
     if (pathsound.length > 10) {
	    commentsound.push({
	        title: App.RubricSlider.options.sounds.title,
	        mp3: pathsound
	    })
	 
	    // set new playlist
	    App.playList._initPlaylist(commentsound);
	    // refresh playlist
	    App.playList._refresh(true);
	    // select first item
	    App.playList.play(0);

	    $(App.options.circlePlayer.cssSelector).addClass('audio-player_show_yes');

	    App.isPlaying = true;
	 }
	}
  setTimeout(function(){
    $('.rubric__final_state_opened').hide();
    }, 500);
  },

  createSlides: function() {
    var _this = this;
    var container = this.$el.find('.rubric__container');
    if (container.find('.rubric__slide').size()) {
      // set closed
      this.state = 'inited';
      return;
    }
    this.images.forEach(function(item) {
      var imagePath = App.getImagePath(_this.id, 'rubrics') + '/' + item.image,
          slideEl = $('<img src="' + imagePath + '" />');
      slideEl.addClass('rubric__slide');
      slideEl.appendTo(container);
    });
    // set closed
    this.state = 'inited';
  },

  initSlider: function () {

    var _this = this;

    if (this.swiper || this.state != 'inited') return;

    this.$el.removeClass('rubric_state_initialized');

    this.swiper = this.$el.swiper({
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      mode: 'horizontal',
      loop: false,
      DOMAnimation: false,
      wrapperClass: 'rubric__container',
      slideClass: 'rubric__slide',
      onSlideClick: this.closeSlider.bind(this),
      onTouchEnd: function () {
        var lastSlideX = _this.swiper.slidesGrid[_this.swiper.slidesGrid.length - 1];
        if (_this.swiper.positions.current <= -lastSlideX && _this.swiper.isMoved) {
          _this.options.onNext && _this.options.onNext.call(_this);
        } else if (_this.swiper.positions.current > 0) {
          _this.options.onPrev && _this.options.onPrev.call(_this);
        }
      },
      onSlideChangeStart: function() {
        _this.setPagination()
      }
    });

    this.setPagination();
  },

  setPagination: function() {
    this.$el.find('.rubric__pages').html(
      '<div class="rubric__page-wrapper">' +
        '<div class="rubric__page rubric__page_first">' + (this.swiper.activeIndex + 1) + '</div>' +
        '<div class="rubric__page rubric__page_separator"></div>' +
        '<div class="rubric__page rubric__page_second">' + this.swiper.slides.length + '</div>' +
      '</div>'
    )
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

    this.id = null;
    this.options = null;
    this.state = 'reset';
  },

  destroy: function () {
    this.swiper && this.swiper.destroy(true);
    this.swiper = null;
    this.reset();
  }
};