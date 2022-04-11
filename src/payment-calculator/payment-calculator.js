function pcw_only_decimals( element ) {
	if ( element.value.length > 0 ) {
		var sel = element.selectionStart;
		var old = element.value;
		element.value = element.value.replace( /[^\-\.0-9]/g, '' );
		//if the value already has a decimal point, only allow one
		var secondPointPos = pcw_get_position(element.value, '.', 2);
		if ( -1 != secondPointPos ) {
			element.value = element.value.slice( 0, secondPointPos ) + element.value.slice( secondPointPos + 1 );
		}
		pcw_set_caret_position( element.id, ( element.value != old ? sel-1 : sel ) );
	}
}

function pcw_go() {
	document.getElementById('payment').value = pcw_calculate_payment(
		document.getElementById('loan_amount').value,
		document.getElementById('trade').value,
		document.getElementById('apr').value,
		document.getElementById('term').value
	);
}

function pcw_calculate_payment( amount_financed, trade, apr, term ) {

	var periods_per_year = 12;
	var payment_factor = 0;
	apr = apr / ( periods_per_year * 100);

	if( 0 == apr ) {
		payment_factor = term;
	} else {
		payment_factor =  ( 1 - 1 / Math.pow( ( 1 + apr ), term ) ) / apr;
	}

	return pcw_format_currency( Math.round( ( amount_financed - trade ) / payment_factor * 100 ) / 100 );
}

function pcw_format_currency( num ) {
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num)) { num = "0"; }
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	cents = num % 100;
	num = Math.floor(num / 100).toString();
	if (cents < 10) { cents = "0" + cents };
	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
		num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
	}
	return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}

function pcw_get_position( str, pat, n ) {
	//http://stackoverflow.com/a/14482123/338432
	var L = str.length, i = -1;
	while (n-- && i++ < L) {
		i = str.indexOf(pat, i);
	}
	return i;
}

function pcw_set_caret_position( elemId, caretPos ) {
	//http://stackoverflow.com/a/12518737/338432
	var el = document.getElementById(elemId);

	el.value = el.value;
	/**
	 * ...used to not only get "focus", but to make sure we don't have
	 * the content of the element selected, which causes an issue in chrome.
	 */

	if (el !== null) {
		if (el.createTextRange) {
			var range = el.createTextRange();
			range.move('character', caretPos);
			range.select();
			return true;
		} else {
			// (el.selectionStart === 0 added for Firefox bug)
			if (el.selectionStart || el.selectionStart === 0) {
				el.focus();
				el.setSelectionRange(caretPos, caretPos);
				return true;
			}
		}
	}
}