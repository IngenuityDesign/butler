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
	$.each($('.slides img'), function() {
		offsetLeft = i*510;
		$(this).css('left', offsetLeft+"px");
	});
	$.each($('.question .questions'), function() {
		
		$('.hidden', this).hide();
		
		$('a', this).click(function() {
			$(this).parents('.question').children('.hidden').hide();
			$(this).parentsUntil('.question').children('.hidden').slideDown();
		});
	});
});