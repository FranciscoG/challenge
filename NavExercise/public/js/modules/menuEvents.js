
const overlay = document.querySelector('.overlay');

/**
 * clears any open submenus when clicking on a new top level
 * item that has submenus of its own.  
 * 
 * @param {DOMElement} current currently clicked on item
 */
function clearActive(current){
  let active = document.querySelector('.nav__has-sub.active');
  if (active && current !== active) {
    active.classList.remove('active');
  }
}

function handleNavLink(target){
  const li = target.parentElement;
  const hasSub = li.classList.contains('nav__has-sub');

  if (!hasSub) { return; }

  const currentSub = li.querySelector('.nav__sub-menu');

  // remove any currently open sub navs
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
    clearActive();
    overlay.classList.remove('overlay__visible');
  }
  
  // Spacebar (should work like enter)
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
  clearActive();
  overlay.classList.remove('overlay__visible');
}
/**
 * Bind and begin menu events
 */
export default function menuEvents(){
  document.addEventListener('keydown', keyEvents);
  document.body.addEventListener('click', clickDelegator);
}