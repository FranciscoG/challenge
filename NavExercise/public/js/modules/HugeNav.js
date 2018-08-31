
/**
 * @class
 */
export default class HugeNav {

  /**
   * 
   * @param {array} menuItems the top level items array from the menu json
   */
  constructor(menuItems) {
    this.menu = this.createUL("nav__menu", menuItems, true);
  }

  /**
   * Creates a single anchor DOM element for the menu
   *
   * @param {string} label the text of the link
   * @param {string} url the href of the link
   * @returns HTMLAnchorElement
   */
  createAnchor(label, url, hasSub = false) {
    let a = document.createElement("a");
    a.href = url;
    a.textContent = label;
    a.classList.add("nav__link");
    if (hasSub) {
      a.setAttribute("aria-haspopup", "true");
    }
    return a;
  }

  /**
   * Creates a single list-item DOM element for the menu
   *
   * @returns HTMLLIElement
   */
  createLi() {
    let li = document.createElement("li");
    li.classList.add("nav__item");
    return li;
  }

  /**
   * Process a single object of menu data from the items array
   * 
   * @param {object} el a single item from the items array 
   */
  handleItem(el) {
    let li = this.createLi();
    let hasItems = el.items && el.items.length > 0;

    let link = this.createAnchor(el.label, el.url, hasItems);
    li.appendChild(link);

    // if this item obj has its own items array
    // we run createUL again (let's get recursive!)
    // this will handle many nested items
    if (hasItems) {
      li.classList.add("nav__has-sub");
      var submenu = this.createUL("nav__sub-menu", el.items);
      li.appendChild(submenu);
    }

    return li;
  }

  /**
   * 
   * @param {string} menuClass the css class for this unordered list
   * @param {array} items array of menu item data from the json
   * @param {boolean} isTop whether this UL is the top level or a submenu UL
   * @returns HTMLUListElement
   */
  createUL(menuClass, items, isTop = false) {
    let ul = document.createElement("ul");
    ul.classList.add(menuClass);

    // isTop will only exist in the very first call to createUL
    if (!isTop) {
      ul.setAttribute("aria-label", "submenu");
      ul.setAttribute("aria-hidden", "true");
    }

    let nodes = items.map(this.handleItem.bind(this));

    nodes.forEach(li => {
      if (isTop) {
        li.classList.add("nav__top-level");
      }
      ul.appendChild(li);
    });
    

    return ul;
  }
}
