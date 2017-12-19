window.App || (window.App = {});

App.Rubric = {

  init: function (el, options) {
    var _this = this;

    this.id = options.id;

    this.$el = $(el);

    this.$pagination = this.$el.find('.rubric__pagination-container');

    this.$final = this.$el.find('.rubric__final');

    this.$slides = this.$el.find('.rubric__slide');

    this.options = options;

    this.$final.length || this.createFinalScreen();

    this.$final.find('.rubric__final-message').on('click', this.showSlider.bind(this));

    this.swiper = null;
    // active slide
    this.activeSlide = null;

    this.state = 'init';

    this.images = options.images;
    this.years = [];

    this.showAnimationScreen();

    return this;
  },

  createFinalScreen: function () {

    var _this = this;

    this.$final = this.$el.find('.rubric__final');
    if (this.$final.length) return;

    this.$final = $('<div/>').addClass('rubric__final')

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

  initSlider: function () {

    var _this = this;

    if (this.swiper || this.state != 'inited') return;

    this.$el.removeClass('rubric_state_initialized');

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
        } else { // move year
          var item = _this.swiper.getSlide(_this.swiper.activeIndex).getData('rubric');
          var index = _this.years.indexOf(item.year);
          if(index === -1) {
            console.warn('Year is not defined! Item: ', item);
            return false;
          }

        }
        if (_this.paginationSwiper.activeIndex !== index) {
          _this.paginationSwiper.swipeTo(index);
        }
      }
    });

    this.paginationSwiper = this.$pagination.swiper({
      mode: 'horizontal',
      loop: false,
      DOMAnimation: false,
      wrapperClass: 'rubric__pagination-swiper',
      slideClass: 'rubric__pagination-slide',
      onSlideChangeStart: this.process.bind(this),
      onTouchEnd: function () {
        var slide = _this.paginationSwiper.getSlide(_this.paginationSwiper.activeIndex);
        var item = slide.getData('rubric');
        var index = _this.images.indexOf(item);
        if (index === -1) {
          return false;
        }
        if (_this.swiper.activeIndex !== index) {
          _this.swiper.swipeTo(index);
        }
      },
      slidesPerView: 5,
      centeredSlides: true,
      spaceBetween: 30,
      longSwipes: false,
      touchRatio: 0.2
    });

    // Initialization years list
    this.paginationSwiper.slides.forEach(function(slide) {
      var item = slide.getData('rubric');
      if (!item) {
        console.warn('Item is not defined in PaginationSwiper. Slide: ', slide);
        return;
      }
      _this.years.push(item.year);
    });


    this.process();
  },

  /**
   * Process swipers
   */
  process: function() {
    var
      _this = this,
      slider = this.swiper;

    this.processPage(slider);

    for (var i = slider.activeIndex - 12; i <= slider.activeIndex + 12; i++) {
      if (i <= slider.activeIndex - 12 && i >= 0) {
        // remove
        _this.resetPage(i);
      } else if (i >= slider.activeIndex + 12) {
        // remove
        _this.resetPage(i);
      } else if (i >= 0 && (i > slider.activeIndex - 12) && (i < slider.activeIndex + 12)) {
        // init
        _this.initPage(i);
      }
    }
  },

  processPage: function (slider) {
    var slide = this.activeSlide;

    this.removeBindings(slide);

//вставка плеера  and App.Rubric.state=='opened'
if((typeof(App.Rubric.images[slider.activeIndex].sounds)!='undefined') && (App.Rubric.state=='opened')){
    var commentsound = [];

 for (var indSound in App.Rubric.images[slider.activeIndex].sounds){
 var rubricSounds= App.Rubric.images[slider.activeIndex].sounds[indSound];
		var pathsound=App.getAudioPath('7-1', rubricSounds.mp3);
     if (rubricSounds.title !== undefined) {
	    commentsound.push({
	        title: rubricSounds.title,
	        mp3: pathsound
	    });
     }
     	 }
	   // this.playList.jSelect.hide();
	    // set new playlist
      App.showAndPlayAudio(commentsound);
	  //  App.playList._initPlaylist(commentsound);
	    // refresh playlist
	  //  App.playList._refresh(true);
	    // select first item
	   // App.playList.play(0);

	   // $(App.options.circlePlayer.cssSelector).addClass('audio-player_show_yes');

	    //App.isPlaying = true;

}else{
  App.hideAndStopAudio();
	 //  App.isPlaying = false;
	  // App.playList.pause();
	  //  $(App.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
}
//закончили вставку плеера
    this.activeSlide = slider.getSlide(slider.activeIndex);

    this.addBindings();
  },

  removeBindings: function(slide) {
    if (!slide) return;
    App.hideGlobe();
    // @todo потом добавлю
  },

  addBindings: function() {
    if (!this.activeSlide) return;
    if (this.activeSlide.map) {
        setTimeout(function () {
            App.showGlobe();
        }, 500);
    }


    // @todo потом добавлю
  },

  resetPage: function(index) {
    var
      slide = this.swiper.getSlide(index),
      item = this.images[index],
      content = '';
    if (!slide || !item) {
      return;
    }

    // Clearing child node
    while (slide.firstChild) {
      slide.removeChild(slide.firstChild);
    }
  },

  initPage: function(index) {
    var
      _this = this,
      slide = this.swiper.getSlide(index),
      item = this.images[index],
      content = '';

    if (slide && slide.children.length || !item) {
      return;
    }

    if (!slide) {
      slide = this.swiper.createSlide(content);
      slide.setData('rubric', item);
      slide.append();

    }

    var imagePath = App.getImagePath(this.id, 'rubrics') + '/' + item.id + '.jpg',
    slideEl = $('<img src="' + imagePath + '" />');
    slideEl.appendTo(slide);


    if(item.map){
      geoEl = $('<div class="page__map" onclick="javascript:App.hideMap();">'+
                  '<div class="page__map-container">'+
                      '<div class="closebut" onclick="javascript:App.hideMap();"></div>'+
                      '<iframe src="geo/7-1-'+item.id+'.html" width="1024" height="768" />'+
                  '</div>'+
                '</div>');
      console.log(item.id);

    }


    // init pagination swiper
    // calculate years...
    this.initPagination(index);
  },

  initPagination: function(index) {
    var slide;

    for (var i = index; i < index + 15; i++) {
      var currentItem = this.images[i];
      if (!currentItem) {
        continue;
      }
      if (!currentItem.year) {
        console.warn('YEAR is not defined: ', currentItem);
        continue;
      }
	  	//console.log('showSlide'+this.currentItem.sounds);
		//App.playList.play(0);
		 //App.isPlaying = true;
      if (this.years.indexOf(currentItem.year) === -1) {
        slide = this.paginationSwiper.createSlide(currentItem.year);
        slide.setData('rubric', currentItem);
        slide.append();
        this.years.push(currentItem.year);


      }
    }
  },

  closeSlider: function () {
    var _this = this;
    if (!this.swiper || this.state != 'opened') return;

    this.$final.show();
    setTimeout(function () {
      _this.$final.removeClass('rubric__final_state_opened');
    }, 100);

    this.state = 'inited';
  },

  showSlider: function () {
    if (!this.swiper || this.state != 'inited') return;

    this.$final.addClass('rubric__final_state_opened');

    this.state = 'opened';
	//consol.log(this.$final.id);
	/*вставка слайдера если он на первой странице*/
	if((typeof(App.Rubric.images[0].sounds)!='undefined') && (App.Rubric.state=='opened')){

		var pathsound=App.getAudioPath('7-1', App.Rubric.images[0].sounds.mp3);
		  var commentsound = [];
     if (pathsound.length > 10) {
	    commentsound.push({
	        title: App.Rubric.images[0].sounds.title,
	        mp3: pathsound
	    })

	   // this.playList.jSelect.hide();
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

    if (this.paginationSwiper) {
      this.paginationSwiper.destroy(true);
      this.paginationSwiper = null;
    }

    this.reset();
  }
};
