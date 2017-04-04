angular.module("angularLazyImg",[]),angular.module("angularLazyImg").factory("LazyImgMagic",["$window","$rootScope","lazyImgConfig","lazyImgHelpers",function(n,e,t,o){"use strict";function i(){for(var n=h.length-1;n>=0;n--){var e=h[n];e&&o.isElementInView(e.$elem[0],y.offset,f)&&(u(e),h.splice(n,1))}0===h.length&&a()}function r(n){z.forEach(function(e){e[n]("scroll",p),e[n]("touchmove",p)}),m[n]("resize",p),m[n]("resize",I)}function s(){d=!0,setTimeout(function(){i(),r("on")},1)}function a(){d=!1,r("off")}function c(n){var e=h.indexOf(n);-1!==e&&h.splice(e,1)}function u(n){var t=new Image;t.onerror=function(){y.errorClass&&n.$elem.addClass(y.errorClass),e.$emit("lazyImg:error",n),y.onError(n)},t.onload=function(){l(n.$elem,n.src),y.successClass&&n.$elem.addClass(y.successClass),e.$emit("lazyImg:success",n),y.onSuccess(n)},t.src=n.src}function l(n,e){"img"===n[0].nodeName.toLowerCase()?n[0].src=e:n.css("background-image",'url("'+e+'")')}function g(n){this.$elem=n}var f,m,h,d,y,p,I,z;return h=[],d=!1,y=t.getOptions(),m=angular.element(n),f=o.getWinDimensions(),I=o.throttle(function(){f=o.getWinDimensions()},60),z=[y.container||m],p=o.throttle(i,30),g.prototype.setSource=function(n){this.src=n,h.unshift(this),d||s()},g.prototype.removeImage=function(){c(this),0===h.length&&a()},g.prototype.checkImages=function(){i()},g.addContainer=function(n){a(),z.push(n),s()},g.removeContainer=function(n){a(),z.splice(z.indexOf(n),1),s()},g}]),angular.module("angularLazyImg").provider("lazyImgConfig",function(){"use strict";this.options={offset:100,errorClass:null,successClass:null,onError:function(){},onSuccess:function(){}},this.$get=function(){var n=this.options;return{getOptions:function(){return n}}},this.setOptions=function(n){angular.extend(this.options,n)}}),angular.module("angularLazyImg").factory("lazyImgHelpers",["$window",function(n){"use strict";function e(){return{height:n.innerHeight,width:n.innerWidth}}function t(n,e,t){var o=n.getBoundingClientRect(),i=t.height+e;return o.left>=0&&o.right<=t.width+e&&(o.top>=0&&o.top<=i||o.bottom<=i&&o.bottom>=0-e)}function o(n,e,t){var o,i;return function(){var r=t||this,s=+new Date,a=arguments;o&&o+e>s?(clearTimeout(i),i=setTimeout(function(){o=s,n.apply(r,a)},e)):(o=s,n.apply(r,a))}}return{isElementInView:t,getWinDimensions:e,throttle:o}}]),angular.module("angularLazyImg").directive("lazyImg",["$rootScope","LazyImgMagic",function(n,e){"use strict";function t(t,o,i){var r=new e(o);i.$observe("lazyImg",function(n){n&&r.setSource(n)}),t.$on("$destroy",function(){r.removeImage()}),n.$on("lazyImg.runCheck",function(){r.checkImages()}),n.$on("lazyImg:refresh",function(){r.checkImages()})}return{link:t,restrict:"A"}}]).directive("lazyImgContainer",["LazyImgMagic",function(n){"use strict";function e(e,t){n.addContainer(t),e.$on("$destroy",function(){n.removeContainer(t)})}return{link:e,restrict:"A"}}]);