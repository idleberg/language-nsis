"use strict";var e=function(e){var r=e.ignoreProcessEnv?{}:process.env,a=function(n){return(n.match(/(.?\${?(?:[a-zA-Z0-9_]+)?}?)/g)||[]).reduce((function(n,s){var t,c,p=/(.?)\${?([a-zA-Z0-9_]+)?}?/g.exec(s),i=p[1];if("\\"===i)t=(c=p[0]).replace("\\$","$");else{var o=p[2];c=p[0].substring(i.length),t=r.hasOwnProperty(o)?r[o]:e.parsed[o]||"",t=a(t)}return n.replace(c,t)}),n)};for(var n in e.parsed){var s=r.hasOwnProperty(n)?r[n]:e.parsed[n];e.parsed[n]=a(s)}for(var t in e.parsed)r[t]=e.parsed[t];return e},r=Object.freeze(Object.assign(Object.create(null),e,{default:e}));exports.main=r;
//# sourceMappingURL=main-297ff40a.js.map