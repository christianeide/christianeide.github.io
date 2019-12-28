;
(function () {

	'use strict';

	// iPad and iPod detection	
	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};

	// var sliderMain = function () {

	// 	$('#qbootstrap-slider-hero .flexslider').flexslider({
	// 		animation: "fade",
	// 		slideshowSpeed: 5000,
	// 		directionNav: true,
	// 		start: function () {
	// 			setTimeout(function () {
	// 				$('.slider-text').removeClass('animated fadeInUp');
	// 				$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
	// 			}, 500);
	// 		},
	// 		before: function () {
	// 			setTimeout(function () {
	// 				$('.slider-text').removeClass('animated fadeInUp');
	// 				$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
	// 			}, 500);
	// 		}

	// 	});

	// };



	// animate-box
	var contentWayPoint = function () {

		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this).hasClass('animated')) {

				$(this.element).addClass('fadeInUp animated');

			}

		}, {
			offset: '75%'
		});

	};


	// Burger Menu
	var burgerMenu = function () {

		$('body').on('click', '.js-qbootstrap-nav-toggle', function (event) {

			if ($('#navbar').is(':visible')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}

			event.preventDefault();

		});

	};


	// Parallax
	var parallax = function () {
		if (!isiPad() || !isiPhone()) {
			$(window).stellar();
		}
	};



	// Page Nav
	var clickMenu = function () {
		$('a:not([class="external"])').click(function (event) {
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
			$('html, body').animate({
				scrollTop: $('[data-section="' + section + '"]').offset().top
			}, 500);

			if (navbar.is(':visible')) {
				navbar.removeClass('in');
				navbar.attr('aria-expanded', 'false');
				$('.js-qbootstrap-nav-toggle').removeClass('active');
			}

			event.preventDefault();
			return false;
		});
	};

	// Reflect scrolling in navigation
	var navActive = function (section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function () {
			$(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function () {

		var $section = $('div[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));

			}
		}, {
			offset: '150px'
		});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () {
				return -$(this.element).height() + 155;
			}
		});

	};

	// Animations
	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 50);

			}

		}, {
			offset: '85%'
		});
	};


	// Document on load.
	$(function () {
		burgerMenu();
		// sliderMain();
		clickMenu();
		parallax();
		navigationSection();
		contentWayPoint();
	});


}());