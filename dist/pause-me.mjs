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
 */
function n(n,u,t){void 0===t&&(t=!1);var r=null,l=null,o=0,e=null;if(n=n||function(){},"number"!=typeof u)throw new TypeError("duration must be a number");if(u<0)throw new Error("duration must be 0 or greater");o=u;var i=function(){e=setTimeout(n,o),r=Date.now()},f=function(){null!==e&&(clearTimeout(e),e=null)};if(t){var a=n;n=function(){a(),o=u,f(),i()}}return i(),{start:function(){null===e&&(o=u,i())},pause:function(){null!==e&&(l=Date.now(),f())},resume:function(){null===e&&null!==l&&null!==r&&(o-=l-r,l=null,o&&i())},restart:function(){f(),o=u,i()},stop:function(){o=u,l=null,f()},timer:function(){return e}}}export{n as default};
