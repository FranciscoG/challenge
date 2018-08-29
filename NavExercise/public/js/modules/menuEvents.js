
const overlay = document.querySelector('.overlay');

function clearActive(current){
  let active = document.querySelector('.nav__has-sub.active');
  if (active && current !== active) {
    active.classList.remove('active');
  }
}

function onClick(e) {
  if (!e.target && !e.target.classList.contains('nav__link')) { return; }
  let li = e.target.parentElement;
  let hasSub = li.classList.contains('nav__has-sub');

  if (!hasSub) { return; }

  // remove any currently open sub navs
  clearActive(li);
  
  // toggle active class on the parent
  li.classList.toggle('active');

  if (li.classList.contains('active')) {
    overlay.classList.add('overlay__visible');
  } else {
    overlay.classList.remove('overlay__visible');
  }
}

function onKeyUp(e){
  // ESC key
  if (e.keyCode === 27) {
    clearActive();
    overlay.classList.remove('overlay__visible');
  }
}

/**
 * Bind and begin menu events
 * 
 * @param {HTMLUListElement} menu the menu to manage
 */
export default function menuEvents(menu){
  menu.addEventListener('click', onClick);
  document.addEventListener('keyup', onKeyUp);
}