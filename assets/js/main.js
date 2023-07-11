/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $('body'),
    $header = $('#header'),
    $all = $body.add($header);

  // Breakpoints.
  breakpoints({
    xxlarge: ['1681px', '1920px'],
    xlarge: ['1281px', '1680px'],
    large: ['1001px', '1280px'],
    medium: ['737px', '1000px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px'],
  });

  // Play initial animations on page load.
  $window.on('load', function () {
    setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Touch mode.
  if (browser.mobile) $body.addClass('is-touch');
  else {
    breakpoints.on('<=small', function () {
      $body.addClass('is-touch');
    });

    breakpoints.on('>small', function () {
      $body.removeClass('is-touch');
    });
  }

  // Fix: IE flexbox fix.
  if (browser.name == 'ie') {
    var $main = $('.main.fullscreen'),
      IEResizeTimeout;

    $window
      .on('resize.ie-flexbox-fix', function () {
        clearTimeout(IEResizeTimeout);

        IEResizeTimeout = setTimeout(function () {
          var wh = $window.height();

          $main.each(function () {
            var $this = $(this);

            $this.css('height', '');

            if ($this.height() <= wh) $this.css('height', wh - 50 + 'px');
          });
        });
      })
      .triggerHandler('resize.ie-flexbox-fix');
  }

  // Gallery.
  $window.on('load', function () {
    var $gallery = $('.gallery');

    $gallery.poptrox({
      baseZIndex: 10001,
      useBodyOverflow: false,
      usePopupEasyClose: false,
      overlayColor: '#1f2328',
      overlayOpacity: 0.65,
      usePopupDefaultStyling: false,
      usePopupCaption: true,
      popupLoaderText: '',
      windowMargin: 50,
      usePopupNav: true,
    });

    // Hack: Adjust margins when 'small' activates.
    breakpoints.on('>small', function () {
      $gallery.each(function () {
        $(this)[0]._poptrox.windowMargin = 50;
      });
    });

    breakpoints.on('<=small', function () {
      $gallery.each(function () {
        $(this)[0]._poptrox.windowMargin = 5;
      });
    });
  });

  // Section transitions.
  if (browser.canUse('transition')) {
    var on = function () {
      // Galleries.
      $('.gallery').scrollex({
        top: '30vh',
        bottom: '30vh',
        delay: 50,
        initialize: function () {
          $(this).addClass('inactive');
        },
        terminate: function () {
          $(this).removeClass('inactive');
        },
        enter: function () {
          $(this).removeClass('inactive');
        },
        leave: function () {
          $(this).addClass('inactive');
        },
      });

      // Generic sections.
      $('.main.style1').scrollex({
        mode: 'middle',
        delay: 100,
        initialize: function () {
          $(this).addClass('inactive');
        },
        terminate: function () {
          $(this).removeClass('inactive');
        },
        enter: function () {
          $(this).removeClass('inactive');
        },
        leave: function () {
          $(this).addClass('inactive');
        },
      });

      $('.main.style2').scrollex({
        mode: 'middle',
        delay: 100,
        initialize: function () {
          $(this).addClass('inactive');
        },
        terminate: function () {
          $(this).removeClass('inactive');
        },
        enter: function () {
          $(this).removeClass('inactive');
        },
        leave: function () {
          $(this).addClass('inactive');
        },
      });

      // Contact.
      $('#contact').scrollex({
        top: '50%',
        delay: 50,
        initialize: function () {
          $(this).addClass('inactive');
        },
        terminate: function () {
          $(this).removeClass('inactive');
        },
        enter: function () {
          $(this).removeClass('inactive');
        },
        leave: function () {
          $(this).addClass('inactive');
        },
      });
    };

    var off = function () {
      // Galleries.
      $('.gallery').unscrollex();

      // Generic sections.
      $('.main.style1').unscrollex();

      $('.main.style2').unscrollex();

      // Contact.
      $('#contact').unscrollex();
    };

    breakpoints.on('<=small', off);
    breakpoints.on('>small', on);
  }

  // Events.
  var resizeTimeout, resizeScrollTimeout;

  $window
    .on('resize', function () {
      // Disable animations/transitions.
      $body.addClass('is-resizing');

      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(function () {
        // Update scrolly links.
        $('a[href^="#"]').scrolly({
          speed: 1500,
          offset: $header.outerHeight() - 1,
        });

        // Re-enable animations/transitions.
        setTimeout(function () {
          $body.removeClass('is-resizing');
          $window.trigger('scroll');
        }, 0);
      }, 100);
    })
    .on('load', function () {
      $window.trigger('resize');
    });
})(jQuery);

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const TypeWriter = function (txtElement, words, wait = 1500) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.isDeleting = false;
  this.type();
};

TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];

  if (!this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  }

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  let typeSpeed = 200;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => {
    this.type();
  }, typeSpeed);
};

document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('#txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  setTimeout(() => {
    new TypeWriter(txtElement, words, wait);
  }, 1300);
}

// contact send

const messageForm = document.querySelector('.messageForm');
const contactSubject = document.querySelector('#contact-subject');
const contactContent = document.querySelector('#contact-content');
const sendButton = document.querySelector('#contact-send');

sendButton.addEventListener('click', (event) => {
  event.preventDefault();
  const email = 'dingyiheng98@gmail.com';
  const subject = contactSubject.value;
  const body = contactContent.value;
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

// project to corresponding website

const homeFinder = document.querySelector('#homeFinderItem');
homeFinder.addEventListener('click', () => {
  open('https://house-listing-tau.vercel.app/', '_blank');
});
const homeGit = document.querySelector('#homefinder-github');
homeGit.addEventListener('click', () => {
  open('https://github.com/XOFJO/home-finder', '_blank');
});
const homeFinderTitle = document.querySelector('#homeFinder-title');
homeFinderTitle.addEventListener('click', () => {
  open('https://house-listing-tau.vercel.app/', '_blank');
});

const movieGit = document.querySelector('#movie-github');
movieGit.addEventListener('click', () => {
  open('https://github.com/XOFJO/movie-tv-search', '_blank');
});
const movie = document.querySelector('#movieItem');
movie.addEventListener('click', () => {
  open('https://sage-lebkuchen-18d0cb.netlify.app/', '_blank');
});
const movieTitle = document.querySelector('#movie-title');
movieTitle.addEventListener('click', () => {
  open('https://sage-lebkuchen-18d0cb.netlify.app/', '_blank');
});

const githubSearch = document.querySelector('#GithubItem');
githubSearch.addEventListener('click', () => {
  open('https://github-finder-lovat-nine.vercel.app/', '_blank');
});
const githubTitle = document.querySelector('#github-title');
githubTitle.addEventListener('click', () => {
  open('https://github-finder-lovat-nine.vercel.app/', '_blank');
});
const GihubGit = document.querySelector('#githubSearch-github');
GihubGit.addEventListener('click', () => {
  open('https://github.com/XOFJO/Github-search', '_blank');
});
