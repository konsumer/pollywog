/**
 * Shared OS detection goes in here
 */
define(['share/jquery'],function($){

var os = {
	'iphone' : navigator.userAgent.match(/iPhone/i),
	'ipod': navigator.userAgent.match(/iPod/i),
	'ipad': navigator.userAgent.match(/iPad/i),
	'fake_iphone' : (document.body.clientWidth <= 480)
};

// add body-class for easy jquery/css selectors
['iphone', 'ipod', 'ipad'].forEach(function(n){
	if (os[n]){
		$('body').addClass(n);
	}
});


return os;
});