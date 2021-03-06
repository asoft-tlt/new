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

        this.circlePlayer.player.bind($.jPlayer.event.play, function () {
            var jSelect = _this.playList.jSelect.data('jSelect');
            jSelect.scrollTo(jSelect.wrapper, 0, _this.playList.current, 0.1, true);
        });

        this.playList.jSelect = $('.jp-playlist-wrapper').jSelect({
            callbacks: {
                onValueTap: function (data) {
                    _this.playList.play(data.index);
                },
                onChange: function (data) {
                    _this.playList.play(data.index);
                }
            }
        });

        this.$el = $('.swiper-container.page');

        this.$elmenu = $('.swiper-container.menu');

        this.$article = $('.article');

        this.$globe = $(this.options.globeSelector || '.globe');
        this.$menu = $('.menu-icons');
        this.$background = $('.page-background');
        this.backgroundSlider = this.$background.swiper({
            mode: 'horizontal',
            slideClass: 'page-background__item',
            wrapperClass: 'page-background__wrapper',
            loop: false,
            DOMAnimation: false,
            speed: 400,
            onSlideChangeStart: function () {                              
                if (_this.backgroundSlider.soundPaths !== undefined) {
                    if (_this.backgroundSlider.soundPaths[_this.backgroundSlider.activeIndex] !== undefined) {
                      var  imagePaths = _this.backgroundSlider.soundPaths[_this.backgroundSlider.activeIndex].split('/');
                      var  titleSound = '';
                        if (_this.backgroundSlider.soundTitle !== undefined) {
                            if (_this.backgroundSlider.soundTitle[_this.backgroundSlider.activeIndex] !== undefined) {
                                titleSound = _this.backgroundSlider.soundTitle[_this.backgroundSlider.activeIndex];
                            }
                        }
                        App.showAndPlayAudio([{title: titleSound, mp3: imagePaths[1]}], {id: imagePaths[0]});
                        imagePaths=null;
                        titleSound=null;
                    }
                }
            },
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
            speed: 400,
            noSwiping: true,
            noSwipingClass: 'swiper-slide-hold',
            onSlideChangeStart: this.process.bind(this)
        });


        this.menuslider = this.$elmenu.swiper({
//	direction: 'vertical',
            speed: 200,
            width: 1024,
            slidesPerView: 12,
            freeMode: true,
            slidesPerColumn: 4,
            //touchRatio: 0.1,
            slideToClickedSlide: true,
            onSlideClick: function () {
                var menulink = App.menuslider.clickedSlideIndex;
                if (App.slider.slides.length >= menulink) {
                    App.slider.swipeTo(menulink);
                }
                else {
                    //$('.loader').show();
                    for (var si = App.slider.slides.length; si <= menulink; si++) {
                        App.initPage(si);
                    }
                    //$('.loader').hide();
                    App.slider.swipeTo(menulink);

                }

                menulink=null;
            }
        });


        this.process(this.slider);
    },

    // Initializing page content into slide
    initPage: function (index) {
        var
            _this = this,
            slide = App.slider.getSlide(index),
            page = App.pages[index],
            content = '';
        /*if(page.type!='video') {
            $("video").each(function () {
                this.pause()
            });
        }*/
        if (slide && slide.children.length) {
            return;
        }

        switch (page.type) {
            case 'video':
                var videoPath = 'video/pages/' + page.id + '/' + page.video;
               // var videoPathMov = 'video/pages/' + page.id + '/' + page.video.replace("mp4", "mov");
                // var videoPoster='video/pages/' + page.id + '/' +'poster.jpg';
                content = '<video src="' + videoPath + '" ><source src="' + videoPath + '" type=\'video/mp4;\'></source></video>';
                videoPath=null;
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
                rubricContainerEl=null;
                rubricPaginationEl=null;
                rubricPaginationContainerEl=null;
                rubricPaginationSwiperEl=null;
                rubricEl=null;
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
                rubricContainerEl=null;
                rubricBackgroundEl=null;
                rubricThumbsEl=null;
                rubricEl=null;
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
                rubricContainerEl=null;
                rubricPaginationEl=null;
                rubricEl=null;
                break;
            case 'rubric_raskol':
                var rubricEl = $('<div/>').addClass('rubric')
                        .addClass('rubric_state_initialized')
                        .addClass('rubric_type_raskol')
                        .addClass('rubric_num_' + page.id),
                    rubricContainerEl = $('<div/>').addClass('rubric__container');
                rubricEl.append(rubricContainerEl);
                rubricEl.appendTo(slide);
                rubricContainerEl=null;
                rubricEl=null;
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
                rubricContainerEl=null;
                rubricThumbsEl=null;
                rubricEl=null;
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

                rubricContainerEl=null;
                rubricThumbsEl=null;
                rubricEl=null;
                break;
            default:
                // handle slider
                if (page.slides) {
                    var internalSlider = slide.querySelector('.page-slider__container');
                    var countslides = 0;
                    internalSlider && page.slides.forEach(function (info) {
                        //pagination.append($('<span/>').addClass('swiper-pagination-switch'));
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
                        info.descriptionImageClose && item.append($('<div style="background-image:url(' + _this.getImagePath(page.id) + '/' + info.descriptionImageClose + ')" />').addClass('page-slider__descriptionClose'));
                        info.descriptionImageOpen && item.append($('<div style="background-image:url(' + _this.getImagePath(page.id) + '/' + info.descriptionImageOpen + ')" />').addClass('page-slider__descriptionOpen'));

                        // appending to slider node
                        item.appendTo(internalSlider);
                        countslides = countslides + 1;
                    });
                    if (countslides > 1) {
                        var pagination = $('<span/>').addClass('page-slider__pagination');
                        pagination.appendTo(slide.querySelector('.page-slider'));
                    }
                    countslides=null;
                    internalSlider=null;
                    image=null;
                    item=null;
                    imagePath=null;
                    pagination=null;
                }

                //mappage

                if (slide.querySelector('.mappage') !== null) {
                    $("meta[name='viewport']").attr('content', 'width=device-width, user-scalable=no, initial-scale=1');
                    $('.maplegend').click(function () {
                        $('.maplegend').hide();
                        page.scalable = true;
                        //   $("meta[name='viewport']").attr('content','width=device-width, user-scalable=yes, initial-scale=1');
                    });
                    $('.zoommapbutton').click(function () {
                        if ($(slide.querySelector('.zoomoverlay')).css('display') == 'none') {
                            $(slide.querySelector('.zoomoverlay')).show();
                        } else {
                            $(slide.querySelector('.zoomoverlay')).hide();
                        }
                    });
                    $('.mapbutton').click(function () {

                        if ($('.maplegend').css('display') == 'none') {
                            $('.maplegend').show();
                            // console.log(page);
                            //   $("meta[name='viewport']").attr('content','width=device-width, user-scalable=no, initial-scale=1');
                            //   page.scalable=false;
                        } else {
                            $('.maplegend').hide();
                            // console.log(page);
                            //   $("meta[name='viewport']").attr('content','width=device-width, user-scalable=yes, initial-scale=1');
                            // page.scalable=true;
                        }

                    });
                }
        }
    },

    // Clear page content into slide
    resetPage: function (index) {
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
       // console.log(slider);
        setTimeout(function () {


            for (var i = slider.activeIndex - 2; i <= slider.activeIndex + 2; i++) {
                if (i == slider.activeIndex - 2 && i >= 0) {
                    // remove
                    _this.resetPage(i);
                  //let slide_remove = App.slider.getSlide(i);
                  //slide_remove.find('.page div').remove();
                } else if (i == slider.activeIndex + 2) {
                    // remove
                    _this.resetPage(i);
                } else if (i >= 0 && (i > slider.activeIndex - 2) && (i < slider.activeIndex + 2)) {
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
        $("video").each(function () {
            this.pause()
        });

        switch (page.type) {
            case 'video':
                this.videoStart(this.slide.querySelector('video'));
                break;
            case 'page':
                /*page__column_type_fullsized*/

                if (page.slides && !page.slider) {
                    page.slider = new App.PageSlider($(this.slide).find('.page-slider'), $.extend({
                        onNext: this.goToNextPage.bind(this),
                        onPrev: function () {
                            App.slider.swipePrev();
                            /*if (!this.constant) {
                                this.decrease();
                            } else {
                                App.slider.swipePrev();
                            }*/
                        }
                    }, page));

                }
                // first initialization
                page.slider && page.slider.init();

                if (page.sounds && page.sounds.length) {
                  setTimeout(function (page) {
                        App.showAndPlayAudio(page.sounds, {id: page.id});
                    }, 100);
                }
                // Add Handler to Article Link
                $(this.slide).on('click', '.article-link', this.showArticle.bind(this));

                /**/
                $(this.slide).on('swipeup', function () {
               
                //$(this.slide).on('tap', '.menu-icons', function () {
                    $(".menu-slide").removeClass("zm");
                    $('.menu-container').toggle()
                });
                $(document).on('tap', '.clsb', function () {
                    $('.menu-container').hide();
                    $('.portfolio-container').hide()
                });
                $(document).on('tap', '.bimg', function () {
                    $('.menu-container').hide();
                    $('.portfolio-container').show()
                });
                $(document).on('tap', '.bsod', function () {
                    $('.menu-container').show();
                    $('.portfolio-container').hide()
                });

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

        if (page.scalable !== undefined) {
            scalable = page.scalable;
        }
        $("meta[name='viewport']").attr('content', 'width=device-width, user-scalable=' + scalable + ', initial-scale=1');
        if (page.scroll !== undefined) {
            if (page.scroll == 'yes') {
                if (($(this.slide).find('.holdimage img').width()) > 1024) {
                    //$('.holdimage').scrollLeft(2);
                    //$('.holdimage').attr('sc',0);
                    //$('div.swiper-slide-active').addClass('swiper-slide-hold');
                    var tt = $(this.slide).find('.holdimage img').width();
                    var aslide = $(this.slide);
                    if ($("div").is(".polz") == false) {
                        $(this.slide).append($('<div/>').addClass('polz swiper-slide-hold'));
                        $('.polz').slider({
                            min: 1,
                            max: 100,
                            range: "min",
                            value: 1,
                            slide: function (event, ui) {
                                var t = Math.round((tt - 1024) * ui.value / 100);
                              //  console.log(t);
//						$('.holdimage').scrollLeft(t);
                                aslide.find('.holdimage').scrollLeft(t);
                            //    console.log($('#page135 .holdimage').scrollLeft());
//						$('.holdimage').attr('sc',$('.holdimage img').width()+"/"+$('.holdimage').scrollLeft());
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
        page=null;
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
        this.tasks.push({slide: slide, page: slide.getData('page')});

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
      let returnAudio = ['audio', 'pages', pageId, audio].join('/');
      returnAudio ='http://savvy-club.com/book/'+returnAudio;
      console.log(returnAudio);
      return returnAudio;
    },

    showAndPlayAudio: function (audio, params) {
        var files = [];

        //console.log(audio);
        //console.log(params);
      audio && audio.length && audio.forEach(function (sound) {
            if (sound.title === undefined) {
                sound.title = '';
            }
            if(sound.mp3!=undefined){
            files.push({
                title: sound.title,
                mp3: App.getAudioPath(params.id, sound.mp3)
            });
          }
        });
        if(files.length>0){
        this.playList.jSelect.jSelect('reset');

        if (audio.length === 1) {
            this.playList.jSelect.hide();
        } else {
            this.playList.jSelect.show();
        }
        if (audio[0].title !== '') {
            this.playList.jSelect.show();
        }
        // set new playlist
        this.playList._initPlaylist(files);
        // refresh playlist
        this.playList._refresh(true);
        // select first item
        App.playList.play(0);
        $(this.options.circlePlayer.cssSelector).addClass('audio-player_show_yes');
        this.isPlaying = true;

      }else{
         App.hideAndStopAudio();
      }
      files = null;
    },

    hideAndStopAudio: function () {
     if (!this.circlePlayer.player || !this.isPlaying) return;
        this.circlePlayer.player.jPlayer('pause').hide();
        $(this.options.circlePlayer.cssSelector).removeClass('audio-player_show_yes');
        this.isPlaying = false;
    },

    showGlobe: function () {
        var _this = this;
        this.globeShow = true;
        //alert(this.globeShow);
        setTimeout(function () {
            _this.globeShow && _this.$globe.show();
        }, 500);
    },

    hideGlobe: function () {
        this.globeShow = false;
        this.$globe.hide();
    },

    addGlobeHandler: function (slide) {
        //$(this.slide).find('.page-slider__globe').on('click', this.showMap.bind(this));
        this.$globe.on('click', this.showMap.bind(this));
    },

    /**
     * Remove maps click Listener
     * @param slide
     */
    removeGlobeHandler: function (slide) {
        $(slide).find('.page-slider__globe').off('click');
    },

    showMap: function (event) {
        if (!this.slide) return;
        //event.preventDefault();
        if($(this.slide).find('.page__map iframe').attr('src')==''){
          $(this.slide).find('.page__map iframe').attr('src', $(this.slide).find('.page__map iframe').attr('src_cach'));
        }
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
        $(this.slide).find('.page__comment').css('opacity', '0');    //dobavil
        $(this.slide).find('.page__comment').css('z-index', '-1');   //dobavil
        this.hideAndStopAudio();					//dobavil
        //$(this.slide).find('.page__comment').hide('slow');
        return false;
    },

    showArticle: function (el) {
        //$(this.slide).find('.page__comment').show();
        console.log('showArticle app-menu:832');
        $(this.slide).find('.page__comment').css('opacity', '1');      //dobavil
        $(this.slide).find('.page__comment').css('z-index', '10000');    //dobavil

        /* -------------*/
        var commentsound = [];
        var pathsound = $(this.slide).find('.commentbk').data('sound');
        var namesound = $(this.slide).find('.commentbk').data('name');
        if (namesound === undefined) {
            namesound = '';
        }

        if (pathsound!=undefined && pathsound.length > 10) {
          if(pathsound.indexOf("*")==-1){
            commentsound.push({
                title: namesound,
                mp3: pathsound,
                id: 0
            });
          }else{
             nameSount = namesound.split("*");
             path = pathsound.split("*");
             path.forEach(function (soundPath, index) {
                if (nameSount[index] === undefined) {
                    nameSount[index] = '';
                }
                if(path[index] !=undefined){
                commentsound.push({
                    title: nameSount[index],
                    mp3: soundPath,
                    id: index
                });
               }
            });
          }
          App.showAndPlayAudio({commentsound});

/*----
            this.playList.jSelect.show();
            // set new playlist
            this.playList._initPlaylist(commentsound);
            // refresh playlist
            this.playList._refresh(true);
            // select first item
            this.playList.play(0);

            $(this.options.circlePlayer.cssSelector).addClass('audio-player_show_yes');

            this.isPlaying = true;*/
        }
        commentsound=null;
        pathsound=null;
        namesound=null;
        nameSount=null;
        path=null;
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

    openBackground: function (event) {
      console.log('openBackground app-menu: 906');
        var _this = this,
            el = $(event.target),
            imagePaths = el.data('background').split(';');
        var sounds = el.data('sounds');
        this.backgroundSlider.soundPaths = undefined;
        this.backgroundSlider.soundTitle = undefined;
        if (sounds !== undefined) {
            this.backgroundSlider.soundPaths = sounds.split(';');
            var soundsname = el.data('name');
            if (soundsname !== undefined) {
                this.backgroundSlider.soundTitle = soundsname.split(';');
            }
        }
        this.backgroundSlider.removeAllSlides();

        imagePaths.forEach(function (imagePath, index) {
            if (imagePath != '') {
                var slide = _this.backgroundSlider.createSlide('');
                //console.log(_this.backgroundSlider.options);
                slide.append();
                var slideEl = $('<img src="' + imagePath + '"/>');


                slideEl.appendTo(slide);
            }
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
        if (this.backgroundSlider.soundPaths !== undefined) {
            if (this.backgroundSlider.soundPaths[0] !== undefined && this.backgroundSlider.soundPaths[0] != '0') {
                var imagePaths = this.backgroundSlider.soundPaths[0].split('/');
                var imageTitle = '';
                if (this.backgroundSlider.soundTitle[0] !== undefined) {
                    imageTitle = this.backgroundSlider.soundTitle[0];
                }

                App.showAndPlayAudio([{title: imageTitle, mp3: imagePaths[1]}], {id: imagePaths[0]});
                imagePaths=null;
                imageTitle=null;
            }
        }
        _this=null;
        el=null;
        sounds=null;
        return false;
    },

    closeBackground: function () {
        var _this = this;
        // this.$background.off('webkitTransitionEnd');
        // this.$background.on('webkitTransitionEnd', function () {
        //   _this.$background
        //     .css({ 'visibility': 'hidden' })
        //     .off('webkitTransitionEnd');
        // });
        App.hideAndStopAudio();
        this.$background.removeClass('fullsized');
    }
};

$(function () {
    'use strict';
    window.App.init();


});

function showfull(obj) {
  console.log('showfull app-menu: 984');
    $(obj).toggleClass('fullpage');
}
