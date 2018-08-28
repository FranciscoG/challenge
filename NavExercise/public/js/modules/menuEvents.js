
export default function menuEvents(e){
  if (!e.target) { return; }
  
  if (e.target.classList.contains('nav__link') &&
      e.target.parentElement.classList.contains('nav__has-sub')) {
    let sub = e.target.parentElement.querySelector('.nav__sub-menu');
    sub.classList.toggle('nav__open');
  } 
}