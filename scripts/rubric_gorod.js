window.App || (window.App = {});

App.RubricGorod = {

  init: function(el, options) {
    var _this = this;

    this.id = options.id;

    this.$el = $(el);

    this.options = options;

    this.$final = this.$el.find('.rubric__final');

    this.$final.length || this.createFinalScreen();

    this.$final.find('.rubric__final-message').on('click', this.showRubric.bind(this));

    this.swipers = [];

    this.swiper = null;

    this.swiperOptions = null;

    this.$thumbs = this.$el.find('.rubric__thumbs');

    this.state = 'init';

    this.imagessssr = options.sssr.images;
    //  this.imagesrussia = options.russia.images;
    this.showAnimationScreen();
    this.openrazdel = 'russia';
    this.initThumbs();
    this.pleernow = -1;
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

  showAnimationScreen: function() {
    var _this = this;
    // set closed
    _this.state = 'inited';
    // init slider
    _this.initSlider();
  },

  initThumbs: function() {
    var _this = this;
    // create nodes

    if($('.rubric__thumd-page-sssr').length > 0)  return;
    var thumbspagesssr = $('<div/>').addClass('rubric__thumd-page-sssr').addClass('is-opened');
    thumbspagesssr.appendTo(_this.$thumbs);
    this.imagessssr.forEach(function(item, index) {
      var imagePath = App.getImagePath(_this.id, 'rubrics') + '/thumb/sssr/' + item.thumb,
        slideEl = $('<img src="' + imagePath + '" />').addClass('rubric_thumb');
      slideEl.click(_this.showSlider.bind(_this, index));
      slideEl.appendTo(thumbspagesssr);
    });

    $('<div/>').addClass('ico').appendTo(_this.$thumbs).on('click', _this.showInfo.bind()).hide();
    $('<div/>').addClass('inf').appendTo(_this.$thumbs).click(function() {
      $('.inf').hide();
      return false;
    });

  },

  createNodes: function(index) {
    var _this = this,
      $swiper = this.$el.find('.rubric__swiper'),
      $swiper = this.swiper;
    // create nodes
    for (var i = 1; i <= this.imagessssr[index].image[1]; i++) {
      var slide = $swiper.createSlide('');
      slide.setData('rubric', this.imagessssr[index].image[0]);
      slide.append();
      var imagePath = App.getImagePath(_this.id, 'rubrics') + '/full/sssr/' + this.imagessssr[index].image[0] + '_' + i + '.jpg';
      var imagePathIco = App.getImagePath(_this.id, 'rubrics') + '/inf/' + this.imagessssr[index].image[0] + '_' + i + '.png';
      var slideEl = $('<img src="' + imagePath + '" idimgrazdel="' + index + '" mp3num="' + i + '" ico="' + imagePathIco + '" />');
      slideEl.appendTo(slide);
    }
    slide = null;
    imagePath = null;
    imagePathIco = null;
    slideEl = null;
  },

  destroyNodes: function() {
    var _this = this,
      $swiper = this.$el.find('.rubric__swiper'),
      $swiper = this.swiper;
    $swiper.removeAllSlides();
  },

  initSlider: function() {

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
      onTouchEnd: function() {

        var lastSlideX = _this.swiper.slidesGrid[_this.swiper.slidesGrid.length - 1];
        if (_this.swiper.positions.current <= -lastSlideX && _this.swiper.isMoved) {

          setTimeout(App.RubricGorod.closeSlider(), 2000);
          //  _this.options.onNext && _this.options.onNext.call(_this);
          //  alert('123');
        } else if (_this.swiper.positions.current > 0) {
          setTimeout(App.RubricGorod.closeSlider(), 2000);
          //   _this.options.onPrev && _this.options.onPrev.call(_this);
          //       alert('321');
        }
        lastSlideX = null;
      }
    });
    //  this.createNodes();
    this.process();
    swiper = null;
  },

  /**
   * Process swipers
   */

  process: function() {
    var
      _this = this,
      slider = this.swiper;

    var t = $('.rubric__slide').eq(slider.previousIndex).find('img').attr('name');
    //    if(t==='last'){this.closeSlider();}
    var slide = this.activeSlide;
    var imgnumrazdel = $(this.activeSlide).find('img').eq(0).attr('idimgrazdel');
    var mp3num = $(this.activeSlide).find('img').eq(0).attr('mp3num');
    //alert(razdel);
    this.removeBindings(slide);
    this.activeSlide = slider.getSlide(slider.activeIndex);
    this.showAudio(imgnumrazdel, mp3num);

    this.addBindings();
    _this = null;
    slider = null;
    slide = null;
    imgnumrazdel = null;
    mp3num = null;
  },

  removeBindings: function(slide) {
    if (!slide) return;

    // @todo потом добавлю
  },

  addBindings: function() {
    if (!this.activeSlide) return;

    // @todo потом добавлю
  },

  closeSlider: function() {
    $(this.swiper.wrapper).removeClass('is-opened');
    $('.rubric__thumd-navigation').addClass('is-opened');
    /* App.isPlaying = false;
     App.playList.pause();
     $(App.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
     this.pleernow=-1;*/
    $('.ico').hide();
    App.hideAndStopAudio();
    this.destroyNodes();
  },
  showRubricPage: function(id) {
    var delid = 'russia';
    if (id === 'russia') {
      delid = 'sssr';
    }
    this.openrazdel = id;
    this.$el.find('.rubric__thumd-page-' + delid).addClass('is-opened');
    this.$el.find('.rubric__thumd-page-' + id).removeClass('is-opened');
    delid = null;
  },
  showSlider: function(index) {
    //this.swiper.swipeTo(index);
    this.createNodes(index);
    $('.ico').show();
    $(this.swiper.wrapper).addClass('is-opened');
  },
  showInfo: function(item) {
    var ico = $('.rubric_type_gorod .swiper-slide-active img').eq(0).attr('ico');
    $('.inf').css('background-image', 'url("' + ico + '")');
    $('.inf').show();
    ico = null;
    return false;
  },

  showRubric: function() {
    if (!this.swiper || this.state != 'inited') return;

    this.$final.addClass('rubric__final_state_opened');

    this.state = 'opened';
  },

  reset: function() {
    if (this.$el) {
      this.$el.addClass('rubric_state_initialized');
      this.$el.find('.rubric__container').css({
        width: 'auto',
        height: 'auto'
      });
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

  destroy: function() {
    if (this.swiper) {
      this.swiper.destroy(true);
      this.swiper = null;
    }
    this.reset();
  },
  showAudio: function(slideindex, mp3index) {
    var dataRubric = App.RubricGorod.options[this.openrazdel];
    if ((App.RubricGorod.state == 'opened') &&
      (typeof(dataRubric) != 'undefined') &&
      (typeof(dataRubric.images) != 'undefined') &&
      (typeof(dataRubric.images[slideindex]) != 'undefined') &&
      (typeof(dataRubric.images[slideindex].sounds) != 'undefined')) {
      //var sounds=dataRubric.images[slideindex].sounds;
      App.showAndPlayAudio(dataRubric.images[slideindex].sounds, App.RubricGorod.options);
      /*if( typeof(sounds[mp3index])!='undefined' ){
		 var pathsound=App.getAudioPath(App.RubricGorod.options.id, sounds[mp3index].mp3);
		 var commentsound = [];
		 if (pathsound.length > 10) {
		   commentsound.push({
			title: sounds[mp3index].title,
			mp3: pathsound
		   });

			// set new playlist

			App.playList._initPlaylist(commentsound);
			// refresh playlist
			App.playList._refresh(true);
			// select first item
			App.playList.play(0);

			$(App.options.circlePlayer.cssSelector).addClass('audio-player_show_yes');

			App.isPlaying = true;
			this.pleernow=slideindex;

		 }
		}else{
		App.isPlaying = false;
		   App.playList.pause();
			$(App.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
			this.pleernow=-1;
		}*/
    } else {
      App.hideAndStopAudio();
      /*
		 App.isPlaying = false;
		   App.playList.pause();
			$(App.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
			this.pleernow=-1;*/
    }
    dataRubric = null;
  }

};
