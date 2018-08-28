// JavaScripts modules, in the browser, without compiling! What a time to be alive!
// https://developers.google.com/web/fundamentals/primers/modules
import createMenuFromJson from './modules/createMenu.js';
import menuEvents from './modules/menuEvents.js';

function init(json) {
  var menu = createMenuFromJson(json);
  menu.addEventListener('click', menuEvents);
  document.querySelector('nav').appendChild(menu);
}

fetch('/api/nav.json')
  .then(function(response) {
    return response.json();
  })
  .then(init);
