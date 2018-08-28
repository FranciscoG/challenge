/**
 * Creates a single anchor DOM element
 *
 * @export
 * @param {string} label the text of the link
 * @param {string} url the href of the link
 * @returns <a> DOM element
 */
export function createAnchor(label, url) {
  let a = document.createElement('a');
  a.href = url;
  a.textContent = label;
  a.classList.add("nav__link");
  return a;
}

/**
 * Creates a single list-item DOM element
 *
 * @export
 * @returns <li> DOM Element
 */
export function createLi(){
  let li = document.createElement('li');
  li.classList.add('nav__item');
  return li;
}

/**
 * Goes through of an array of menu items and generates the DOM for a menu
 * If a menu item has sub-menu items, it will build recursively.  
 *
 * @export
 * @param {*} menuClass the css class of the UL
 * @param {*} items array of objects with menu data
 * @param {boolean} [isTop=false] whether this ul is top level or now
 * @returns <ul> DOM element with children
 */
export function createUL(menuClass, items, isTop=false){
  // start with top level memu
  let ul = document.createElement('ul');
  ul.className = menuClass;

  items.forEach(el => {
    let li = createLi();
    if (isTop) {
      li.setAttribute('aria-expanded', 'false');
      li.classList.add('nav__top-level');
    }

    let link = createAnchor(el.label, el.url);
    li.appendChild(link);

    if (el.items && el.items.length > 0) {
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