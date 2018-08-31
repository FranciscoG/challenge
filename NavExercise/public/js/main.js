// JavaScripts modules, in the browser, without bundling or transpiling! 
// What a time to be alive!
// https://developers.google.com/web/fundamentals/primers/modules

import HugeNav from './modules/HugeNav.js';
import bindEvents from './modules/events.js';

function init(json) {
  var nav = new HugeNav(json.items);
  document.querySelector('nav').appendChild(nav.menu);
  bindEvents();
}

fetch('/api/nav.json')
  .then(function(response) {
    return response.json();
  })
  .then(init);
