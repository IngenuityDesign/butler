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
	
});


/*!
 * jQuery Nice Form Inputs
 *
 * (c) 2013 IngenuityDesign
 */

/*
 * Use niceselect.css for basic styling.
 * Turns all your select boxes into a basic HTML markup of a "nice select" and adds features to
 * make them more select-esque. Makes it easy. Coming soon! NICE CHECKBOXES?!?!
 */
$.fn.NiceSelect = function() {
	
	theElement = $(this);
	//this is going to essentially be a list of select elements.
	//first we will need to get some attributes from this
	
	name = theElement.attr('name');
	id = theElement.attr('id');
	if (!name || name == null) return; //we're done here we don't need to continue
	
	hiddenElement = $('<select></select>').attr('name', name).attr('class', $(this).attr('class'));
	//we need to go through this and find out what element is selected in the box
	if (id && id != null)  hiddenElement.attr('id', id);
	
	span = $('<span></span>').addClass('preview');
	
	reEstablishLiClick = function(jThis) {
		//if a list element is clicked
		//we need to give it the selected tag and then update the hidden form
		jThis = $(jThis);
		val = jThis.attr('data-val');
		jThis.siblings('li').removeClass('selected');
		jThis.addClass('selected');
		jThis.parents('.nice-select-created').children('select').val(val);
		jThis.parents('.nice-select-created').children('select').change();
		jThis.parents('.nice-select-created').children('.preview').html(jThis.html());
		
		//should be good now!
		
	};
	
	reoption = function(context, inputExtra) {
		newList = $('<ul></ul>'); //starting the new list
		$.each($('option', context), function() {
			//we're going to through all of these and add them to a list
			tmp = $('<li></li>');
			tmp.attr('data-val', $(this).val()).text($(this).text()); //ok we gave it what it needs
			tmp2 = $('<option></option>').attr('value', $(this).val()).text($(this).text());
			//now let's add it to the list, but we need to figure out if it is selected first
			if ($(this).is(":selected")) {
				//we have found the selected element.
				tmp.addClass('selected');
				tmp2.attr('selected', 'selected');
				if (inputExtra) span.html($(this).html()); //its this line
			}
			if (inputExtra && inputExtra != null) inputExtra.append(tmp2);
			newList.append(tmp);
		}); 
		return newList;
	}
	newList = reoption(this, hiddenElement);
	//we now have the hidden element set and the list. we can begin to put together the markup
	div = $('<div></div>').addClass('nice-select-created').addClass('name-'+name);
	if (id && id != null) div.attr('id', 'nice-select-'+id);
	
	//now we need to remove the this when we place its new self!
	
	
	//isn't it beautiful?
	
	div.click(function(e) {
		
		if ($(this).hasClass('is-open')) {
			
			$('.nice-select-created').removeClass('is-open');
			
		} else {
			
			//we have the new list we need to replace it with the old one
			//it is not open so we are now opening
			newList = reoption($('select', this)); //reoption the list so we can always have up to date values
			$('ul', this).replaceWith(newList);
			$('li', $('ul', this)).click(function(e) {reEstablishLiClick(this);});
			$('.nice-select-created').removeClass('is-open');
			e.stopPropagation();
			$(this).addClass('is-open');
			
		} //end if
	});
	
	$('body').click(function() {
		$('.nice-select-created').removeClass('is-open');
	});
	
	$('li', newList).click(function(e) {reEstablishLiClick(this);});

	w = $(this).width()+4;
	if (w > 5) { //we dont want the hidden ones
		div.width(w);
		newList.width(w);
	}
	hiddenElement.css('display', 'none');
	div = div.append(span).append(hiddenElement).append(newList);
	//before we replace it let's get its width
	$(this).replaceWith(div);
	
}

$.fn.NiceCheckbox = function() {
	
	theElement = $(this);
	//this is going to essentially be a list of select elements.
	//first we will need to get some attributes from this
	
	name = theElement.attr('name');
	id = theElement.attr('id');
	if (!name || name == null) return; //we're done here we don't need to continue
	
	hiddenElement = $('<input>').attr('name', name).attr('type', 'checkbox').attr('class', $(this).attr('class')).attr('value', $(this).attr('value')); //set it to the old value
	if ($(this).is(":checked")) isChecked = true; else isChecked = false;
	if (isChecked) hiddenElement.attr('checked', 'checked');
	//we need to go through this and find out what element is selected in the box
	if (id && id != null) hiddenElement.attr('id', id);
	
	span = $('<span></span>').addClass('nice-checkbox-created').attr('data-val', $(this).attr('value')).addClass('name-'+name);
	subspan = $('<span></span>').attr('class', 'subspan');
	if (isChecked) subspan.addClass('is-checked');
	
	//we now have the hidden element set and the list. we can begin to put together the markup
	if (id && id != null) hiddenElement.attr('id', 'nice-select-'+id);
	
	//now we need to remove the this when we place its new self!
	
	
	//isn't it beautiful?
	
	span.click(function(e) {
		e.stopPropagation();
		$('input', this).click(); //should just be able to redirect the event
	});
	hiddenElement.click(function(e) {
		$('input', this).click(); //should just be able to redirect the event
		
	});
	
	hiddenElement.change(function(e) {
		if (!e.isPropagationStopped()) $(this).click();
	});
	
	
	span = span.append(hiddenElement).append(subspan);
	//before we replace it let's get its width
	$(this).replaceWith(span);
	
}

$(function() {
//	$('select').addClass('nice-select');
	$.each($('select'), function() {
		//if ($('option', this).not(":empty").length > 0) $(this).NiceSelect(); // turn them into their beautiful selves
	});
	$.each($('input[type=checkbox]'), function() {
		//$(this).NiceCheckbox();
	});
});