// New file for book
window.Modernizr = {
  csstransforms: true
};

window.App = {

  Templates: {
    items: {},
    put: function (key, template) {
      this.items[key] = template;
    },
    'get': function (key) {
      return this.items[key] || null;
    }
  },

  options: {
    circlePlayer: {
      cssSelector: '.audio-player_circle_true'
    },
    globeSelector: '.globe'
  },

  tasks: [],

  init: function () {

    var _this = this;

    this.section = 0;

    this.slide = null;

    this.player = null;

    this.circlePlayer = new CirclePlayer('.audio-player', {}, {
      cssSelectorAncestor: this.options.circlePlayer.cssSelector,
      swfPath: 'scripts/',
      supplied: 'mp3',
      wmode: 'window',
      keyEnabled: true
    });

    // init playList
    this.playList = new jPlayerPlaylist({
      jPlayer: '.audio-player',
      cssSelectorAncestor: this.options.circlePlayer.cssSelector
    }, [], {
      cssSelectorAncestor: this.options.circlePlayer.cssSelector,
      swfPath: 'scripts/',
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      autoPlay: false
    });

    this.circlePlayer.player.bind($.jPlayer.event.play, function() {
      var jSelect = _this.playList.jSelect.data('jSelect');
      jSelect.scrollTo(jSelect.wrapper, 0, _this.playList.current, 0.1, true);
    });

    this.playList.jSelect = $('.jp-playlist-wrapper').jSelect({
      callbacks: {
        onValueTap: function(data) {
          _this.playList.play(data.index);
        },
        onChange: function(data) {
          _this.playList.play(data.index);
        }
      }
    });

    this.$el = $('.swiper-container.page');

    this.$elmenu = $('.swiper-container.menu');

    this.$article = $('.article');

    this.$globe = $(this.options.globeSelector || '.globe');
    
    this.$background = $('.page-background');
    this.backgroundSlider = this.$background.swiper({
      mode: 'horizontal',
      slideClass: 'page-background__item',
      wrapperClass: 'page-background__wrapper',
      loop: false,
      DOMAnimation: false,
      speed: 300,
      onSlideClick: this.closeBackground.bind(this)
    });

    // Hide articles
    $(document.body).on('click', this.hideArticle.bind(this));

    $(document.body).on('click', '.app-background', this.openBackground.bind(this));
    // this.$background.on('click', this.closeBackground.bind(this));

    this.slider = this.$el.swiper({
      mode: 'horizontal',
      loop: false,
      DOMAnimation: false,
      speed: 300,
      noSwiping: true,
      noSwipingClass: 'swiper-slide-hold',
      onSlideChangeStart: this.process.bind(this)
    });


    this.menuslider = this.$elmenu.swiper({
//	direction: 'vertical',
	speed: 100,
	width: 1024,
	slidesPerView: 12,
	freeMode: true,
	slidesPerColumn: 4,
        //touchRatio: 0.1,
        slideToClickedSlide: true,
        onSlideClick: function() {
				var menulink = App.menuslider.clickedSlideIndex;
				if(App.slider.slides.length >= menulink) {
					App.slider.swipeTo(menulink);
				}
				else {
					//$('.loader').show();
					for(var si=App.slider.slides.length; si<= menulink; si++){
					App.initPage(si);
					}
					//$('.loader').hide();
					App.slider.swipeTo(menulink);

				}		
				}
    });


    this.process(this.slider);
  },

  // Initializing page content into slide
  initPage: function(index) {
    var
      _this = this,
      slide = App.slider.getSlide(index),
      page = App.pages[index],
      content = '';
     
    if (slide && slide.children.length) {
      return;
    }

    switch (page.type) {
      case 'video':
        var videoPath = 'video/pages/' + page.id + '/' + page.video;
        content = '<video src="' + videoPath + '" autoplay="autoplay"><source src="' + videoPath + '" type="video/mp4;"></source></video>';
        break;
      default:
        content = this.Templates.get(page.template);
    }

    if (!slide) {
      slide = App.slider.createSlide(content);
      slide.setData('page', page);
      slide.append();
    } else {
      $(slide).append(content);
    }

    // post handling
    switch (page.type) {
      case 'video':
        break;
      case 'rubric':
        var rubricEl = $('<div/>').addClass('rubric')
            .addClass('rubric_state_initialized')
            .addClass('rubric_num_' + page.id),
          rubricContainerEl = $('<div/>').addClass('rubric__container'),
          rubricPaginationEl = $('<div/>').addClass('rubric__pagination'),
          rubricPaginationContainerEl = $('<div/>').addClass('rubric__pagination-container'),
          rubricPaginationSwiperEl = $('<div/>').addClass('rubric__pagination-swiper');
        rubricPaginationContainerEl.append(rubricPaginationSwiperEl);
        rubricPaginationEl.append(rubricPaginationContainerEl);
        rubricEl.append(rubricPaginationEl);
        rubricEl.append(rubricContainerEl);

        rubricEl.appendTo(slide);
        break;
      case 'rubric_parts':
        var rubricEl = $('<div/>').addClass('rubric')
          .addClass('rubric_state_initialized')
          .addClass('rubric_type_parts')
          .addClass('rubric_num_' + page.id),
          rubricContainerEl = $('<div/>').addClass('rubric__container'),
          rubricBackgroundEl = $('<div/>').addClass('rubric__background'),
          rubricThumbsEl = $('<div/>').addClass('rubric__thumbs');

        rubricContainerEl.append(rubricThumbsEl);
        rubricEl.append(rubricContainerEl);
        rubricEl.append(rubricBackgroundEl);

        rubricEl.appendTo(slide);
        break;
      case 'rubric_slider':
        var rubricEl = $('<div/>').addClass('rubric')
          .addClass('rubric_state_initialized')
          .addClass('rubric_type_slider')
          .addClass('rubric_num_' + page.id),
          rubricContainerEl = $('<div/>').addClass('rubric__container'),
          rubricPaginationEl = $('<div/>').addClass('rubric__pages');
        rubricEl.append(rubricContainerEl);
        rubricEl.append(rubricPaginationEl);
        rubricEl.appendTo(slide);
        break;
      case 'rubric_raskol':
        var rubricEl = $('<div/>').addClass('rubric')
          .addClass('rubric_state_initialized')
          .addClass('rubric_type_raskol')
          .addClass('rubric_num_' + page.id),
          rubricContainerEl = $('<div/>').addClass('rubric__container');
        rubricEl.append(rubricContainerEl);
        rubricEl.appendTo(slide);
        break;
      case 'rubric_12':
        var rubricEl = $('<div/>').addClass('rubric')
          .addClass('rubric_state_initialized')
          .addClass('rubric_type_12')
          .addClass('rubric_num_' + page.id),
          rubricContainerEl = $('<div/>').addClass('rubric__container'),
          rubricThumbsEl = $('<div/>').addClass('rubric__thumbs');

        rubricEl.append(rubricContainerEl);
        rubricEl.append(rubricThumbsEl);

        rubricEl.appendTo(slide);
        break;
        case 'rubric_gorod':
        var rubricEl = $('<div/>').addClass('rubric')
          .addClass('rubric_state_initialized')
          .addClass('rubric_type_gorod')
          .addClass('rubric_num_' + page.id),
          rubricContainerEl = $('<div/>').addClass('rubric__container'),
          rubricThumbsEl = $('<div/>').addClass('rubric__thumbs');
       
        rubricEl.append(rubricContainerEl);
        rubricEl.append(rubricThumbsEl);

        rubricEl.appendTo(slide);
        break;      
      default:
        // handle slider
        if (page.slides) {
          var internalSlider = slide.querySelector('.page-slider__container');
          internalSlider && page.slides.forEach(function (info) {
            var
              item = $('<div/>').addClass('page-slider__item'),
              imagePath = _this.getImagePath(page.id) + '/' + info.image;
            var image = $('<div style="background-image:url(' + imagePath + ')" />')
              .attr('data-image', imagePath)
              .addClass('page-slider__image');

            if (info.positions) {
              image.css({
                backgroundPosition: [info.positions.left, info.positions.top].join(' ')
              });
            }

            if (info.zoom) {
              image
                .addClass('page-slider__image_type_sized')
                .data('size', 'auto ' + info.zoom)
                .css({
                  backgroundSize: 'auto ' + info.zoom
                })
              ;
            }
            item.append(image);
            info.description && item.append($('<div/>').addClass('page-slider__description').html(info.description));
            // appending to slider node
            item.appendTo(internalSlider);
          });
        
        }
    }
  },

  // Clear page content into slide
  resetPage: function(index) {
    var
      slide = App.slider.getSlide(index),
      page = App.pages[index],
      content = '';
    if (!slide) {
      return;
    }
    // destroy page slider
    if (page.slider) {
      page.slider.destroy();
      page.slider = null;
    }


    // Clearing child node
    while (slide.firstChild) {
       slide.removeChild(slide.firstChild);
    }
  },

  process: function (slider) {
    var _this = this;

    this.processPage(slider);

    setTimeout(function() {
      for (var i = slider.activeIndex - 3; i <= slider.activeIndex + 3; i++) {
        if (i == slider.activeIndex - 3 && i >= 0) {
          // remove
          _this.resetPage(i);
        } else if (i == slider.activeIndex + 3) {
          // remove
          _this.resetPage(i);
        } else if (i >= 0 && (i > slider.activeIndex - 3) && (i < slider.activeIndex + 3)) {
          // init
          _this.initPage(i);
        }
      }
    }, 300);
  },

  processPage: function (slider) {
    var slide = this.slide;

    this.removeBindings(slide);

    this.slide = slider.getSlide(slider.activeIndex);

    this.addBindings();
  },

  addBindings: function () {
    if (!this.slide) return;

    var page = this.slide.getData('page');


    switch (page.type) {
      case 'video':
        this.videoStart(this.slide.querySelector('video'));
        break;
      case 'page':
        if (page.slides && !page.slider) {
          page.slider = new App.PageSlider($(this.slide).find('.page-slider'), $.extend({
            onNext: this.goToNextPage.bind(this),
            onPrev: this.goToPrevPage.bind(this)
          }, page));
        }
        // first initialization   
        page.slider && page.slider.init();

        if (page.sounds && page.sounds.length) {
          setTimeout(function () {
            App.showAndPlayAudio(page.sounds, { id: page.id });
          }, 0);
        }
        // Add Handler to Article Link
        $(this.slide).on('click', '.article-link', this.showArticle.bind(this));

/**/
        $(this.slide).on('doubletap', '.page', function(){$('.swiper-container.menu').toggle()});
        $(document).on('tap', '.clsb', function(){$('.swiper-container.menu').hide()});
/**/

        if (page.map) {
		setTimeout(function () {
			 App.showGlobe();
		 }, 500);
	}
/*
        if (page.videoflag) {
		App.searchVideo();
	}
*/
        break;
      case 'rubric':
        page.rubric = App.Rubric.init($(this.slide).find('.rubric'), $.extend({
          onNext: this.goToNextPage.bind(this),
          onPrev: this.goToPrevPage.bind(this)
        }, page));
        break;
      case 'rubric_slider':
        page.rubric = App.RubricSlider.init($(this.slide).find('.rubric'), $.extend({
          onNext: this.goToNextPage.bind(this),
          onPrev: this.goToPrevPage.bind(this)
        }, page));
        break;
      case 'rubric_12':
        page.rubric = App.Rubric12.init($(this.slide).find('.rubric'), $.extend({
          onNext: this.goToNextPage.bind(this),
          onPrev: this.goToPrevPage.bind(this)
        }, page));
        break;
      case 'rubric_gorod':
        page.rubric = App.RubricGorod.init($(this.slide).find('.rubric'), $.extend({
          onNext: this.goToNextPage.bind(this),
          onPrev: this.goToPrevPage.bind(this)
        }, page));
        break;   
      case 'rubric_raskol':
        page.rubric = App.RubricRaskol.init($(this.slide).find('.rubric'), $.extend({
          onNext: this.goToNextPage.bind(this),
          onPrev: this.goToPrevPage.bind(this)
        }, page));
        break;
      case 'rubric_parts':
        page.rubric = App.RubricParts.init($(this.slide).find('.rubric'), $.extend({
          onNext: this.goToNextPage.bind(this),
          onPrev: this.goToPrevPage.bind(this)
        }, page));
        break;
    }
	var scalable = 'no';

	if(page.scalable!== undefined){ scalable=page.scalable;}
	$("meta[name='viewport']").attr('content','width=device-width, user-scalable='+scalable+', initial-scale=1');
	if(page.scroll!== undefined){
		if(page.scroll=='yes'){
			
			if( ($(this.slide).find('.holdimage img').width()) > 1024){
				//$('.holdimage').scrollLeft(2);
				//$('.holdimage').attr('sc',0);
				//$('div.swiper-slide-active').addClass('swiper-slide-hold');

				if($("div").is(".polz")== false){
				$(this.slide).append($('<div/>').addClass('polz'));
				$('.polz').slider({
					min: 1,
					max: 100,
					range: "min",
					value: 1,
					  slide: function( event, ui ) {
						var t=($('.holdimage img').width()-1024)*ui.value/100;
						$('.holdimage').scrollLeft(t);
						$('.holdimage').attr('sc',$('.holdimage img').width()+"/"+$('.holdimage').scrollLeft());
					  }

});
				}
				/*	myScroll = new IScroll('.holdimage', {
						scrollbars: true,
						mouseWheel: false,
						interactiveScrollbars: true,
						fadeScrollbars: false,
						scrollX: true,
						scrollY: false
					});*/
			}
		//$('.holdimage').attr('sc',0);
		//$('.holdimage').bind('scroll', function () {
		//	if( $('.holdimage').attr('sc')<$('.holdimage').scrollLeft() ){
		//					
		//	if($('.holdimage img').width()-1024-$('.holdimage').scrollLeft()<=1){
		//	$('div.swiper-slide-active').removeClass('swiper-slide-hold');
		//	}
//
//			}else {
//			
//			if($('.holdimage').scrollLeft()<=1){
//			$('div.swiper-slide-active').removeClass('swiper-slide-hold');
//			}
//			
//			}
//			$('.holdimage').attr('sc', $('.holdimage').scrollLeft());
//		 });
		}
		}
    // Maps click Listener
    this.addGlobeHandler(this.slide);
  },

  goToPrevPage: function () {
    if (this.slider.activeIndex > 0) {
      this.slider.swipePrev(true);
    }
  },

  goToNextPage: function () {
    if (this.slider.activeIndex < this.slider.slides.length - 1) {
      this.slider.swipeNext(true);
    }
  },

  removeBindings: function (slide) {
    if (!slide) return;

    this.hideArticle();

    this.hideAndStopAudio();

    this.hideGlobe();

    this.removeGlobeHandler();

    // Push with task to pull
    this.tasks.push({ slide: slide, page: slide.getData('page') });

    this.clearPool();
  },

  clearPool: function () {

    var
      _this = this,
      clear = function () {
        while (this.tasks.length) {
          var
            task = this.tasks.pop(),
            page = task.page,
            slide = task.slide;

          switch (page.type) {
            case 'video':
              _this.videoStop(slide.querySelector('video'));
              break;
            case 'page':
              page.slider && page.slider.reset(true);
              // Add Handler to Article Link
              $(slide).off('click');
              break;
            case 'rubric':
              page.rubric && page.rubric.destroy();
              break;
            case 'rubric_slider':
              page.rubric && page.rubric.destroy();
              break;
            case 'rubric_12':
              page.rubric && page.rubric.destroy();
              break;
            case 'rubric_gorod':
              page.rubric && page.rubric.destroy();
              break;  
            case 'rubric_raskol':
              page.rubric && page.rubric.destroy();
              break;
            case 'rubric_parts':
              page.rubric && page.rubric.destroy();
              break;
          }
        }
      };

    // force clear
    if (this.pollInterval) {
      clear.call(this);
      clearInterval(this.pollInterval);
      this.pollInterval = null;
      return;
    }

    this.pollInterval = setTimeout(function () {
      clear.call(_this);
      clearInterval(_this.pollInterval);
      _this.pollInterval = null;
    }, 500);
  },

  videoStart: function (video) {
    video.currentTime = 0;
    $(video).trigger('play');
  },

  videoStop: function (video) {
    $(video).trigger('pause');
  },

  getImagePath: function (pageId, type) {
    type = type || 'pages'
    return ['images', type, pageId].join('/');
  },

  getAudioPath: function (pageId, audio) {
    return ['audio', 'pages', pageId, audio].join('/');
  },

  showAndPlayAudio: function (audio, params) {
    var files = [];

    audio && audio.length && audio.forEach(function (sound) {
      files.push({
        title: sound.title,
        mp3: App.getAudioPath(params.id, sound.mp3)
      })
    });

    this.playList.jSelect.jSelect('reset');

    if (audio.length === 1) {
      this.playList.jSelect.hide();
    } else {
      this.playList.jSelect.show();
    }

    // set new playlist
    this.playList._initPlaylist(files);
    // refresh playlist
    this.playList._refresh(true);
    // select first item
    this.playList.play(0);

    $(this.options.circlePlayer.cssSelector).addClass('audio-player_show_yes');

    this.isPlaying = true;
  },

  hideAndStopAudio: function () {
    if (!this.circlePlayer.player || !this.isPlaying) return;
    this.circlePlayer.player.jPlayer('pause').hide();
    $(this.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
    this.isPlaying = false;
  },

  showGlobe: function() {
    var _this = this;
    this.globeShow = true;
    //alert(this.globeShow);
    setTimeout(function () {
      _this.globeShow && _this.$globe.show();
    }, 500);
  },

  hideGlobe: function() {
    this.globeShow = false;
    this.$globe.hide();
  },

  addGlobeHandler: function(slide) {
    //$(this.slide).find('.page-slider__globe').on('click', this.showMap.bind(this));
    this.$globe.on('click', this.showMap.bind(this));
  },

  /**
   * Remove maps click Listener
   * @param slide
   */
  removeGlobeHandler: function(slide) {
    $(slide).find('.page-slider__globe').off('click');
  },

  showMap: function (event) {
    if (!this.slide) return;
    //event.preventDefault();
    $(this.slide).find('.page__map').show();

    this.hideGlobe();//dobavil

    return false;
  },

  hideMap: function () {
    if (!this.slide) return;
    $(this.slide).find('.page__map').hide();

    this.showGlobe(); //dobavil

    return false;
  },

/*
  searchVideo: function() {
    $(this.slide).find('video').currentTime = 0;       //dobavil
    $(this.slide).find('video').trigger('play');       //dobavil
  },
*/

  hideComment: function () {
    if (!this.slide) return;
    $(this.slide).find('.page__comment').css('opacity','0');    //dobavil
    $(this.slide).find('.page__comment').css('z-index','-1');   //dobavil
    this.hideAndStopAudio();					//dobavil
    //$(this.slide).find('.page__comment').hide('slow');
    return false;
  },

  showArticle: function (el) {
    //$(this.slide).find('.page__comment').show();
    $(this.slide).find('.page__comment').css('opacity','1');      //dobavil
    $(this.slide).find('.page__comment').css('z-index','999');    //dobavil

/* -------------*/
     var commentsound = [];
     var pathsound = $(this.slide).find('.commentbk').data('sound');
     if (pathsound.length > 10) {
	    commentsound.push({
	        title: "comment",
	        mp3: pathsound
	    })

	    this.playList.jSelect.hide();
	    // set new playlist
	    this.playList._initPlaylist(commentsound);
	    // refresh playlist
	    this.playList._refresh(true);
	    // select first item
	    this.playList.play(0);

	    $(this.options.circlePlayer.cssSelector).addClass('audio-player_show_yes');

	    this.isPlaying = true;
    }
/*--------------*/

/*    var $el = $(el.currentTarget),
      article = $el.data('text'),
      position = $el.position();

    position.top += 20;
    this.$article
      .css(position)
      .html(article)
      .show();
    return false;*/
  },

  hideArticle: function () {
//    $(this.slide).find('.page__comment').hide();     //dobavil
/*    this.$article.hide();*/
  },

  openBackground: function(event) {
    var _this = this,
        el = $(event.target),
        imagePaths = el.data('background').split(';');

    this.backgroundSlider.removeAllSlides();
    
    imagePaths.forEach(function(imagePath) {
      var slide = _this.backgroundSlider.createSlide('');
      slide.append();


      var slideEl = $('<img src="' + imagePath + '" />');
      // slideEl.addClass('background__slider-item');
      slideEl.appendTo(slide);
    });

    // this.$background[0].style.display = 'none';
    // this.$background.css({ backgroundImage: 'url("' + imagePath + '")' });
    // this.$background.css({ 'visibility': 'visible' });
    // this.$background[0].offsetHeight;
    // this.$background[0].style.display = '';

    // start animation
    this.$background.addClass('fullsized');
    // Recalculate swiper dimensions
    this.backgroundSlider.resizeFix(true);

    return false;
  },

  closeBackground: function() {
    var _this = this;
    // this.$background.off('webkitTransitionEnd');
    // this.$background.on('webkitTransitionEnd', function () {
    //   _this.$background
    //     .css({ 'visibility': 'hidden' })
    //     .off('webkitTransitionEnd');
    // });
    this.$background.removeClass('fullsized');
  }
};

$(function () {
  'use strict';
  window.App.init();
});

function showfull(obj){
   $(obj).toggleClass('fullpage');
}
