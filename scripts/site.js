/*

	Feel free to load up JQuery in your site.region.

	We use YUI3 and you can, too. For JQuery developers,
	a helpful guide to learning YUI3 can be found at:

	http://www.jsrosettastone.com/

*/

Y.use('node', 'event', function(Y) {
	Y.on('domready', function() {

		// Do stuff here.
		'use strict';

		var navdrawerContainer = Y.one('.navdrawer-container');
		var body = Y.one('body');

		var appbarElement = Y.one('.app-bar');

		var menuBtn = Y.one('.menu');
		var main = Y.one('main');

		function closeMenu() {
			body.removeClass('open');
			menuBtn.removeClass('open');
			appbarElement.removeClass('open');
			navdrawerContainer.removeClass('open');
		}

		function toggleMenu() {
			body.toggleClass('open');
			menuBtn.toggleClass('open');
			appbarElement.toggleClass('open');
			navdrawerContainer.toggleClass('open');
			navdrawerContainer.addClass('opened');
		}

		main.on('click', closeMenu);
		menuBtn.on('click', toggleMenu);
		navdrawerContainer.on('click', function (e) {
			if (e.target.nodeName === 'A' || e.target.nodeName === 'LI') {
				closeMenu();
			}
		});

	});
});

/*

	See the developer docs for JavaScript examples.
	http://developers.squarespace.com/custom-javascript/

*/
window.settings = {interval: 4};
function getFirstLeftVal( ) {
	lowestLVal = 100000;
	$.each($('.slides img'), function() {
		if (parseInt($(this).css('left')) < lowestLVal) lowestLVal = parseInt($(this).css('left'));
	});
	return lowestLVal;
}
window.PAUSED_TIME = 0;
function moveRightOne( sel ) {

	//get the right border of the box
	currentTime = new Date().getTime();
	currentTime = currentTime/15000
	override = false;
	//number of quarter minutes minutes
	if (window.PAUSED_TIME + 1 == Math.floor(currentTime)) {
		override = true;
		//console.log('restarting');
	}

	if (window.PAUSED_TIME != Math.floor(currentTime) || override == true) {
		//console.log('should be moving');
		box = $('#text-main-content .box');
		o = box.offset();
		rightPos = o.left + box.outerWidth(false);

		//if right position is the same as left position of an image
		lef = parseInt($(sel).css("left")) + window.settings.interval;
		flooredLef = Math.floor(lef);
		flooredRight = Math.floor(rightPos);
		flooredCurLef = Math.floor(parseInt($(sel).css('left')));
//		console.log(Math.abs(flooredLef - flooredRight)+" for " + $(sel).attr('src'));
		//after the arithmetic
		if (( Math.abs(flooredLef - flooredRight) < (window.settings.interval*2.1)) && !override) {
			window.PAUSED_TIME = Math.floor(currentTime);
			console.log('We are stuck');
			return;
		} else if (Math.floor(lef) == Math.floor(rightPos) && override) {
			window.PAUSED_TIME = 0;
		} else {

		}
//		console.log('lets move');
		if (lef > $(window).width() + parseInt($(sel).attr('width'))) {
			$(sel).css('left',  getFirstLeftVal() - (parseInt($(sel).attr('width')) + 10 ));
		} else $(sel).css('left', flooredLef);
	} else {
		//console.log(Math.floor(currentTime));
	}
}

function newMoveRightOne(sel) {
	left = parseInt($(sel).css('left'));
	console.log(left);
	if (left > $(window).width() + parseInt($(sel).attr('width'))) {
		$(sel).css('left',  getFirstLeftVal() - (parseInt($(sel).attr('width')) + 10 ));
		console.log('rearranging');
	}
	moveWidth = parseInt($(sel).attr('width')) + 10;
	$(sel).animate({left: '+='+moveWidth }, 300);
}

function placeImage(selector, i) {
	box = $('#text-main-content .box');
	o = box.offset();
	rightPos = o.left + box.outerWidth(false);
	//we have the reference point now
	switch (i) {
		case 0:
			//place this right next to the square thing
			selector.css('left', rightPos+"px");
			console.log(rightPos);
			break;
		default:
			convertedIndex = Math.ceil(i/2);
			switch (i%2) {
				case 1:
					//odd
					//subtract rightpos
					adj = convertedIndex * (parseInt(selector.attr('width')) + 10);
					adj = rightPos - adj;
					break;
				case 0:
					//even
					adj = convertedIndex * (parseInt(selector.attr('width')) + 10);
					adj = rightPos + adj;
					break;
			}
			console.log(i + ": " + adj );
			selector.css('left', adj+"px");
			break;
	}
}
var slideShow = {}
slideShow.intervals = Array();

function repositionImages(fix) {
	$.each($('.slides img'), function(i) {
		placeImage($(this), i);
		sel = '';
		if (!fix) {
			window.setTimeout(function() {
				slideShow.intervals[i] = window.setInterval(function() {
					return newMoveRightOne($('.slides img')[i]);
				moveRightOne($('.slides img')[i])
			}, 4000);
			}, 500);
		} else {
			window.clearInterval(slideShow.intervals[i]);
			slideShow.intervals[i] = window.setInterval(function() {
				return newMoveRightOne($('.slides img')[i]);
				moveRightOne($('.slides img')[i])
			}, 4000);
		}
	});
}

$(function() {
	//we need to load the slide show when all of the images have widths. How stupid, right?
	$(window).resize(function() {
		repositionImages(true);
	});
	repositionImages(false);

	$.each($('.questions .question'), function(i) {
		console.log('question '+i);
		$('.hidden', this).hide();

		$('a', this).click(function() {
			$(this).parentsUntil('.questions').children('.hidden').slideToggle();
		});
	});

	//page specific stuff.
	//first we want to reformat squarespace forms to be beautiful
	$('.field-list .title').hide();
	$.each($('.field-list .field'), function(i) {
		console.log('in '+i);
		theInput = $('input', this);

		switch (theInput.attr('type')) {

			case 'checkbox':

			break;

			case 'text':
				theInput.attr('placeholder', $('label', this).text().trim());
//				$('label', this).text('');
				INPUT = $('input', this);
				$(this).append(INPUT);
				$('label', this).hide();
				break;

		}



	});

	ap = function() {
		newOffset = Math.abs(parseInt($('.big-slideshow').css('left'))) + 800;
		if ($('.big-slideshow').width() <= newOffset) {
			$('.big-slideshow').animate({left: 0}, 300);
		} else $('.big-slideshow').animate({left:'-=800px'}, 300);


	}
	$('.second').hide();
	$('.second input').val('00');
	$('.form-wrapper').append($('<p></p>').html('Please note that the date and time you requested may not be available. We will contact you to confirm your appointment details').css('font-size', '12px').css('padding-top', '15px').css('padding-bottom', '30px'));
	$('#text-main-content .big-slideshow').css('width', ($('.big-slideshow .slideshow-item').length * 800)+"px");
	$.each($('.gallery .wrapper .gallery-slides .gallery-slide-item'), function(i) {
		//this is the big one
		bigOne = $('.big-slideshow .slideshow-item')[i];

		$(this).click(function(e) {
			xOffset = i*800;

			$('.big-slideshow').animate({left:-xOffset+"px"},300);
			window.clearInterval(window.autoPlay);
			window.autoPlay = window.setInterval(ap, 5000);
		});
	});

	var isSlideshowAutoplaying = true;

	//now make it autoplay in two seconds

	window.setTimeout(function() {

		window.autoPlay = window.setInterval(ap, 5000);

	}, 2000);

});
