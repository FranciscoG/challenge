// JavaScripts modules, in the browser, without compiling! What a time to be alive!
// https://developers.google.com/web/fundamentals/primers/modules
import createMenuFromJson from './modules/createMenu.js';

fetch('/api/nav.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var menu = createMenuFromJson(json);
    document.querySelector('nav').appendChild(menu);
  });

  // load json
  // create html from json
  // attach events
  // - event: click on top level shows submenu, overlay over content, handle aria 
  // - mobile events:
  // - - hamburger turns into X, handle aria, 
  // 

  // the rest is CSS
