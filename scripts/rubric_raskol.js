window.App || (window.App = {});

App.RubricRaskol = {

  init: function(el, options) {
    var _this = this;

    this.id = options.id;

    this.$el = $(el);

    this.options = options;

    this.$background = this.$el.find('.rubric__background');

    this.$final = this.$el.find('.rubric__final');

    this.$final.length || this.createFinalScreen();

    this.$final.find('.rubric__final-message').on('click', this.showRubric.bind(this));

    this.$container = this.$el.find('.rubric__container');

    this.createFullImg();
    this.createFullVideo();
    this.initContainer();

    this.$el.on('click', '.img', this.onImgClick.bind(this))
    this.$el.on('click', '.raskol__video', this.showVideo.bind(this))
    this.$el.on('click', '.raskol__fullimg', this.hideFullImg.bind(this))
    this.$el.on('click', '.raskol__fullvideo', this.hideVideo.bind(this))

    this.$fullImg = this.$container.find('.raskol__fullimg');
    this.$fullVideo = this.$container.find('.raskol__fullvideo');

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

  createFullImg: function() {
    this.$container.append('<div class="raskol__fullimg" ></div>');
  },

  createFullVideo: function() {
    this.$container.append('<div class="raskol__fullvideo" ><video src="video/rubrics/raskol.mp4" width="1024" height="768" preload=""></video></div>');
  },

  initContainer: function() {
    this.$container.append(App.Templates.items['raskol.html']);
    var topPagination=Array(180, 180, 230, 230, 270, 230, 290, 220, 220, 230, 190, 150, 230, 230, 230, 230, 230, 230, 230);
    this.$container.find('.swiper-container').each(function(index) {
      //console.log(this, index); height();

      var key = index + 1;
      $(this).swiper({
        slidesPerView: 1,
        mode: 'horizontal',
        loop: false,
        DOMAnimation: false,
        resistance: '100%',
        pagination: '.swiper-pagination' + key,
        paginationType: 'bullets',
        paginationClickable: true
      });
   
     $('.swiper-pagination' + key).css('top', topPagination[key]);
     
    });

    this.state = 'inited';
  },

  onImgClick: function(event) {
    var currentTarget = $(event.currentTarget);
    var image = App.getImagePath('raskol', 'rubrics') + '/' + currentTarget.attr('id') + '.jpg';
    this.$fullImg
      .css('backgroundImage', 'url(' + image + ')')
      .fadeIn("slow");
      // .addClass('is-visible')
  },

  hideFullImg: function() {
    this.$fullImg
      .fadeOut("slow");
      // .removeClass('is-visible')
  },

  showVideo: function() {
    var video = this.$fullVideo.find('video')[0]

    this.$fullVideo
      .css('background', '#000')
      .show();

    video.currentTime = 0;
    $(video).trigger('play');
  },

  hideVideo: function() {
    var video = this.$fullVideo.find('video')[0]
    this.$fullVideo
      .hide()
      .css('background', 'none');
    $(video).trigger('stop');
  },

  showRubric: function () {
    if (this.state != 'inited') return;

    this.$final.addClass('rubric__final_state_opened');

    this.state = 'opened';
    setTimeout(function(){
    $('.rubric__final_state_opened').hide();
    }, 500);
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

    this.$el.off('click')

    this.$el = null;
    this.$final = null;

    if (this.$swiperEl && this.$swiperEl.size()) {
      this.$swiperEl.empty()
    }
    this.$swiperEl = null;

    if (this.$sectionsEl) {
      this.$sectionsEl.empty();
    }

    if (this.$container) {
      this.$container.empty();
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

    this.reset();
  }

};