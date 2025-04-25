!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(n="undefined"!=typeof globalThis?globalThis:n||self).pauseMe=e()}(this,(function(){"use strict";
/*
     *@summary JavaScript setTimeout and setInterval utility that allows pausing, resuming, stopping, and starting a setTimeout
     *@license {@link https://github.com/jpehman/pause-mejs/blob/master/LICENSE}
     *@author Jonathan Ehman
     *@typedef object
     *@example
     * const pauseMe = require("pause-me");
     *
     * const myTimeout = pauseMe(() => {
     *  console.log("timed out!");
     * }, 5000);
     * @param {function} callback - optional - function or lambda that you want executed after duration. If you do not include a callback, what's the point?
     * @param {number} duration - required - Milliseconds to set the timeout to. Throws an error if not a number or not included
     * @param {bool} repeating - optional - When true the timeout is treated as an interval
     */return function(n,e,t){void 0===t&&(t=!1);var u=null,o=null,r=0,i=null;if(n=n||function(){},"number"!=typeof e)throw new TypeError("duration must be a number");if(e<0)throw new Error("duration must be 0 or greater");r=e;var l=function(){i=setTimeout(n,r),u=Date.now()},f=function(){null!==i&&(clearTimeout(i),i=null)};if(t){var a=n;n=function(){a(),r=e,f(),l()}}return l(),{start:function(){null===i&&(r=e,l())},pause:function(){null!==i&&(o=Date.now(),f())},resume:function(){null===i&&null!==o&&null!==u&&(r-=o-u,o=null,r&&l())},restart:function(){f(),r=e,l()},stop:function(){r=e,o=null,f()},timer:function(){return i}}}}));
