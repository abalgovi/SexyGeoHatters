define(["../var/support","../var/document"],function(e,t){return function(){var n;e.shrinkWrapBlocks=function(){if(null!=n)return n;n=!1;var e,i,o;return i=t.getElementsByTagName("body")[0],i&&i.style?(e=t.createElement("div"),o=t.createElement("div"),o.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",i.appendChild(o).appendChild(e),"undefined"!=typeof e.style.zoom&&(e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",e.appendChild(t.createElement("div")).style.width="5px",n=3!==e.offsetWidth),i.removeChild(o),n):void 0}}(),e});