// wrapper for google-code-prettify
define([
	'share/order!share/google-code-prettify/prettify',
	'share/order!share/google-code-prettify/lang-apollo',
	'share/order!share/google-code-prettify/lang-clj',
	'share/order!share/google-code-prettify/lang-css',
	'share/order!share/google-code-prettify/lang-go',
	'share/order!share/google-code-prettify/lang-hs',
	'share/order!share/google-code-prettify/lang-lisp',
	'share/order!share/google-code-prettify/lang-lua',
	'share/order!share/google-code-prettify/lang-ml',
	'share/order!share/google-code-prettify/lang-n',
	'share/order!share/google-code-prettify/lang-proto',
	'share/order!share/google-code-prettify/lang-scala',
	'share/order!share/google-code-prettify/lang-sql',
	'share/order!share/google-code-prettify/lang-tex',
	'share/order!share/google-code-prettify/lang-vb',
	'share/order!share/google-code-prettify/lang-vhdl',
	'share/order!share/google-code-prettify/lang-wiki',
	'share/order!share/google-code-prettify/lang-xq',
	'share/order!share/google-code-prettify/lang-yaml'
],function(){
	return {
		prettyPrint: window['prettyPrint'],
		PR: window['PR'],
		prettyPrintOne: window['prettyPrintOne']
	};
});

