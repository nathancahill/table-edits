
;(function ($, window, document, undefined) {
    var pluginName = "editable",
        defaults = {
            endpoint: '',
            buttonClass: ".edit",
            editableColumns: []
        };

    function editable(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    editable.prototype = {
        init: function() {
            $(this.options.buttonClass, this.element).bind('click', this.toggle);
        },

        toggle: function() {
            
        }
    };

    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new editable(this, options));
            }
        });
    };

})(jQuery, window, document);
