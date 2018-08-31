// JavaScripts modules, in the browser, without bundling or transpiling! 
// What a time to be alive!
// https://developers.google.com/web/fundamentals/primers/modules

import HugeNav from './modules/HugeNav.js';
import menuEvents from './modules/menuEvents.js';

function init(json) {
  var nav = new HugeNav(json.items);
  document.querySelector('nav').appendChild(nav.menu);
  menuEvents();
}

fetch('/api/nav.json')
  .then(function(response) {
    return response.json();
  })
  .then(init);
