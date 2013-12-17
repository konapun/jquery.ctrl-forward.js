;(function($) {
    /*
     * Forward routes dynamically as form actions.
	 *
	 * Action values can be given as jQuery selectors and can further be tailored
	 * with scope prefixes that serve the same function as `parents`, or `siblings`
	 *
	 * You can define a method "get", "post", "link", or "undefined" which will
	 * determine the action the form takes when submitted.
	 *
	 * Author: Bremen Braun
     */
    $.fn.ctrlForward = function(opts) {
    	var $this = $(this),
    	    settings = $.extend({
    	    	'fwd-attr': 'data-forward',
    	    	'method': undefined // "get", "post", or "link". undefined: use method defined in form
    	    }, opts),
	    
		/*
		 * Replace search fields with their values
		 */
		parseField = function(field) {
			var matches = field.match(/\[(.+)\]/),
			    src = matches[1];
				
			var jqFn = function(selector) {
				return $(selector);
			};
			switch (src[0]) {
				case '^': // search parent
					jqFn = function(selector) {
						return $this.parents(selector);
					};
					src = src.substring(1);
					break;
				case '>': // search siblings
					jqFn = function(selector) {
						return $this.siblings(selector);
					};
					src = src.substring(1);
					break;
			}
			
			return jqFn(src).val();
		},
		
		/*
		 * Replace all search fields with their values
		 */
		parseURL = function(string) {
			if (string[0] == '/') {
				string = string.substring(1);
			}
			var fields = string.split('/');
			
			var action = "";
			for (var i = 0; i < fields.length; i++) {
				var field = fields[i];
				if (field[0] == '[') {
					action += "/" + parseField(field);
				}
				else {
					action += "/" + field;
				}
			}
			
			return action;
		},
		
		/*
		 * Perform action with URL either as link or in a form
		 */
		performMethod = function($this, method, action) {
			var form = $this.parents('form').get(0); // automatically find form in parents of this
			if (typeof method !== 'undefined') method = method.toLowerCase();
			
			if (method == 'link') {
				window.location = action;
				form.onsubmit = function() { return false; }; // cancel form action
				form.action = "";
			}
			else {
				if (method == 'get' || method == 'post') {
					form.method = method;
				}
				
				form.setAttribute('action', action);
			}
		};
		
		$this.click(function() {
			var $this = $(this),
			    action = parseURL($this.attr(settings['fwd-attr']));
			
			performMethod($this, settings.method, action);
		});
	}
}(jQuery));
