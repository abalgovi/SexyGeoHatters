angular.module("ui.directives").directive("uiReset",["ui.config",function(e){var i=null;return void 0!==e.reset&&(i=e.reset),{require:"ngModel",link:function(e,n,r,t){var u;u=angular.element('<a class="ui-reset" />'),n.wrap('<span class="ui-resetwrap" />').after(u),u.bind("click",function(n){n.preventDefault(),e.$apply(function(){r.uiReset?t.$setViewValue(e.$eval(r.uiReset)):t.$setViewValue(i),t.$render()})})}}}]);