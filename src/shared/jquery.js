// order-based loader for jquery plugins + jquery extensions

define([
	'share/order!share/jquery-1.7',
	'share/order!share/jquery-animate-enhanced'
	], function($) {

	(function( $ ){
		// function to serialize a form as JSON object - like serializeArray(), but handles checkboxex & radios
		$.fn.serializeObject = function(){
			var json = {};
			$(this).serializeArray().forEach(function(v){
				json[v.name] = $('input[name="' + v.name + '"]').val();
			});
			return json;
		};
	})(window.jQuery);

	return window.jQuery;
});