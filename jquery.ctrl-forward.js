;(function($) {
    /*
     * Forward routes dynamically as form actions.
	 *
	 * Action values can be given as jQuery selectors and can further be tailored with
	 * scope prefixes that serve the same function as `parents`, or `siblings`
	 *
	 * Author: Bremen Braun
     */
    $.fn.ctrlForward = function(opts) {
        var $this = $(this),
            settings = $.extend({
				'fwd-attr': 'data-forward'
			}, opts),
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
			}
        
		$this.click(function() {
			var action = parseURL($this.attr(settings['fwd-attr'])),
			    form = $(this).parents('form');
			
			form.get(0).setAttribute('action', action);
		});
    }
}(jQuery));
