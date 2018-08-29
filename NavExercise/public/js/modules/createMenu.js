/**
 * Creates a single anchor DOM element
 *
 * @export
 * @param {string} label the text of the link
 * @param {string} url the href of the link
 * @returns HTMLAnchorElement
 */
export function createAnchor(label, url, hasSub=false) {
  let a = document.createElement('a');
  a.href = url;
  a.textContent = label;
  a.classList.add("nav__link");
  if (hasSub) {
    a.setAttribute('aria-haspopup','true');
  }
  return a;
}

/**
 * Creates a single list-item DOM element
 *
 * @export
 * @returns HTMLLIElement
 */
export function createLi(){
  let li = document.createElement('li');
  li.classList.add('nav__item');
  return li;
}

/**
 * Goes through an array of menu items and generates the DOM Tree for a menu
 * If it has sub-menu items, it will build recursively.
 *
 * @export
 * @param {*} menuClass the css class of the UL
 * @param {*} items array of objects with menu data
 * @param {boolean} [isTop=false] whether this <ul> is top level or now
 * @returns HTMLUListElement with children
 */
export function createUL(menuClass, items, isTop=false){
  // start with top level memu
  let ul = document.createElement('ul');
  ul.className = menuClass;

  if (!isTop) {
    ul.setAttribute('aria-label','submenu');
    ul.setAttribute('aria-hidden','true');
  }

  items.forEach(el => {
    let li = createLi();
    let hasItems = el.items && el.items.length > 0;

    if (isTop) {
      li.classList.add('nav__top-level');
    }

    let link = createAnchor(el.label, el.url, hasItems);
    li.appendChild(link);
    
    if (hasItems) {
      li.classList.add('nav__has-sub');
      var submenu = createUL("nav__sub-menu", el.items, false);
      li.appendChild(submenu);
    }

    ul.appendChild(li);
  });

  return ul;
}

export default function createMenu(menuData) {
  let navMenu = createUL("nav__menu", menuData.items, true);
  return navMenu;
}