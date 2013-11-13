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

$(function() {
	$.each($('.slides img'), function(i) {
		offsetLeft = i*510;
		$(this).css('left', offsetLeft+"px");
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
	$.each($('.field-list .field'), function(i) {
		console.log('in '+i);
		theInput = $('input', this);
		
		switch (theInput.attr('type')) {
			
			case 'checkbox':
			
			break;
			
			case 'text':
				theInput.attr('placeholder', $('label', this).text());
//				$('label', this).text('');			
				$('label', this).hide();
				break;
			
		}
		
		
		
	});
	
});