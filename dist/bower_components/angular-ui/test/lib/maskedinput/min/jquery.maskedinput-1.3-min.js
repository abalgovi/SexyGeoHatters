!function($){var e=($.browser.msie?"paste":"input")+".mask",t=void 0!=window.orientation;$.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn"},$.fn.extend({caret:function(e,t){if(0!=this.length){if("number"==typeof e)return t="number"==typeof t?t:e,this.each(function(){if(this.setSelectionRange)this.setSelectionRange(e,t);else if(this.createTextRange){var n=this.createTextRange();n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select()}});if(this[0].setSelectionRange)e=this[0].selectionStart,t=this[0].selectionEnd;else if(document.selection&&document.selection.createRange){var n=document.selection.createRange();e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length}return{begin:e,end:t}}},unmask:function(){return this.trigger("unmask")},isMaskValid:function(){return $(this).data("mask-isvalid")},mask:function(n,a){if(!n&&this.length>0){var r=$(this[0]),i=r.data($.mask.dataName);if("function"!=typeof i)throw new Error("The Mask widget is not correctly set up");return i()}a=$.extend({placeholder:"_",completed:null},a);var o=$.mask.definitions,c=[],l=n.length,s=null,u=n.length;return $.each(n.split(""),function(e,t){"?"==t?(u--,l=e):o[t]?(c.push(new RegExp(o[t])),null==s&&(s=c.length-1)):c.push(null)}),this.trigger("unmask").each(function(){function r(e){for(;++e<=u&&!c[e];);return e}function i(e){for(;--e>=0&&!c[e];);return e}function f(e,t){if(!(0>e)){for(var n=e,i=r(t);u>n;n++)if(c[n]){if(!(u>i&&c[n].test(w[i])))break;w[n]=w[i],w[i]=a.placeholder,i=r(i)}g(),b.caret(Math.max(s,e))}}function h(e){for(var t=e,n=a.placeholder;u>t;t++)if(c[t]){var i=r(t),o=w[t];if(w[t]=n,!(u>i&&c[i].test(o)))break;n=o}}function d(e){var n=e.which;if(8==n||46==n||t&&127==n){var a=b.caret(),o=a.begin,c=a.end;return c-o==0&&(o=46!=n?i(o):c=r(o-1),c=46==n?r(c):c),v(o,c),f(o,c-1),k(),!1}return 27==n?(b.val(y),b.caret(0,p()),!1):void 0}function m(e){var t=e.which,n=b.caret();if(e.ctrlKey||e.altKey||e.metaKey||32>t)return!0;if(t){n.end-n.begin!=0&&(v(n.begin,n.end),f(n.begin,n.end-1),k());var i=r(n.begin-1);if(u>i){var o=String.fromCharCode(t);if(c[i].test(o)){h(i),w[i]=o,g();var l=r(i);b.caret(l),k(),a.completed&&l>=u&&a.completed.call(b)}}return!1}}function v(e,t){for(var n=e;t>n&&u>n;n++)c[n]&&(w[n]=a.placeholder)}function g(){return b.val(w.join("")).val()}function k(){for(var e=b.val(),t=-1,n=0,r=0;u>n;n++)if(c[n]){for(w[n]=a.placeholder;r++<e.length;){var i=e.charAt(r-1);if(c[n].test(i)){w[n]=i,t=n;break}}if(r>e.length)break}else w[n]==e.charAt(r)&&n!=l&&(r++,t=n);var o=t+1>=l;return b.data("mask-isvalid",o),o}function p(e){for(var t=b.val(),n=-1,r=0,i=0;u>r;r++)if(c[r]){for(w[r]=a.placeholder;i++<t.length;){var o=t.charAt(i-1);if(c[r].test(o)){w[r]=o,n=r;break}}if(i>t.length)break}else w[r]==t.charAt(i)&&r!=l&&(i++,n=r);return!e&&l>n+1?(b.val(""),v(0,u)):(e||n+1>=l)&&(g(),e||b.val(b.val().substring(0,n+1))),l?r:s}var b=$(this),w=$.map(n.split(""),function(e,t){return"?"!=e?o[e]?a.placeholder:e:void 0}),y=b.val();b.data($.mask.dataName,function(){return $.map(w,function(e,t){return c[t]&&e!=a.placeholder?e:null}).join("")}),b.attr("readonly")||b.one("unmask",function(){b.unbind(".mask").removeData($.mask.dataName)}).bind("focus.mask",function(){y=b.val();var e=p();g();var t=function(){e==n.length?b.caret(0,e):b.caret(e)};($.browser.msie?t:function(){setTimeout(t,0)})()}).bind("blur.mask",function(){p(),b.val()!=y&&b.change()}).bind("keydown.mask",d).bind("keypress.mask",m).bind(e,function(){setTimeout(function(){b.caret(p(!0))},0)}),p()})}})}(jQuery);