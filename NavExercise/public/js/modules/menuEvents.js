
const overlay = document.querySelector('.overlay');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function(e){
  document.body.classList.toggle('nav-open');
})
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
 * @param {HTMLElement} target the .nav__link element currently targeted
 */
function handleNavLink(target){
  const li = target.parentElement;

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

// key event delegation
function keyEvents(e){
  // ESC key
  if (e.keyCode === 27) {
    reset();
  }
  
  // Spacebar (should work like Enter)
  if (e.keyCode === 32 && document.activeElement.classList.contains('nav__link')) {
    e.preventDefault();
    handleNavLink(document.activeElement);
  }
}

// click delegation
function clickDelegator(e){
  if (e.target.classList.contains('nav__link')){
    handleNavLink(e.target);
    return;
  }

  // if clicking on anything else, close the menu
  // and remove the overlay
  reset();
}


/**
 * Bind and begin menu events
 */
export default function menuEvents(){
  document.addEventListener('keydown', keyEvents);
  document.body.addEventListener('click', clickDelegator);
}