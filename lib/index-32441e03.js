"use strict";var n,r,t,e,i,o=require("./main-ecdd8fe7.js"),u=require("fs");i="win32"===process.platform||o.commonjsGlobal.TESTING_WINDOWS?function(){if(r)return n;r=1,n=i,i.sync=function(n,r){return e(t.statSync(n),n,r)};var t=u;function e(n,r,t){return!(!n.isSymbolicLink()&&!n.isFile())&&function(n,r){var t=void 0!==r.pathExt?r.pathExt:process.env.PATHEXT;if(!t)return!0;if(-1!==(t=t.split(";")).indexOf(""))return!0;for(var e=0;e<t.length;e++){var i=t[e].toLowerCase();if(i&&n.substr(-i.length).toLowerCase()===i)return!0}return!1}(r,t)}function i(n,r,i){t.stat(n,(function(t,o){i(t,!t&&e(o,n,r))}))}return n}():function(){if(e)return t;e=1,t=r,r.sync=function(r,t){return i(n.statSync(r),t)};var n=u;function r(r,t,e){n.stat(r,(function(n,r){e(n,!n&&i(r,t))}))}function i(n,r){return n.isFile()&&function(n,r){var t=n.mode,e=n.uid,i=n.gid,o=void 0!==r.uid?r.uid:process.getuid&&process.getuid(),u=void 0!==r.gid?r.gid:process.getgid&&process.getgid(),s=parseInt("100",8),c=parseInt("010",8);return t&parseInt("001",8)||t&c&&i===u||t&s&&e===o||t&(s|c)&&0===o}(n,r)}return t}();var s=c;function c(n,r,t){if("function"==typeof r&&(t=r,r={}),!t){if("function"!=typeof Promise)throw new TypeError("callback not provided");return new Promise((function(t,e){c(n,r||{},(function(n,r){n?e(n):t(r)}))}))}i(n,r||{},(function(n,e){n&&("EACCES"===n.code||r&&r.ignoreErrors)&&(n=null,e=!1),t(n,e)}))}c.sync=function(n,r){try{return i.sync(n,r||{})}catch(n){if(r&&r.ignoreErrors||"EACCES"===n.code)return!1;throw n}},exports.isexe_1=s;