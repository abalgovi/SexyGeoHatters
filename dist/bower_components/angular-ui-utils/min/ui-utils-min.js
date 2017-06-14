/**
 * angular-ui-utils - Swiss-Army-Knife of AngularJS tools (with no external dependencies!)
 * @version v0.2.3 - 2015-03-30
 * @link http://angular-ui.github.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function uiUploader(e){"use strict";function t(e){for(var t=0;t<e.length;t++)l.files.push(e[t])}function n(){return l.files}function i(e){l.options=e;for(var t=0;t<l.files.length&&l.activeUploads!=l.options.concurrency;t++)l.files[t].active||a(l.files[t],l.options.url)}function r(e){l.files.splice(l.files.indexOf(e),1)}function o(){l.files.splice(0,l.files.length)}function u(e){var t=["n/a","bytes","KiB","MiB","GiB","TB","PB","EiB","ZiB","YiB"],n=+Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,n)).toFixed(n?1:0)+" "+t[isNaN(e)?0:n+1]}function a(e,t){var n,r,o,a="",s="file";if(l.activeUploads+=1,e.active=!0,n=new window.XMLHttpRequest,r=new window.FormData,n.open("POST",t),n.upload.onloadstart=function(){},n.upload.onprogress=function(t){t.lengthComputable&&(e.loaded=t.loaded,e.humanSize=u(t.loaded),l.options.onProgress(e))},n.onload=function(){l.activeUploads-=1,i(l.options),l.options.onCompleted(e,n.responseText)},n.onerror=function(){},a)for(o in a)a.hasOwnProperty(o)&&r.append(o,a[o]);return r.append(s,e,e.name),n.send(r),n}var l=this;return l.files=[],l.options={},l.activeUploads=0,e.info("uiUploader loaded"),{addFiles:t,getFiles:n,files:l.files,startUpload:i,removeFile:r,removeAll:o}}angular.module("ui.alias",[]).config(["$compileProvider","uiAliasConfig",function(e,t){"use strict";t=t||{},angular.forEach(t,function(t,n){angular.isString(t)&&(t={replace:!0,template:t}),e.directive(n,function(){return t})})}]),angular.module("ui.event",[]).directive("uiEvent",["$parse",function(e){"use strict";return function(t,n,i){var r=t.$eval(i.uiEvent);angular.forEach(r,function(i,r){var o=e(i);n.bind(r,function(e){var n=Array.prototype.slice.call(arguments);n=n.splice(1),o(t,{$event:e,$params:n}),t.$$phase||t.$apply()})})}}]),angular.module("ui.format",[]).filter("format",function(){"use strict";return function(e,t){var n=e;if(angular.isString(n)&&void 0!==t)if(angular.isArray(t)||angular.isObject(t)||(t=[t]),angular.isArray(t)){var i=t.length,r=function(e,n){return n=parseInt(n,10),n>=0&&i>n?t[n]:e};n=n.replace(/\$([0-9]+)/g,r)}else angular.forEach(t,function(e,t){n=n.split(":"+t).join(e)});return n}}),angular.module("ui.highlight",[]).filter("highlight",function(){"use strict";return function(e,t,n){return e&&(t||angular.isNumber(t))?(e=e.toString(),t=t.toString(),n?e.split(t).join('<span class="ui-match">'+t+"</span>"):e.replace(new RegExp(t,"gi"),'<span class="ui-match">$&</span>')):e}}),angular.module("ui.include",[]).directive("uiInclude",["$http","$templateCache","$anchorScroll","$compile",function(e,t,n,i){"use strict";return{restrict:"ECA",terminal:!0,compile:function(r,o){var u=o.uiInclude||o.src,a=o.fragment||"",l=o.onload||"",s=o.autoscroll;return function(r,o){function c(){var c=++f,g=r.$eval(u),h=r.$eval(a);g?e.get(g,{cache:t}).success(function(e){if(c===f){d&&d.$destroy(),d=r.$new();var t;t=h?angular.element("<div/>").html(e).find(h):angular.element("<div/>").html(e).contents(),o.html(t),i(t)(d),!angular.isDefined(s)||s&&!r.$eval(s)||n(),d.$emit("$includeContentLoaded"),r.$eval(l)}}).error(function(){c===f&&p()}):p()}var f=0,d,p=function(){d&&(d.$destroy(),d=null),o.html("")};r.$watch(a,c),r.$watch(u,c)}}}}]),angular.module("ui.indeterminate",[]).directive("uiIndeterminate",[function(){"use strict";return{compile:function(e,t){return t.type&&"checkbox"===t.type.toLowerCase()?function(e,t,n){e.$watch(n.uiIndeterminate,function(e){t[0].indeterminate=!!e})}:angular.noop}}}]),angular.module("ui.inflector",[]).filter("inflector",function(){"use strict";function e(e){return e=e.replace(/([A-Z])|([\-|\_])/g,function(e,t){return" "+(t||"")}),e.replace(/\s\s+/g," ").trim().toLowerCase().split(" ")}function t(e){var t=[];return angular.forEach(e,function(e){t.push(e.charAt(0).toUpperCase()+e.substr(1))}),t}var n={humanize:function(n){return t(e(n)).join(" ")},underscore:function(t){return e(t).join("_")},variable:function(n){return n=e(n),n=n[0]+t(n.slice(1)).join("")}};return function(e,t){return t!==!1&&angular.isString(e)?(t=t||"humanize",n[t](e)):e}}),angular.module("ui.jq",[]).value("uiJqConfig",{}).directive("uiJq",["uiJqConfig","$timeout",function e(t,n){"use strict";return{restrict:"A",compile:function i(e,r){if(!angular.isFunction(e[r.uiJq]))throw new Error('ui-jq: The "'+r.uiJq+'" function does not exist');var o=t&&t[r.uiJq];return function u(e,t,i){function r(){var t=[];return i.uiOptions?(t=e.$eval("["+i.uiOptions+"]"),angular.isObject(o)&&angular.isObject(t[0])&&(t[0]=angular.extend({},o,t[0]))):o&&(t=[o]),t}function u(){n(function(){t[i.uiJq].apply(t,r())},0,!1)}i.ngModel&&t.is("select,input,textarea")&&t.bind("change",function(){t.trigger("input")}),i.uiRefresh&&e.$watch(i.uiRefresh,function(){u()}),u()}}}}]),angular.module("ui.keypress",[]).factory("keypressHelper",["$parse",function t(e){"use strict";var t={8:"backspace",9:"tab",13:"enter",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete"},n=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};return function(i,r,o,u){var a,l=[];a=r.$eval(u["ui"+n(i)]),angular.forEach(a,function(t,n){var i,r;r=e(t),angular.forEach(n.split(" "),function(e){i={expression:r,keys:{}},angular.forEach(e.split("-"),function(e){i.keys[e]=!0}),l.push(i)})}),o.bind(i,function(e){var n=!(!e.metaKey||e.ctrlKey),o=!!e.altKey,u=!!e.ctrlKey,a=!!e.shiftKey,s=e.keyCode;"keypress"===i&&!a&&s>=97&&122>=s&&(s-=32),angular.forEach(l,function(i){var l=i.keys[t[s]]||i.keys[s.toString()],c=!!i.keys.meta,f=!!i.keys.alt,d=!!i.keys.ctrl,p=!!i.keys.shift;l&&c===n&&f===o&&d===u&&p===a&&r.$apply(function(){i.expression(r,{$event:e})})})})}}]),angular.module("ui.keypress").directive("uiKeydown",["keypressHelper",function(e){"use strict";return{link:function(t,n,i){e("keydown",t,n,i)}}}]),angular.module("ui.keypress").directive("uiKeypress",["keypressHelper",function(e){"use strict";return{link:function(t,n,i){e("keypress",t,n,i)}}}]),angular.module("ui.keypress").directive("uiKeyup",["keypressHelper",function(e){"use strict";return{link:function(t,n,i){e("keyup",t,n,i)}}}]),angular.module("ui.mask",[]).value("uiMaskConfig",{maskDefinitions:{9:/\d/,A:/[a-zA-Z]/,"*":/[a-zA-Z0-9]/},clearOnBlur:!0}).directive("uiMask",["uiMaskConfig","$parse",function(e,t){"use strict";return{priority:100,require:"ngModel",restrict:"A",compile:function n(){var n=e;return function i(e,r,o,u){function a(e){return angular.isDefined(e)?(w(e),T?(d(),p(),!0):f()):f()}function l(e){angular.isDefined(e)&&(P=e,T&&E())}function s(e){return T?(D=m(e||""),F=h(D),u.$setValidity("mask",F),F&&D.length?v(D):void 0):e}function c(e){return T?(D=m(e||""),F=h(D),u.$viewValue=D.length?v(D):"",u.$setValidity("mask",F),""===D&&o.required&&u.$setValidity("required",!u.$error.required),F?D:void 0):e}function f(){return T=!1,g(),angular.isDefined(U)?r.attr("placeholder",U):r.removeAttr("placeholder"),angular.isDefined(B)?r.attr("maxlength",B):r.removeAttr("maxlength"),r.val(u.$modelValue),u.$viewValue=u.$modelValue,!1}function d(){D=z=m(u.$viewValue||""),L=_=v(D),F=h(D);var e=F&&D.length?L:"";o.maxlength&&r.attr("maxlength",2*R[R.length-1]),r.attr("placeholder",P),r.val(e),u.$viewValue=e}function p(){M||(r.bind("blur",x),r.bind("mousedown mouseup",k),r.bind("input keyup click focus",E),M=!0)}function g(){M&&(r.unbind("blur",x),r.unbind("mousedown",k),r.unbind("mouseup",k),r.unbind("input",E),r.unbind("keyup",E),r.unbind("click",E),r.unbind("focus",E),M=!1)}function h(e){return e.length?e.length>=q:!0}function m(e){var t="",n=A.slice();return e=e.toString(),angular.forEach(j,function(t){e=e.replace(t,"")}),angular.forEach(e.split(""),function(e){n.length&&n[0].test(e)&&(t+=e,n.shift())}),t}function v(e){var t="",n=R.slice();return angular.forEach(P.split(""),function(i,r){e.length&&r===n[0]?(t+=e.charAt(0)||"_",e=e.substr(1),n.shift()):t+=i}),t}function b(e){var t=o.placeholder;return"undefined"!=typeof t&&t[e]?t[e]:"_"}function y(){return P.replace(/[_]+/g,"_").replace(/([^_]+)([a-zA-Z0-9])([^_])/g,"$1$2_$3").split("_")}function w(e){var t=0;if(R=[],A=[],P="","string"==typeof e){q=0;var n=!1,i=0,r=e.split("");angular.forEach(r,function(e,r){I.maskDefinitions[e]?(R.push(t),P+=b(r-i),A.push(I.maskDefinitions[e]),t++,n||q++):"?"===e?(n=!0,i++):(P+=e,t++)})}R.push(R.slice().pop()+1),j=y(),T=R.length>1?!0:!1}function x(){I.clearOnBlur&&(K=0,W=0,F&&0!==D.length||(L="",r.val(""),e.$apply(function(){u.$setViewValue("")})))}function k(e){"mousedown"===e.type?r.bind("mouseout",S):r.unbind("mouseout",S)}function S(){W=C(this),r.unbind("mouseout",S)}function E(t){t=t||{};var n=t.which,i=t.type;if(16!==n&&91!==n){var o=r.val(),a=_,l,s=m(o),c=z,f=!1,d=H(this)||0,p=K||0,g=d-p,h=R[0],b=R[s.length]||R.slice().shift(),y=W||0,w=C(this)>0,x=y>0,k=o.length>a.length||y&&o.length>a.length-y,S=o.length<a.length||y&&o.length===a.length-y,E=n>=37&&40>=n&&t.shiftKey,T=37===n,M=8===n||"keyup"!==i&&S&&-1===g,A=46===n||"keyup"!==i&&S&&0===g&&!x,P=(T||M||"click"===i)&&d>h;if(W=C(this),!E&&(!w||"click"!==i&&"keyup"!==i)){if("input"===i&&S&&!x&&s===c){for(;M&&d>h&&!V(d);)d--;for(;A&&b>d&&-1===R.indexOf(d);)d++;var j=R.indexOf(d);s=s.substring(0,j)+s.substring(j+1),f=!0}for(l=v(s),_=l,z=s,r.val(l),f&&e.$apply(function(){u.$setViewValue(s)}),k&&h>=d&&(d=h+1),P&&d--,d=d>b?b:h>d?h:d;!V(d)&&d>h&&b>d;)d+=P?-1:1;(P&&b>d||k&&!V(p))&&d++,K=d,O(this,d)}}}function V(e){return R.indexOf(e)>-1}function H(e){if(!e)return 0;if(void 0!==e.selectionStart)return e.selectionStart;if(document.selection){e.focus();var t=document.selection.createRange();return t.moveStart("character",e.value?-e.value.length:0),t.text.length}return 0}function O(e,t){if(!e)return 0;if(0!==e.offsetWidth&&0!==e.offsetHeight)if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){var n=e.createTextRange();n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",t),n.select()}}function C(e){return e?void 0!==e.selectionStart?e.selectionEnd-e.selectionStart:document.selection?document.selection.createRange().text.length:0:0}var T=!1,M=!1,R,A,P,j,q,D,L,F,U=o.placeholder,B=o.maxlength,_,z,K,W,I={};o.uiOptions?(I=e.$eval("["+o.uiOptions+"]"),angular.isObject(I[0])&&(I=function(e,t){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(void 0===t[n]?t[n]=angular.copy(e[n]):angular.extend(t[n],e[n]));return t}(n,I[0]))):I=n,o.$observe("uiMask",a),o.$observe("placeholder",l);var J=!1;o.$observe("modelViewValue",function(e){"true"===e&&(J=!0)}),e.$watch(o.ngModel,function(n){if(J&&n){var i=t(o.ngModel);i.assign(e,u.$viewValue)}}),u.$formatters.push(s),u.$parsers.push(c),r.bind("mousedown mouseup",k),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var i=0;if(arguments.length>1&&(i=Number(arguments[1]),i!==i?i=0:0!==i&&i!==1/0&&i!==-(1/0)&&(i=(i>0||-1)*Math.floor(Math.abs(i)))),i>=n)return-1;for(var r=i>=0?i:Math.max(n-Math.abs(i),0);n>r;r++)if(r in t&&t[r]===e)return r;return-1})}}}}]),angular.module("ui.reset",[]).value("uiResetConfig",null).directive("uiReset",["uiResetConfig",function(e){"use strict";var t=null;return void 0!==e&&(t=e),{require:"ngModel",link:function(e,n,i,r){var o;o=angular.element('<a class="ui-reset" />'),n.wrap('<span class="ui-resetwrap" />').after(o),o.bind("click",function(n){n.preventDefault(),e.$apply(function(){i.uiReset?r.$setViewValue(e.$eval(i.uiReset)):r.$setViewValue(t),r.$render()})})}}}]),angular.module("ui.route",[]).directive("uiRoute",["$location","$parse",function(e,t){"use strict";return{restrict:"AC",scope:!0,compile:function(n,i){var r;if(i.uiRoute)r="uiRoute";else if(i.ngHref)r="ngHref";else{if(!i.href)throw new Error("uiRoute missing a route or href property on "+n[0]);r="href"}return function(n,i,o){function u(t){var i=t.indexOf("#");i>-1&&(t=t.substr(i+1)),(s=function r(){l(n,e.path().indexOf(t)>-1)})()}function a(t){var i=t.indexOf("#");i>-1&&(t=t.substr(i+1)),(s=function r(){var i=new RegExp("^"+t+"$",["i"]);l(n,i.test(e.path()))})()}var l=t(o.ngModel||o.routeModel||"$uiRoute").assign,s=angular.noop;switch(r){case"uiRoute":o.uiRoute?a(o.uiRoute):o.$observe("uiRoute",a);break;case"ngHref":o.ngHref?u(o.ngHref):o.$observe("ngHref",u);break;case"href":u(o.href)}n.$on("$routeChangeSuccess",function(){s()}),n.$on("$stateChangeSuccess",function(){s()})}}}}]),angular.module("ui.scroll.jqlite",["ui.scroll"]).service("jqLiteExtras",["$log","$window",function(e,t){"use strict";return{registerFor:function(e){var n,i,r,o,u,a,l;return i=angular.element.prototype.css,e.prototype.css=function(e,t){var n,r;return r=this,n=r[0],n&&3!==n.nodeType&&8!==n.nodeType&&n.style?i.call(r,e,t):void 0},a=function(e){return e&&e.document&&e.location&&e.alert&&e.setInterval},l=function(e,t,n){var i,r,o,u,l;return i=e[0],l={top:["scrollTop","pageYOffset","scrollLeft"],left:["scrollLeft","pageXOffset","scrollTop"]}[t],r=l[0],u=l[1],o=l[2],a(i)?angular.isDefined(n)?i.scrollTo(e[o].call(e),n):u in i?i[u]:i.document.documentElement[r]:angular.isDefined(n)?i[r]=n:i[r]},t.getComputedStyle?(o=function(e){return t.getComputedStyle(e,null)},n=function(e,t){return parseFloat(t)}):(o=function(e){return e.currentStyle},n=function(e,t){var n,i,r,o,u,a,l;return n=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,o=new RegExp("^("+n+")(?!px)[a-z%]+$","i"),o.test(t)?(l=e.style,i=l.left,u=e.runtimeStyle,a=u&&u.left,u&&(u.left=l.left),l.left=t,r=l.pixelLeft,l.left=i,a&&(u.left=a),r):parseFloat(t)}),r=function(e,t){var i,r,u,l,s,c,f,d,p,g,h,m,v;return a(e)?(i=document.documentElement[{height:"clientHeight",width:"clientWidth"}[t]],{base:i,padding:0,border:0,margin:0}):(v={width:[e.offsetWidth,"Left","Right"],height:[e.offsetHeight,"Top","Bottom"]}[t],i=v[0],f=v[1],d=v[2],c=o(e),h=n(e,c["padding"+f])||0,m=n(e,c["padding"+d])||0,r=n(e,c["border"+f+"Width"])||0,u=n(e,c["border"+d+"Width"])||0,l=c["margin"+f],s=c["margin"+d],p=n(e,l)||0,g=n(e,s)||0,{base:i,padding:h+m,border:r+u,margin:p+g})},u=function(e,t,n){var i,u,a;return u=r(e,t),u.base>0?{base:u.base-u.padding-u.border,outer:u.base,outerfull:u.base+u.margin}[n]:(i=o(e),a=i[t],(0>a||null===a)&&(a=e.style[t]||0),a=parseFloat(a)||0,{base:a-u.padding-u.border,outer:a,outerfull:a+u.padding+u.border+u.margin}[n])},angular.forEach({before:function(e){var t,n,i,r,o,u,a;if(o=this,n=o[0],r=o.parent(),t=r.contents(),t[0]===n)return r.prepend(e);for(i=u=1,a=t.length-1;a>=1?a>=u:u>=a;i=a>=1?++u:--u)if(t[i]===n)return void angular.element(t[i-1]).after(e);throw new Error("invalid DOM structure "+n.outerHTML)},height:function(e){var t;return t=this,angular.isDefined(e)?(angular.isNumber(e)&&(e+="px"),i.call(t,"height",e)):u(this[0],"height","base")},outerHeight:function(e){return u(this[0],"height",e?"outerfull":"outer")},offset:function(e){var t,n,i,r,o,u;if(o=this,arguments.length){if(void 0===e)return o;throw new Error("offset setter method is not implemented")}return t={top:0,left:0},r=o[0],(n=r&&r.ownerDocument)?(i=n.documentElement,null!=r.getBoundingClientRect&&(t=r.getBoundingClientRect()),u=n.defaultView||n.parentWindow,{top:t.top+(u.pageYOffset||i.scrollTop)-(i.clientTop||0),left:t.left+(u.pageXOffset||i.scrollLeft)-(i.clientLeft||0)}):void 0},scrollTop:function(e){return l(this,"top",e)},scrollLeft:function(e){return l(this,"left",e)}},function(t,n){return e.prototype[n]?void 0:e.prototype[n]=t})}}}]).run(["$log","$window","jqLiteExtras",function(e,t,n){"use strict";return t.jQuery?void 0:n.registerFor(angular.element)}]),angular.module("ui.scroll",[]).directive("uiScrollViewport",["$log",function(){"use strict";return{controller:["$scope","$element",function(e,t){return this.viewport=t,this}]}}]).directive("uiScroll",["$log","$injector","$rootScope","$timeout",function(e,t,n,i){"use strict";return{require:["?^uiScrollViewport"],transclude:"element",priority:1e3,terminal:!0,compile:function(r,o,u){return function(r,o,a,l){var s,c,f,d,p,g,h,m,v,b,y,w,x,k,S,E,V,H,O,C,T,M,R,A,P,j,q,D,L,F,U,B,_,z,K,W,I,J,N,Y,Z,X,G,Q,ee,te,ne,ie,re;if(B=e.debug||e.log,_=a.uiScroll.match(/^\s*(\w+)\s+in\s+([\w\.]+)\s*$/),!_)throw new Error("Expected uiScroll in form of '_item_ in _datasource_' but got '"+a.uiScroll+"'");if(F=_[1],S=_[2],j=function(e,t){var n;if(e)return n=t.match(/^([\w]+)\.(.+)$/),n&&3===n.length?j(e[n[1]],n[2]):e[t]},Z=function(e,t,n,i){var r;if(e&&t&&((r=t.match(/^([\w]+)\.(.+)$/))||-1===t.indexOf(".")))return r&&3===r.length?(angular.isObject(e[r[1]])||i||(e[r[1]]={}),Z(e[r[1]],r[2],n,i)):angular.isObject(e[t])||i?e[t]=n:e[t]=n},k=j(r,S),L=function(){return angular.isObject(k)&&"function"==typeof k.get},!L()&&(k=t.get(S),!L()))throw new Error(""+S+" is not a valid datasource");return b=Math.max(3,+a.bufferSize||10),v=function(){return ne.outerHeight()*Math.max(.1,+a.padding||.1)},Y=function(e){var t;return null!=(t=e[0].scrollHeight)?t:e[0].document.documentElement.scrollHeight},y=null,u(r.$new(),function(e){var t,n,i,u,a,s;if(u=e[0].localName,"dl"===u)throw new Error("ui-scroll directive does not support <"+e[0].localName+"> as a repeating tag: "+e[0].outerHTML);return"li"!==u&&"tr"!==u&&(u="div"),s=l[0]&&l[0].viewport?l[0].viewport:angular.element(window),s.css({"overflow-y":"auto",display:"block"}),i=function(e){var t,n,i;switch(e){case"tr":return i=angular.element("<table><tr><td><div></div></td></tr></table>"),t=i.find("div"),n=i.find("tr"),n.paddingHeight=function(){return t.height.apply(t,arguments)},n;default:return n=angular.element("<"+e+"></"+e+">"),n.paddingHeight=n.height,n}},n=function(e,t,n){return t[{top:"before",bottom:"after"}[n]](e),{paddingHeight:function(){return e.paddingHeight.apply(e,arguments)},insert:function(t){return e[{top:"after",bottom:"before"}[n]](t)}}},a=n(i(u),o,"top"),t=n(i(u),o,"bottom"),r.$on("$destroy",e.remove),y={viewport:s,topPadding:a.paddingHeight,bottomPadding:t.paddingHeight,append:t.insert,prepend:a.insert,bottomDataPos:function(){return Y(s)-t.paddingHeight()},topDataPos:function(){return a.paddingHeight()}}}),ne=y.viewport,ie=ne.scope()||n,ee=function(e){return s.topVisible=e.scope[F],s.topVisibleElement=e.element,s.topVisibleScope=e.scope,a.topVisible&&Z(ie,a.topVisible,s.topVisible),a.topVisibleElement&&Z(ie,a.topVisibleElement,s.topVisibleElement),a.topVisibleScope&&Z(ie,a.topVisibleScope,s.topVisibleScope),"function"==typeof k.topVisible?k.topVisible(e):void 0},U=function(e){return s.isLoading=e,a.isLoading&&Z(r,a.isLoading,e),"function"==typeof k.loading?k.loading(e):void 0},N=0,P=1,z=1,m=[],K=[],T=!1,g=!1,I=function(e,t){var n,i;for(n=i=e;t>=e?t>i:i>t;n=t>=e?++i:--i)m[n].scope.$destroy(),m[n].element.remove();return m.splice(e,t-e)},W=function(){return N++,P=1,z=1,I(0,m.length),y.topPadding(0),y.bottomPadding(0),K=[],T=!1,g=!1,f(N)},h=function(){return ne.scrollTop()+ne.outerHeight()},te=function(){return ne.scrollTop()},X=function(){return!T&&y.bottomDataPos()<h()+v()},w=function(){var e,t,n,i,r,o,u,a,l,s;for(e=0,u=0,t=l=s=m.length-1;0>=s?0>=l:l>=0;t=0>=s?++l:--l)if(n=m[t],r=n.element.offset().top,o=a!==r,a=r,o&&(i=n.element.outerHeight(!0)),y.bottomDataPos()-e-i>h()+v())o&&(e+=i),u++,T=!1;else{if(o)break;u++}return u>0?(y.bottomPadding(y.bottomPadding()+e),I(m.length-u,m.length),z-=u):void 0},G=function(){return!g&&y.topDataPos()>te()-v()},x=function(){var e,t,n,i,r,o,u,a,l;for(u=0,r=0,a=0,l=m.length;l>a;a++)if(e=m[a],n=e.element.offset().top,i=o!==n,o=n,i&&(t=e.element.outerHeight(!0)),y.topDataPos()+u+t<te()-v())i&&(u+=t),r++,g=!1;else{if(i)break;r++}return r>0?(y.topPadding(y.topPadding()+u),I(0,r),P+=r):void 0},C=function(e,t){return s.isLoading||U(!0),1===K.push(t)?R(e):void 0},q=function(e){return e.displayTemp=e.css("display"),e.css("display","none")},Q=function(e){return e.hasOwnProperty("displayTemp")?e.css("display",e.displayTemp):void 0},D=function(e,t){var n,i,o;return n=r.$new(),n[F]=t,i=e>P,n.$index=e,i&&n.$index--,o={scope:n},u(n,function(t){return o.element=t,i?e===z?(q(t),y.append(t),m.push(o)):(m[e-P].element.after(t),m.splice(e-P+1,0,o)):(q(t),y.prepend(t),m.unshift(o))}),{appended:i,wrapper:o}},d=function(e,t){var n;return e?y.bottomPadding(Math.max(0,y.bottomPadding()-t.element.outerHeight(!0))):(n=y.topPadding()-t.element.outerHeight(!0),n>=0?y.topPadding(n):ne.scrollTop(ne.scrollTop()+t.element.outerHeight(!0)))},E=function(e,t){var n,i,r,o,u,a,l,s,c;if(X()?C(e,!0):G()&&C(e,!1),t&&t(e),0===K.length){for(a=0,c=[],l=0,s=m.length;s>l;l++){if(n=m[l],r=n.element.offset().top,o=u!==r,u=r,o&&(i=n.element.outerHeight(!0)),!(o&&y.topDataPos()+a+i<te())){o&&ee(n);break}c.push(a+=i)}return c}},f=function(e,t,n){return t&&t.length?i(function(){var i,r,o,u,a,l,s,c,f;for(a=[],l=0,c=t.length;c>l;l++)o=t[l],i=o.wrapper.element,Q(i),r=i.offset().top,u!==r&&(a.push(o),u=r);for(s=0,f=a.length;f>s;s++)o=a[s],d(o.appended,o.wrapper);return E(e,n)}):E(e,n)},A=function(e,t){return f(e,t,function(){return K.shift(),0===K.length?U(!1):R(e)})},R=function(e){var t;return t=K[0],t?m.length&&!X()?A(e):k.get(z,b,function(t){var n,i,o,u;if(!(e&&e!==N||r.$$destroyed)){if(i=[],t.length<b&&(T=!0,y.bottomPadding(0)),t.length>0)for(x(),o=0,u=t.length;u>o;o++)n=t[o],i.push(D(++z,n));return A(e,i)}}):m.length&&!G()?A(e):k.get(P-b,b,function(t){var n,i,o,u;if(!(e&&e!==N||r.$$destroyed)){if(i=[],t.length<b&&(g=!0,y.topPadding(0)),t.length>0)for(m.length&&w(),n=o=u=t.length-1;0>=u?0>=o:o>=0;n=0>=u?++o:--o)i.unshift(D(--P,t[n]));return A(e,i)}})},J=function(){return n.$$phase||s.isLoading?void 0:(f(),r.$apply())},re=function(e){var t,n;return t=ne[0].scrollTop,n=ne[0].scrollHeight-ne[0].clientHeight,0===t&&!g||t===n&&!T?e.preventDefault():void 0},ne.bind("resize",J),ne.bind("scroll",J),ne.bind("mousewheel",re),r.$watch(k.revision,W),M=k.scope?k.scope.$new():r.$new(),r.$on("$destroy",function(){var e,t,n;for(t=0,n=m.length;n>t;t++)e=m[t],e.scope.$destroy(),e.element.remove();return ne.unbind("resize",J),ne.unbind("scroll",J),ne.unbind("mousewheel",re)}),s={},s.isLoading=!1,p=function(e,t){var n,i,r,o,u,a,l,s,c,f,d,p;if(i=[],angular.isArray(t))if(t.length){if(1===t.length&&t[0]===e.scope[F])return i;for(o=e.scope.$index,a=o>P?o-P:1,n=l=0,f=t.length;f>l;n=++l)u=t[n],i.push(D(o+n,u));for(I(a,a+1),n=s=0,d=m.length;d>s;n=++s)r=m[n],r.scope.$index=P+n}else for(I(e.scope.$index-P,e.scope.$index-P+1),z--,n=c=0,p=m.length;p>c;n=++c)r=m[n],r.scope.$index=P+n;return i},s.applyUpdates=function(e,t){var n,i,r,o,u,a;if(n=[],N++,angular.isFunction(e))for(u=m.slice(0),r=0,o=u.length;o>r;r++)i=u[r],n.concat(n,p(i,e(i.scope[F],i.scope,i.element)));else{if(e%1!==0)throw new Error("applyUpdates - "+e+" is not a valid index or outside of range");0<=(a=e-P-1)&&a<m.length&&(n=p(m[e-P],t))}return f(N,n)},a.adapter&&(c=j(r,a.adapter),c||(Z(r,a.adapter,{}),c=j(r,a.adapter)),angular.extend(c,s),s=c),O=function(e,t){var n,i,r,o,u;if(angular.isFunction(e))for(i=function(t){return e(t.scope)},r=0,o=m.length;o>r;r++)n=m[r],i(n);else 0<=(u=e-P-1)&&u<m.length&&(m[e-P-1].scope[F]=t);return null},V=function(e){var t,n,i,r,o,u,a,l,s,c,d,p;if(angular.isFunction(e)){for(i=[],u=0,s=m.length;s>u;u++)n=m[u],i.unshift(n);for(o=function(n){return e(n.scope)?(I(i.length-1-t,i.length-t),z--):void 0},t=a=0,c=i.length;c>a;t=++a)r=i[t],o(r)}else 0<=(p=e-P-1)&&p<m.length&&(I(e-P-1,e-P),z--);for(t=l=0,d=m.length;d>l;t=++l)n=m[t],n.scope.$index=P+t;return f()},H=function(e,t){var n,i,r,o,u;if(i=[],angular.isFunction(e))throw new Error("not implemented - Insert with locator function");for(0<=(u=e-P-1)&&u<m.length&&(i.push(D(e,t)),z++),n=r=0,o=m.length;o>r;n=++r)t=m[n],t.scope.$index=P+n;return f(null,i)},M.$on("insert.item",function(e,t,n){return H(t,n)}),M.$on("update.items",function(e,t,n){return O(t,n)}),M.$on("delete.items",function(e,t){return V(t)})}}}}]),angular.module("ui.scrollfix",[]).directive("uiScrollfix",["$window",function(e){"use strict";function t(){if(angular.isDefined(e.pageYOffset))return e.pageYOffset;var t=document.compatMode&&"BackCompat"!==document.compatMode?document.documentElement:document.body;return t.scrollTop}return{require:"^?uiScrollfixTarget",link:function(n,i,r,o){function u(){var e=a?r.uiScrollfix:i[0].offsetTop+l,n=o?c[0].scrollTop:t();!i.hasClass("ui-scrollfix")&&n>e?(i.addClass("ui-scrollfix"),s=e):i.hasClass("ui-scrollfix")&&s>n&&i.removeClass("ui-scrollfix")}var a=!0,l=0,s,c=o&&o.$element||angular.element(e);r.uiScrollfix?"string"==typeof r.uiScrollfix&&("-"===r.uiScrollfix.charAt(0)?(a=!1,l=-parseFloat(r.uiScrollfix.substr(1))):"+"===r.uiScrollfix.charAt(0)&&(a=!1,l=parseFloat(r.uiScrollfix.substr(1)))):a=!1,s=a?r.uiScrollfix:i[0].offsetTop+l,c.on("scroll",u),n.$on("$destroy",function(){c.off("scroll",u)})}}}]).directive("uiScrollfixTarget",[function(){"use strict";return{controller:["$element",function(e){this.$element=e}]}}]),angular.module("ui.showhide",[]).directive("uiShow",[function(){"use strict";return function(e,t,n){e.$watch(n.uiShow,function(e){e?t.addClass("ui-show"):t.removeClass("ui-show")})}}]).directive("uiHide",[function(){"use strict";return function(e,t,n){e.$watch(n.uiHide,function(e){e?t.addClass("ui-hide"):t.removeClass("ui-hide")})}}]).directive("uiToggle",[function(){"use strict";return function(e,t,n){e.$watch(n.uiToggle,function(e){e?t.removeClass("ui-hide").addClass("ui-show"):t.removeClass("ui-show").addClass("ui-hide")})}}]),angular.module("ui.unique",[]).filter("unique",["$parse",function(e){"use strict";return function(t,n){if(n===!1)return t;if((n||angular.isUndefined(n))&&angular.isArray(t)){var i=[],r=angular.isString(n)?e(n):function(e){return e},o=function(e){return angular.isObject(e)?r(e):e};angular.forEach(t,function(e){for(var t=!1,n=0;n<i.length;n++)if(angular.equals(o(i[n]),o(e))){t=!0;break}t||i.push(e)}),t=i}return t}}]),angular.module("ui.uploader",[]).service("uiUploader",uiUploader),uiUploader.$inject=["$log"],angular.module("ui.validate",[]).directive("uiValidate",function(){"use strict";return{restrict:"A",require:"ngModel",link:function(e,t,n,i){function r(t){return angular.isString(t)?void e.$watch(t,function(){angular.forEach(u,function(e){e(i.$modelValue)})}):angular.isArray(t)?void angular.forEach(t,function(t){e.$watch(t,function(){angular.forEach(u,function(e){e(i.$modelValue)})})}):void(angular.isObject(t)&&angular.forEach(t,function(t,n){angular.isString(t)&&e.$watch(t,function(){u[n](i.$modelValue)}),angular.isArray(t)&&angular.forEach(t,function(t){e.$watch(t,function(){u[n](i.$modelValue)})})}))}var o,u={},a=e.$eval(n.uiValidate);a&&(angular.isString(a)&&(a={validator:a}),angular.forEach(a,function(t,n){o=function(r){var o=e.$eval(t,{$value:r});return angular.isObject(o)&&angular.isFunction(o.then)?(o.then(function(){i.$setValidity(n,!0)},function(){i.$setValidity(n,!1)}),r):o?(i.$setValidity(n,!0),r):(i.$setValidity(n,!1),r)},u[n]=o,i.$formatters.push(o),i.$parsers.push(o)}),n.uiValidateWatch&&r(e.$eval(n.uiValidateWatch)))}}}),angular.module("ui.utils",["ui.event","ui.format","ui.highlight","ui.include","ui.indeterminate","ui.inflector","ui.jq","ui.keypress","ui.mask","ui.reset","ui.route","ui.scrollfix","ui.scroll","ui.scroll.jqlite","ui.showhide","ui.unique","ui.validate"]);