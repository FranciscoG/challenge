const overlay = document.querySelector('.overlay');

/**
 * clears any open submenus when clicking on a new top level
 * item that has submenus of its own.  
 * 
 * @param {HTMLElement} current currently clicked on item
 */
function clearActive(current){
  let active = document.querySelector('.nav__has-sub.active');
  if (active && current !== active) {
    active.classList.remove('active');
  }
}

/**
 * simple function to reset nav and overlay so I can keep things DRY
 */
function reset() {
  clearActive();
  overlay.classList.remove('overlay__visible');;
}

/**
 * 
 * @param {HTMLElement} target the .nav__item element currently targeted
 */
function handleNavLink(li){
  if (!li.classList.contains('nav__has-sub')) { 
    return reset();
  }

  const currentSub = li.querySelector('.nav__sub-menu');

  // remove any currently open sub navs except itself
  clearActive(li);
  
  // toggle active class on the parent
  li.classList.toggle('active');

  if (li.classList.contains('active')) {
    overlay.classList.add('overlay__visible');
    currentSub.setAttribute('aria-hidden', 'false');
  } else {
    overlay.classList.remove('overlay__visible');
    currentSub.setAttribute('aria-hidden', 'true');
  }
}

/***************************************************
 *
 */
function keyEvents({keyCode,preventDefault}){
  /*
    remove "mouse-focus" from <html> for any keypress
    This will allow the outline to show on tab-focusable elements which is
    important for accessibility
  */
  document.querySelector('html').classList.remove("mouse-focus");

  // ESC key
  if (keyCode === 27) {
    reset();
  }
  
  // Spacebar (should work like Enter)
  if (keyCode === 32 && document.activeElement.classList.contains('nav__link')) {
    preventDefault();
    handleNavLink(document.activeElement);
  }
}

function onMouseMove(e){
  /*
    on mouse move, put mouse-focus back in <html>
    this will remove the outlines when a user can use a mouse
   */
  document.querySelector('html').classList.add("mouse-focus");
}

/***************************************************
 * Handle all click related event callbacks here
 */
function clickDelegator({target}){
  
  if (target.classList.contains('nav__link')){
    handleNavLink(target.parentElement);
    return;
  }

  if (target.classList.contains('nav__top-level')){
    handleNavLink(target);
    return;
  }

  // cheeseburger cheeseburger
  if (target.classList.contains('hamburger')) {
    document.body.classList.toggle('nav-open');
    return;
  }

  // if clicking on anything else, close the menu
  // and remove the overlay
  reset();
}

/************************************************************
 * to prevent any glitchyness during window resize 
 * due to css animations
 */
function onResize() {
  var timeout;
  clearTimeout(timeout);
  document.body.classList.add('transitions-off');
  timeout = setTimeout(function(){
    document.body.classList.remove('transitions-off');
  }, 100);
}

/************************************************************
 * Bind and begin menu events
 */
export default function bindEvents(){
  document.addEventListener('keydown', keyEvents);
  document.addEventListener('mousemove', onMouseMove);
  document.body.addEventListener('click', clickDelegator);
  window.addEventListener('resize', onResize);
}