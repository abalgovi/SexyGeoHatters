define(["../core","../var/document","../manipulation"],function(e,n){function t(n,t){var o=e(t.createElement(n)).appendTo(t.body),r=e.css(o[0],"display");return o.detach(),r}function o(o){var a=n,d=c[o];return d||(d=t(o,a),"none"!==d&&d||(r=(r||e("<iframe frameborder='0' width='0' height='0'/>")).appendTo(a.documentElement),a=r[0].contentDocument,a.write(),a.close(),d=t(o,a),r.detach()),c[o]=d),d}var r,c={HTML:"block",BODY:"block"};return o});