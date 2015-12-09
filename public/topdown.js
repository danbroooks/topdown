!function t(n,e,r){function o(s,a){if(!e[s]){if(!n[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=e[s]={exports:{}};n[s][0].call(l.exports,function(t){var e=n[s][1][t];return o(e?e:t)},l,l.exports,t,n,e,r)}return e[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,n,e){var r=t("./src/client/Render.js"),o=t("./src/client/Controls.js"),i=t("./src/client/Network.js"),s=t("./src/client/Client.js"),a=s(r(document),o(window,document),i());a.connect(window.location.protocol+"//"+window.location.host)},{"./src/client/Client.js":28,"./src/client/Controls.js":29,"./src/client/Network.js":30,"./src/client/Render.js":31}],2:[function(t,n,e){function r(t,n){if("function"!=typeof t)throw new TypeError(o);return n=i(void 0===n?t.length-1:+n||0,0),function(){for(var e=arguments,r=-1,o=i(e.length-n,0),s=Array(o);++r<o;)s[r]=e[n+r];switch(n){case 0:return t.call(this,s);case 1:return t.call(this,e[0],s);case 2:return t.call(this,e[0],e[1],s)}var a=Array(n+1);for(r=-1;++r<n;)a[r]=e[r];return a[n]=s,t.apply(this,a)}}var o="Expected a function",i=Math.max;n.exports=r},{}],3:[function(t,n,e){function r(t,n,e){for(var r=-1,i=o(n),s=i.length;++r<s;){var a=i[r],c=t[a],u=e(c,n[a],a,t,n);(u===u?u===c:c!==c)&&(void 0!==c||a in t)||(t[a]=u)}return t}var o=t("../object/keys");n.exports=r},{"../object/keys":23}],4:[function(t,n,e){function r(t,n){return null==n?t:o(n,i(n),t)}var o=t("./baseCopy"),i=t("../object/keys");n.exports=r},{"../object/keys":23,"./baseCopy":5}],5:[function(t,n,e){function r(t,n,e){e||(e={});for(var r=-1,o=n.length;++r<o;){var i=n[r];e[i]=t[i]}return e}n.exports=r},{}],6:[function(t,n,e){function r(t){return function(n){return null==n?void 0:n[t]}}n.exports=r},{}],7:[function(t,n,e){function r(t,n,e){if("function"!=typeof t)return o;if(void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 3:return function(e,r,o){return t.call(n,e,r,o)};case 4:return function(e,r,o,i){return t.call(n,e,r,o,i)};case 5:return function(e,r,o,i,s){return t.call(n,e,r,o,i,s)}}return function(){return t.apply(n,arguments)}}var o=t("../utility/identity");n.exports=r},{"../utility/identity":25}],8:[function(t,n,e){function r(t){return s(function(n,e){var r=-1,s=null==n?0:e.length,a=s>2?e[s-2]:void 0,c=s>2?e[2]:void 0,u=s>1?e[s-1]:void 0;for("function"==typeof a?(a=o(a,u,5),s-=2):(a="function"==typeof u?u:void 0,s-=a?1:0),c&&i(e[0],e[1],c)&&(a=3>s?void 0:a,s=1);++r<s;){var l=e[r];l&&t(n,l,a)}return n})}var o=t("./bindCallback"),i=t("./isIterateeCall"),s=t("../function/restParam");n.exports=r},{"../function/restParam":2,"./bindCallback":7,"./isIterateeCall":13}],9:[function(t,n,e){var r=t("./baseProperty"),o=r("length");n.exports=o},{"./baseProperty":6}],10:[function(t,n,e){function r(t,n){var e=null==t?void 0:t[n];return o(e)?e:void 0}var o=t("../lang/isNative");n.exports=r},{"../lang/isNative":20}],11:[function(t,n,e){function r(t){return null!=t&&i(o(t))}var o=t("./getLength"),i=t("./isLength");n.exports=r},{"./getLength":9,"./isLength":14}],12:[function(t,n,e){function r(t,n){return t="number"==typeof t||o.test(t)?+t:-1,n=null==n?i:n,t>-1&&t%1==0&&n>t}var o=/^\d+$/,i=9007199254740991;n.exports=r},{}],13:[function(t,n,e){function r(t,n,e){if(!s(e))return!1;var r=typeof n;if("number"==r?o(e)&&i(n,e.length):"string"==r&&n in e){var a=e[n];return t===t?t===a:a!==a}return!1}var o=t("./isArrayLike"),i=t("./isIndex"),s=t("../lang/isObject");n.exports=r},{"../lang/isObject":21,"./isArrayLike":11,"./isIndex":12}],14:[function(t,n,e){function r(t){return"number"==typeof t&&t>-1&&t%1==0&&o>=t}var o=9007199254740991;n.exports=r},{}],15:[function(t,n,e){function r(t){return!!t&&"object"==typeof t}n.exports=r},{}],16:[function(t,n,e){function r(t){for(var n=c(t),e=n.length,r=e&&t.length,u=!!r&&a(r)&&(i(t)||o(t)),f=-1,p=[];++f<e;){var h=n[f];(u&&s(h,r)||l.call(t,h))&&p.push(h)}return p}var o=t("../lang/isArguments"),i=t("../lang/isArray"),s=t("./isIndex"),a=t("./isLength"),c=t("../object/keysIn"),u=Object.prototype,l=u.hasOwnProperty;n.exports=r},{"../lang/isArguments":17,"../lang/isArray":18,"../object/keysIn":24,"./isIndex":12,"./isLength":14}],17:[function(t,n,e){function r(t){return i(t)&&o(t)&&a.call(t,"callee")&&!c.call(t,"callee")}var o=t("../internal/isArrayLike"),i=t("../internal/isObjectLike"),s=Object.prototype,a=s.hasOwnProperty,c=s.propertyIsEnumerable;n.exports=r},{"../internal/isArrayLike":11,"../internal/isObjectLike":15}],18:[function(t,n,e){var r=t("../internal/getNative"),o=t("../internal/isLength"),i=t("../internal/isObjectLike"),s="[object Array]",a=Object.prototype,c=a.toString,u=r(Array,"isArray"),l=u||function(t){return i(t)&&o(t.length)&&c.call(t)==s};n.exports=l},{"../internal/getNative":10,"../internal/isLength":14,"../internal/isObjectLike":15}],19:[function(t,n,e){function r(t){return o(t)&&a.call(t)==i}var o=t("./isObject"),i="[object Function]",s=Object.prototype,a=s.toString;n.exports=r},{"./isObject":21}],20:[function(t,n,e){function r(t){return null==t?!1:o(t)?l.test(c.call(t)):i(t)&&s.test(t)}var o=t("./isFunction"),i=t("../internal/isObjectLike"),s=/^\[object .+?Constructor\]$/,a=Object.prototype,c=Function.prototype.toString,u=a.hasOwnProperty,l=RegExp("^"+c.call(u).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");n.exports=r},{"../internal/isObjectLike":15,"./isFunction":19}],21:[function(t,n,e){function r(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}n.exports=r},{}],22:[function(t,n,e){var r=t("../internal/assignWith"),o=t("../internal/baseAssign"),i=t("../internal/createAssigner"),s=i(function(t,n,e){return e?r(t,n,e):o(t,n)});n.exports=s},{"../internal/assignWith":3,"../internal/baseAssign":4,"../internal/createAssigner":8}],23:[function(t,n,e){var r=t("../internal/getNative"),o=t("../internal/isArrayLike"),i=t("../lang/isObject"),s=t("../internal/shimKeys"),a=r(Object,"keys"),c=a?function(t){var n=null==t?void 0:t.constructor;return"function"==typeof n&&n.prototype===t||"function"!=typeof t&&o(t)?s(t):i(t)?a(t):[]}:s;n.exports=c},{"../internal/getNative":10,"../internal/isArrayLike":11,"../internal/shimKeys":16,"../lang/isObject":21}],24:[function(t,n,e){function r(t){if(null==t)return[];c(t)||(t=Object(t));var n=t.length;n=n&&a(n)&&(i(t)||o(t))&&n||0;for(var e=t.constructor,r=-1,u="function"==typeof e&&e.prototype===t,f=Array(n),p=n>0;++r<n;)f[r]=r+"";for(var h in t)p&&s(h,n)||"constructor"==h&&(u||!l.call(t,h))||f.push(h);return f}var o=t("../lang/isArguments"),i=t("../lang/isArray"),s=t("../internal/isIndex"),a=t("../internal/isLength"),c=t("../lang/isObject"),u=Object.prototype,l=u.hasOwnProperty;n.exports=r},{"../internal/isIndex":12,"../internal/isLength":14,"../lang/isArguments":17,"../lang/isArray":18,"../lang/isObject":21}],25:[function(t,n,e){function r(t){return t}n.exports=r},{}],26:[function(t,n,e){n.exports={lshift:16,space:32,up:38,down:40,left:37,right:39,q:81,w:87,e:69,r:82,t:0,y:0,u:0,i:76,o:79,p:80,a:65,s:83,d:68,f:0,g:0,h:0,j:0,k:0,l:76,z:90,x:88,c:67,v:0,b:0,n:0,m:0,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57}},{}],27:[function(t,n,e){var r=t("../util/Factory").Build,o=function(){};o.DEFAULT_STROKE="#FFFFFF",o.DEFAULT_FILL="#FFFFFF",o.prototype.el=void 0,o.prototype.setWidth=function(t){this.el.width=t},o.prototype.setHeight=function(t){this.el.height=t},o.prototype.ctx=function(){return this.el.getContext("2d")},o.prototype.setStrokeStyle=function(t){this.ctx().strokeStyle=t},o.prototype.setFillStyle=function(t){this.ctx().fillStyle=t},o.prototype.draw=function(t){for(var n=0;n<t.length;n++){var e=t[n].points;this.renderShape(e,"#FFFFFF","#FFFFFF")}},o.prototype.renderShape=function(t,n,e){e||(e=o.DEFAULT_STROKE),n||(n=o.DEFAULT_FILL),this.setStrokeStyle(e),this.setFillStyle(n);var r=this.ctx();r.beginPath();for(var i=0;i<t.length;i++){var s=t[i],a=i?r.lineTo:r.moveTo;a.call(r,s[0],s[1])}r.closePath(),r.fill(),r.stroke()},o.prototype.clear=function(){this.ctx().clearRect(0,0,this.el.width,this.el.height)},n.exports=r(o,function(t){return{el:t}})},{"../util/Factory":33}],28:[function(t,n,e){var r=t("../util/Factory").Build,o=function(){};o.prototype.render=void 0,o.prototype.controls=void 0,o.prototype.network=void 0,o.prototype.connect=function(t){this.network.connect(t),this.setupRenderer(),this.setupControls()},o.prototype.setupControls=function(){var t=this.network,n=this.controls;t.on("setControls",function(t){n.configure(t)}),n.keystream.onValue(function(n){t.emit("keystream",n)})},o.prototype.setupRenderer=function(){var t=this.network,n=this.render;t.on("addCanvas",function(t){n.addLayer(t)}),t.on("render",function(t){var e=n.getLayer(t.canvas);n.refresh(),e.draw(t.data)})},n.exports=r(o,function(t,n,e){var r={render:t,controls:n,network:e};return r})},{"../util/Factory":33}],29:[function(t,n,e){var r=t("lodash"),o=t("kefir"),i=t("../graphics/Point"),s=function(t,n){var e=this,s={};t.onkeydown=function(t){var n=e.config;(!n||r.contains(r.values(n),t.which))&&(s[t.which]=!0)},t.onkeyup=function(t){delete s[t.which]};var a=o.fromPoll(30,function(){return r.keys(s).map(function(t){return parseInt(t,10)})});this.__defineGetter__("keystream",function(){return a.skipDuplicates(function(t,n){return 0==r.xor(t,n).length}).throttle(300)});var c=i(0,0);t.onmousemove=function(t){c=i(t.offsetX,t.offsetY)},this.__defineGetter__("mouse",function(){return c}),n.oncontextmenu=r.constant(!1)};s.prototype.config=void 0,s.prototype.configure=function(t){this.config=t};var a=function(t,n){return new s(t,n)};a.Constructor=s,a.Keymap=t("../Keymap"),n.exports=a},{"../Keymap":26,"../graphics/Point":32,kefir:"kefir",lodash:"lodash"}],30:[function(t,n,e){var r=t("lodash").bind,o=t("socket.io-client"),i=t("../util/Factory").Build,s=function(){};s.prototype.socket=void 0,s.prototype.config={transports:["websocket"],"force new connection":!0},s.prototype.connect=function(t){return this.socket=o.connect(t,this.config),this},s.prototype.on=function(t,n){return this.socket&&this.socket.on(t,r(n,this)),this},s.prototype.emit=function(t,n){this.socket&&this.socket.emit(t,n)};var a=i(s);n.exports=a},{"../util/Factory":33,lodash:"lodash","socket.io-client":"socket.io-client"}],31:[function(t,n,e){var r=t("lodash"),o=t("./Canvas"),i=function(t){this.document=t,this.layers={}};i.prototype.addLayer=function(t){var n=this.document.getElementsByTagName("body")[0],e=this.document.createElement("canvas");e.id=t,n.appendChild(e),this.layers[t]=o(e)},i.prototype.refresh=function(){var t=this.getViewport();r.each(this.layers,function(n){n.setWidth(t.width),n.setHeight(t.height),n.clear()})},i.prototype.getViewport=function(){var t=this.document.documentElement,n={};return n.width=t.clientWidth,n.height=t.clientHeight,n},i.prototype.getLayer=function(t){return this.layers[t]};var s=function(t){return new i(t)};s.Constructor=i,n.exports=s},{"./Canvas":27,lodash:"lodash"}],32:[function(t,n,e){function r(t){return 0==t&&1/t!==Number.POSITIVE_INFINITY}var o=t("lodash"),i=t("../util/Factory").Build,s=function(){};s.prototype.x=0,s.prototype.y=0,s.prototype.shift=function(t,n){if(o.isNumber(t)&&o.isNumber(n))this.x+=t,this.y+=n;else{if(!(t instanceof s&&o.isUndefined(n)))throw new Error("Invalid arguments passed to point.shift");this.x+=t.x,this.y+=t.y}return this},s.prototype.invert=function(){return 0!==this.x&&(this.x*=-1),0!==this.y&&(this.y*=-1),this},s.prototype.rotate=function(t,n){if(o.isUndefined(n)){if(!o.isNumber(t))throw new Error("Invalid arguments passed to point.rotate");n=t,t=a(0,0)}if(!o.isNumber(n))throw new Error("Invalid arguments passed to point.rotate");if(o.isArray(t)&&(t=a(t)),!1==t instanceof s)throw new Error("Invalid arguments passed to point.rotate");var e=n*(Math.PI/180),r=Math.cos(e),i=Math.sin(e),c={};c.x=this.x-t.x,c.y=this.y-t.y;var u={x:c.x*r-c.y*i,y:c.x*i+c.y*r};this.x=Number((u.x+t.x).toFixed(12)),this.y=Number((u.y+t.y).toFixed(12)),this.clean()},s.prototype.clean=function(){r(this.x)&&(this.x=0),r(this.y)&&(this.y=0)};var a=i(s,function(t,n){if(arguments.length>2)throw new Error("Point was passed invalid arguments");if(o.isNumber(t)&&o.isUndefined(n))throw new Error("Point was passed invalid arguments");var e={};if(!n&&o.isArray(t)){if(2!=t.length)throw new Error("Point was passed invalid arguments");e.x=t[0],e.y=t[1]}else o.isNumber(t)&&o.isNumber(n)&&(e.x=t,e.y=n);return e});a.Clone=function(t){if(t instanceof s)return a(t.x,t.y);throw new Error("Point.Clone must be passed an instance of Point")},a.Add=function(t,n){return a.Clone(t).shift(n)},a.Invert=function(t){return a.Clone(t).invert()},n.exports=a},{"../util/Factory":33,lodash:"lodash"}],33:[function(t,n,e){var r=t("lodash/object/assign"),o=function(t,n){function e(){}var o=Object.create(t.prototype);e.prototype=o;var i=function(){o=Object.create(e.prototype);var i;return i=n?n.apply(null,arguments):arguments[0],r(o,i||{}),t.apply(o),o};return i.Constructor=t,i.Created=function(t){return t instanceof i.Constructor},i};n.exports={Build:o}},{"lodash/object/assign":22}]},{},[1]);
//# sourceMappingURL=topdown.js.map