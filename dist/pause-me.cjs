"use strict";
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
 */module.exports=function(n,u,t){void 0===t&&(t=!1);var r=null,o=null,e=0,l=null;if(n=n||function(){},"number"!=typeof u)throw new TypeError("duration must be a number");if(u<0)throw new Error("duration must be 0 or greater");e=u;var i=function(){l=setTimeout(n,e),r=Date.now()},f=function(){null!==l&&(clearTimeout(l),l=null)};if(t){var a=n;n=function(){a(),e=u,f(),i()}}return i(),{start:function(){null===l&&(e=u,i())},pause:function(){null!==l&&(o=Date.now(),f())},resume:function(){null===l&&null!==o&&null!==r&&(e-=o-r,o=null,e&&i())},restart:function(){f(),e=u,i()},stop:function(){e=u,o=null,f()},timer:function(){return l}}};
