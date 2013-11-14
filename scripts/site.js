/*

	Feel free to load up JQuery in your site.region.

	We use YUI3 and you can, too. For JQuery developers,
	a helpful guide to learning YUI3 can be found at:

	http://www.jsrosettastone.com/

*/

Y.use('node', function(Y) {
	Y.on('domready', function() {

		// Do stuff here.

	});
});

/*

	See the developer docs for JavaScript examples.
	http://developers.squarespace.com/custom-javascript/

*/
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
		lef = parseInt($(sel).css("left")) + 4;
		
		if ((Math.floor(lef) >= Math.floor(rightPos) && (Math.floor(parseInt($(sel).css('left'))) <= Math.floor(rightPos) ) || Math.floor(lef) == Math.floor(rightPos)) && !override) {
			window.PAUSED_TIME = Math.floor(currentTime);
			//console.log('We are stuck');
			return;	
		} else if (Math.floor(lef) == Math.floor(rightPos) && override) {
			window.PAUSED_TIME = 0;	
		} else {
				
		}
//		console.log('lets move');
		if (lef > $(window).width() + parseInt($(sel).attr('width'))) {
			$(sel).css('left',  getFirstLeftVal() - (parseInt($(sel).attr('width')) + 10 ));
		} else $(sel).css('left', lef);
	} else {
		//console.log(Math.floor(currentTime));	
	}
}

$(function() {
	//we need to load the slide show when all of the images have widths. How stupid, right?
	
	$.each($('.slides img'), function(i) {
		width = parseInt($(this).attr('width'));
		width = width+10;
		offsetLeft = (i-1)*width;
		console.log(offsetLeft);
		$(this).css('left', offsetLeft+"px");
		window.setTimeout(function() {
			window.setInterval(function() {
			moveRightOne($('.slides img')[i])
		}, 5);
		}, 2000);
	});
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