(function(module) {
    mifosX.directives = _.extend(module, {
        OnBlurDirective: function($parse) {
            return function(scope, elm, attrs){
                var onBlurFunction = $parse(attrs['ngBlur']);
                elm.bind("blur", function(event) {
                    scope.$apply(function() {
                        onBlurFunction(scope, { $event: event });
                    })});
            };
        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("ngBlur", ['$parse',mifosX.directives.OnBlurDirective]).run(function($log) {
    $log.info("OnBlurDirective initialized");
});