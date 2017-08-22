window.App || (window.App = {});

App.Rubric12 = {

  init: function(el, options) {
    var _this = this;

    this.id = options.id;

    this.$el = $(el);

    this.options = options;

    this.$final = this.$el.find('.rubric__final');

    this.$final.length || this.createFinalScreen();

    this.$final.find('.rubric__final-message').on('click', this.showRubric.bind(this));

    this.swiper = null;

    this.$thumbs = this.$el.find('.rubric__thumbs');

    this.state = 'init';

    this.images = options.images;

    this.showAnimationScreen();

    this.initThumbs();

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

  showAnimationScreen: function () {
    var _this = this;
    // set closed
    _this.state = 'inited';
    // init slider
    _this.initSlider();
  },

  initThumbs: function() {
    var _this = this;
    // create nodes
    this.images.forEach(function(item, index) {
      var imagePath = App.getImagePath(_this.id, 'rubrics') + '/' + item.thumb;
      var image = App.getImagePath(_this.id, 'rubrics') + '/' + item.image;
      //  slideEl = $('<img src="' + imagePath + '" />').addClass('rubric_thumb');
       slideEl = $('<a href="'+image+'" style="background-image:url(' + imagePath + ')" />');
      //slideEl.click(_this.showSlider.bind(_this, index));
      slideEl.appendTo(_this.$thumbs);
    });
    	$('.rubric__thumbs a').touchTouch();
  },

  createNodes: function() {
    var _this = this, $swiper = this.$el.find('.rubric__swiper'), $swiper = this.swiper;
    // create nodes
    this.images.forEach(function(item, index) {
      var slide = $swiper.createSlide('');
      slide.setData('rubric', item);
      slide.append();

      var imagePath = App.getImagePath(_this.id, 'rubrics') + '/' + item.image,
        slideEl = $('<img src="' + imagePath + '" />');
      slideEl.appendTo(slide);
    });
  },

  initSlider: function () {

    var _this = this;

    if (this.swiper || this.state != 'inited') return;

    this.$el.removeClass('rubric_state_initialized');

    var swiper = $('.rubric__swiper');

    this.swiper = this.$el.swiper({
      mode: 'horizontal',
      loop: false,
      DOMAnimation: false,
      wrapperClass: 'rubric__container',
      slideClass: 'rubric__slide',
      onSlideChangeStart: this.process.bind(this),
      onSlideClick: this.closeSlider.bind(this),
      onTouchEnd: function () {
        var lastSlideX = _this.swiper.slidesGrid[_this.swiper.slidesGrid.length - 1];
        if (_this.swiper.positions.current <= -lastSlideX && _this.swiper.isMoved) {
          _this.options.onNext && _this.options.onNext.call(_this);
        } else if (_this.swiper.positions.current > 0) {
          _this.options.onPrev && _this.options.onPrev.call(_this);
        }
      }
    });

    this.createNodes();

    this.process();
  },

  /**
   * Process swipers
   */
  process: function() {
    var
      _this = this,
      slider = this.swiper;

    var slide = this.activeSlide;

    this.removeBindings(slide);

//вставка плеера  and App.Rubric.state=='opened'

	this.showAudio(slider.activeIndex);
//закончили вставку плеера

    this.activeSlide = slider.getSlide(slider.activeIndex);

    this.addBindings();
  },

  removeBindings: function(slide) {
    if (!slide) return;

    // @todo потом добавлю
  },

  addBindings: function() {
    if (!this.activeSlide) return;

    // @todo потом добавлю
  },

  closeSlider: function () {
    $(this.swiper.wrapper).removeClass('is-opened');
	App.isPlaying = false;
	App.playList.pause();
	$(App.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
  },

  showSlider: function (index) {
    if (index === 0) {
      this.swiper.setWrapperTranslate(0, 0, 0)
		  this.showAudio(index);
    } else {
      this.swiper.swipeTo(index);
	  	this.showAudio(index);
    }

    $(this.swiper.wrapper).addClass('is-opened');
  },

  showRubric: function () {
    if (!this.swiper || this.state != 'inited') return;

    this.$final.addClass('rubric__final_state_opened');

    this.state = 'opened';
   setTimeout(function(){
    $('.rubric__final_state_opened').hide();
    }, 500);
  },

  reset: function () {
    if (this.$el) {
      this.$el.addClass('rubric_state_initialized');
      this.$el.find('.rubric__container').css({ width: 'auto', height: 'auto' });
    }

    this.$slides && this.$slides.removeClass('rubric__slide_animation_yes');

    if (this.$final) {
      this.$final.show();
      this.$final.removeClass('rubric__final_state_opened');
      this.$final.find('.rubric__final-message').off('click');
    }

    this.$el = null;
    this.$slides = null;
    this.$final = null;

    this.id = null;
    this.options = null;
    this.state = 'reset';
    this.images = null;
    this.years = [];
    // reset active slide
    this.activeSlide = null;
  },

  destroy: function () {
    if (this.swiper) {
      this.swiper.destroy(true);
      this.swiper = null;
    }
    this.reset();
  },
 showAudio: function(slideindex){
	if((typeof(App.Rubric12.images[slideindex].sounds[0])!='undefined') && (App.Rubric12.state=='opened')){

			var pathsound=App.getAudioPath(App.Rubric12.id, App.Rubric12.images[slideindex].sounds[0].mp3);
			  var commentsound = [];
		 if (pathsound.length > 10) {
			commentsound.push({
				title: App.Rubric12.images[slideindex].sounds[0].title,
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
	}else{
		   App.isPlaying = false;
		   App.playList.pause();
			$(App.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
	}
  }
};
