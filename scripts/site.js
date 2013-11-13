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
window.PAUSED_TIME = 0;
function moveRightOne( sel ) {
	//get the right border of the box
	currentTime = new Date().getTime();
	currentTime = currentTime/15000
	override = false;
	//number of quarter minutes minutes
	if (window.PAUSED_TIME + 1 == Math.floor(currentTime)) {
		override = true;
		console.log('restarting');	
	}
	
	if (window.PAUSED_TIME != Math.floor(currentTime) || override == true) {
		console.log('should be moving');
		window.PAUSED_TIME = 0;
		box = $('#text-main-content .box');
		o = box.offset();
		rightPos = o.left + box.outerWidth(false);
		
		//if right position is the same as left position of an image
		
		var lef = parseInt($(sel).css("left")) + 10;
		
		if (Math.floor(lef) == Math.floor(rightPos) && !override) {
			window.PAUSED_TIME = Math.floor(currentTime);
			return;	
		}
		console.log('lets move');
		if (lef > $(window).width() + 510) {
			$(sel).css('left', -510);
		} else $(sel).css('left', lef);
	} else {
		console.log(Math.floor(currentTime));	
	}
}

$(function() {
	$.each($('.slides img'), function(i) {
		offsetLeft = (i-1)*510;
		$(this).css('left', offsetLeft+"px");
		window.setInterval(function() {
			moveRightOne($('.slides img')[i])
		}, 100);
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
	
	$('.form-wrapper').append($('<p></p>').html('Please note that the date and time you requested may not be available. We will contact you to confirm your appointment details').css('font-size', '12px').css('padding-top', '15px').css('padding-bottom', '30px'));
	$('#text-main-content .big-slideshow').css('width', ($('.big-slideshow .slideshow-item').length * 800)+800+"px");
	$.each($('.gallery .wrapper .gallery-slides .gallery-slide-item'), function(i) {
		//this is the big one
		bigOne = $('.big-slideshow .slideshow-item')[i];
		console.log(i);
		
		$(this).click(function(e) {
			xOffset = i*800;
			
			$('.big-slideshow').animate({'left':-xOffset+"px"},300);
		});
	});
	
});