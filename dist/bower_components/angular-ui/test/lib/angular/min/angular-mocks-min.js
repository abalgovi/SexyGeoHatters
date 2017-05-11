/**
 * @license AngularJS v1.0.0rc4
 * (c) 2010-2011 AngularJS http://angularjs.org
 * License: MIT
 *
 * TODO(vojta): wrap whole file into closure during build
 */
function createHttpBackendMock(e,t){function n(e,t,n){return angular.isFunction(e)?e:function(){return angular.isNumber(e)?[e,t,n]:[200,e,t]}}function r(n,r,o,c,l){function g(e){return angular.isString(e)||angular.isFunction(e)||e instanceof RegExp?e:angular.toJson(e)}var f=new MockXhr,d=i[0],h=!1;if(d&&d.match(n,r)){if(!d.matchData(o))throw Error("Expected "+d+" with different data\nEXPECTED: "+g(d.data)+"\nGOT:      "+o);if(!d.matchHeaders(l))throw Error("Expected "+d+" with different headers\nEXPECTED: "+g(d.headers)+"\nGOT:      "+g(l));if(i.shift(),d.response)return void s.push(function(){var e=d.response(n,r,o,l);f.$$respHeaders=e[2],c(e[0],e[1],f.getAllResponseHeaders())});h=!0}for(var p=-1,m;m=a[++p];)if(m.match(n,r,o,l||{})){if(m.response)(t?t.defer:u)(function(){var e=m.response(n,r,o,l);f.$$respHeaders=e[2],c(e[0],e[1],f.getAllResponseHeaders())});else{if(!m.passThrough)throw Error("No response defined !");e(n,r,o,c,l)}return}throw h?Error("No response defined !"):Error("Unexpected request: "+n+" "+r+"\n"+(d?"Expected "+d:"No more request expected"))}function o(e){angular.forEach(["GET","DELETE","JSONP"],function(t){r[e+t]=function(n,o){return r[e](t,n,void 0,o)}}),angular.forEach(["PUT","POST"],function(t){r[e+t]=function(n,o,a){return r[e](t,n,o,a)}})}var a=[],i=[],s=[],u=angular.bind(s,s.push);return r.when=function(e,r,o,i){var s=new MockHttpExpectation(e,r,o,i),u={respond:function(e,t,r){s.response=n(e,t,r)}};return t&&(u.passThrough=function(){s.passThrough=!0}),a.push(s),u},o("when"),r.expect=function(e,t,r,o){var a=new MockHttpExpectation(e,t,r,o);return i.push(a),{respond:function(e,t,r){a.response=n(e,t,r)}}},o("expect"),r.flush=function(e){if(!s.length)throw Error("No pending request to flush !");if(angular.isDefined(e))for(;e--;){if(!s.length)throw Error("No more pending request to flush !");s.shift()()}else for(;s.length;)s.shift()();r.verifyNoOutstandingExpectation()},r.verifyNoOutstandingExpectation=function(){if(i.length)throw Error("Unsatisfied requests: "+i.join(", "))},r.verifyNoOutstandingRequest=function(){if(s.length)throw Error("Unflushed requests: "+s.length)},r.resetExpectations=function(){i.length=0,s.length=0},r}function MockHttpExpectation(e,t,n,r){this.data=n,this.headers=r,this.match=function(t,n,r,o){return e!=t?!1:this.matchUrl(n)?angular.isDefined(r)&&!this.matchData(r)?!1:angular.isDefined(o)&&!this.matchHeaders(o)?!1:!0:!1},this.matchUrl=function(e){return t?angular.isFunction(t.test)?t.test(e):t==e:!0},this.matchHeaders=function(e){return angular.isUndefined(r)?!0:angular.isFunction(r)?r(e):angular.equals(r,e)},this.matchData=function(e){return angular.isUndefined(n)?!0:n&&angular.isFunction(n.test)?n.test(e):n&&!angular.isString(n)?angular.toJson(n)==e:n==e},this.toString=function(){return e+" "+t}}function MockXhr(){MockXhr.$$lastInstance=this,this.open=function(e,t,n){this.$$method=e,this.$$url=t,this.$$async=n,this.$$reqHeaders={},this.$$respHeaders={}},this.send=function(e){this.$$data=e},this.setRequestHeader=function(e,t){this.$$reqHeaders[e]=t},this.getResponseHeader=function(e){var t=this.$$respHeaders[e];return t?t:(e=angular.lowercase(e),(t=this.$$respHeaders[e])?t:(t=void 0,angular.forEach(this.$$respHeaders,function(n,r){t||angular.lowercase(r)!=e||(t=n)}),t))},this.getAllResponseHeaders=function(){var e=[];return angular.forEach(this.$$respHeaders,function(t,n){e.push(n+": "+t)}),e.join("\n")},this.abort=angular.noop}angular.mock={},angular.mock.$BrowserProvider=function(){this.$get=function(){return new angular.mock.$Browser}},angular.mock.$Browser=function(){var e=this;this.isMock=!0,e.$$url="http://server",e.$$lastUrl=e.$$url,e.pollFns=[],e.$$completeOutstandingRequest=angular.noop,e.$$incOutstandingRequestCount=angular.noop,e.onUrlChange=function(t){return e.pollFns.push(function(){e.$$lastUrl!=e.$$url&&(e.$$lastUrl=e.$$url,t(e.$$url))}),t},e.cookieHash={},e.lastCookieHash={},e.deferredFns=[],e.deferredNextId=0,e.defer=function(t,n){return n=n||0,e.deferredFns.push({time:e.defer.now+n,fn:t,id:e.deferredNextId}),e.deferredFns.sort(function(e,t){return e.time-t.time}),e.deferredNextId++},e.defer.now=0,e.defer.cancel=function(t){var n;return angular.forEach(e.deferredFns,function(e,r){e.id===t&&(n=r)}),void 0!==n?(e.deferredFns.splice(n,1),!0):!1},e.defer.flush=function(t){if(angular.isDefined(t))e.defer.now+=t;else{if(!e.deferredFns.length)throw Error("No deferred tasks to be flushed");e.defer.now=e.deferredFns[e.deferredFns.length-1].time}for(;e.deferredFns.length&&e.deferredFns[0].time<=e.defer.now;)e.deferredFns.shift().fn()},e.$$baseHref="",e.baseHref=function(){return this.$$baseHref},e.$$scripts=[],e.addJs=function(t,n){var r={url:t,done:n};return e.$$scripts.push(r),r}},angular.mock.$Browser.prototype={poll:function e(){angular.forEach(this.pollFns,function(e){e()})},addPollFn:function(e){return this.pollFns.push(e),e},url:function(e,t){return e?(this.$$url=e,this):this.$$url},cookies:function(e,t){return e?void(void 0==t?delete this.cookieHash[e]:angular.isString(t)&&t.length<=4096&&(this.cookieHash[e]=t)):(angular.equals(this.cookieHash,this.lastCookieHash)||(this.lastCookieHash=angular.copy(this.cookieHash),this.cookieHash=angular.copy(this.cookieHash)),this.cookieHash)},notifyWhenNoOutstandingRequests:function(e){e()}},angular.mock.$ExceptionHandlerProvider=function(){var e;this.mode=function(t){switch(t){case"rethrow":e=function(e){throw e};break;case"log":var n=[];e=function(e){1==arguments.length?n.push(e):n.push([].slice.call(arguments,0))},e.errors=n;break;default:throw Error("Unknown mode '"+t+"', only 'log'/'rethrow' modes are allowed!")}},this.$get=function(){return e},this.mode("rethrow")},angular.mock.$LogProvider=function(){function e(e,t,n){return e.concat(Array.prototype.slice.call(t,n))}this.$get=function(){var t={log:function(){t.log.logs.push(e([],arguments,0))},warn:function(){t.warn.logs.push(e([],arguments,0))},info:function(){t.info.logs.push(e([],arguments,0))},error:function(){t.error.logs.push(e([],arguments,0))}};return t.reset=function(){t.log.logs=[],t.warn.logs=[],t.info.logs=[],t.error.logs=[]},t.assertEmpty=function(){var e=[];if(angular.forEach(["error","warn","info","log"],function(n){angular.forEach(t[n].logs,function(t){angular.forEach(t,function(t){e.push("MOCK $log ("+n+"): "+String(t)+"\n"+(t.stack||""))})})}),e.length)throw e.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"),e.push(""),new Error(e.join("\n---------\n"))},t.reset(),t}},function(){function e(e){var n;if(n=e.match(r)){var o=new Date(0),a=0,i=0;return n[9]&&(a=t(n[9]+n[10]),i=t(n[9]+n[11])),o.setUTCFullYear(t(n[1]),t(n[2])-1,t(n[3])),o.setUTCHours(t(n[4]||0)-a,t(n[5]||0)-i,t(n[6]||0),t(n[7]||0)),o}return e}function t(e){return parseInt(e,10)}function n(e,t,n){var r="";for(0>e&&(r="-",e=-e),e=""+e;e.length<t;)e="0"+e;return n&&(e=e.substr(e.length-t)),r+e}var r=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;angular.mock.TzDate=function(t,r){var o=new Date(0);if(angular.isString(r)){var a=r;if(o.origDate=e(r),r=o.origDate.getTime(),isNaN(r))throw{name:"Illegal Argument",message:"Arg '"+a+"' passed into TzDate constructor is not a valid date string"}}else o.origDate=new Date(r);var i=new Date(r).getTimezoneOffset();o.offsetDiff=60*i*1e3-1e3*t*60*60,o.date=new Date(r+o.offsetDiff),o.getTime=function(){return o.date.getTime()-o.offsetDiff},o.toLocaleDateString=function(){return o.date.toLocaleDateString()},o.getFullYear=function(){return o.date.getFullYear()},o.getMonth=function(){return o.date.getMonth()},o.getDate=function(){return o.date.getDate()},o.getHours=function(){return o.date.getHours()},o.getMinutes=function(){return o.date.getMinutes()},o.getSeconds=function(){return o.date.getSeconds()},o.getTimezoneOffset=function(){return 60*t},o.getUTCFullYear=function(){return o.origDate.getUTCFullYear()},o.getUTCMonth=function(){return o.origDate.getUTCMonth()},o.getUTCDate=function(){return o.origDate.getUTCDate()},o.getUTCHours=function(){return o.origDate.getUTCHours()},o.getUTCMinutes=function(){return o.origDate.getUTCMinutes()},o.getUTCSeconds=function(){return o.origDate.getUTCSeconds()},o.getUTCMilliseconds=function(){return o.origDate.getUTCMilliseconds()},o.getDay=function(){return o.date.getDay()},o.toISOString&&(o.toISOString=function(){return n(o.origDate.getUTCFullYear(),4)+"-"+n(o.origDate.getUTCMonth()+1,2)+"-"+n(o.origDate.getUTCDate(),2)+"T"+n(o.origDate.getUTCHours(),2)+":"+n(o.origDate.getUTCMinutes(),2)+":"+n(o.origDate.getUTCSeconds(),2)+"."+n(o.origDate.getUTCMilliseconds(),3)+"Z"});var s=["getMilliseconds","getUTCDay","getYear","setDate","setFullYear","setHours","setMilliseconds","setMinutes","setMonth","setSeconds","setTime","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setYear","toDateString","toGMTString","toJSON","toLocaleFormat","toLocaleString","toLocaleTimeString","toSource","toString","toTimeString","toUTCString","valueOf"];return angular.forEach(s,function(e){o[e]=function(){throw Error("Method '"+e+"' is not implemented in the TzDate mock")}}),o},angular.mock.TzDate.prototype=Date.prototype}(),angular.mock.dump=function(e){function t(e){var r;return angular.isElement(e)?(e=angular.element(e),r=angular.element("<div></div>"),angular.forEach(e,function(e){r.append(angular.element(e).clone())}),r=r.html()):angular.isArray(e)?(r=[],angular.forEach(e,function(e){r.push(t(e))}),r="[ "+r.join(", ")+" ]"):r=angular.isObject(e)?angular.isFunction(e.$eval)&&angular.isFunction(e.$apply)?n(e):e instanceof Error?e.stack||""+e.name+": "+e.message:angular.toJson(e,!0):String(e),r}function n(e,t){t=t||"  ";var r=[t+"Scope("+e.$id+"): {"];for(var o in e)e.hasOwnProperty(o)&&!o.match(/^(\$|this)/)&&r.push("  "+o+": "+angular.toJson(e[o]));for(var a=e.$$childHead;a;)r.push(n(a,t+"  ")),a=a.$$nextSibling;return r.push("}"),r.join("\n"+t)}return t(e)},angular.mock.$HttpBackendProvider=function(){this.$get=[createHttpBackendMock]},angular.module("ngMock",["ng"]).provider({$browser:angular.mock.$BrowserProvider,$exceptionHandler:angular.mock.$ExceptionHandlerProvider,$log:angular.mock.$LogProvider,$httpBackend:angular.mock.$HttpBackendProvider}),angular.module("ngMockE2E",["ng"]).config(function(e){e.decorator("$httpBackend",angular.mock.e2e.$httpBackendDecorator)}),angular.mock.e2e={},angular.mock.e2e.$httpBackendDecorator=["$delegate","$browser",createHttpBackendMock],window.jstestdriver&&function(e){e.dump=function(){var t=[];angular.forEach(arguments,function(e){t.push(angular.mock.dump(e))}),jstestdriver.console.log.apply(jstestdriver.console,t),e.console&&e.console.log.apply(e.console,t)}}(window),window.jasmine&&function(e){function t(){return jasmine.getEnv().currentSpec}function n(){var e=t();return e&&e.queue.running}e.module=angular.mock.module=function(){function e(){var e=t();if(e.$injector)throw Error("Injector already created, can not register a module!");var n=e.$modules||(e.$modules=[]);angular.forEach(r,function(e){n.push(e)})}var r=Array.prototype.slice.call(arguments,0),o=new Error("Module Declaration Location:").stack;return n()?e():e},e.inject=angular.mock.inject=function(){function e(){var e=t(),n=e.$modules||[];n.unshift("ngMock"),n.unshift("ng");var a=e.$injector;a||(a=e.$injector=angular.injector(n));for(var i=0,s=r.length;s>i;i++)try{a.invoke(r[i]||angular.noop,this)}catch(u){throw u.stack&&(u.stack+="\n"+o),u}}var r=Array.prototype.slice.call(arguments,0),o=new Error("Declaration Location").stack;return n()?e():e}}(window);