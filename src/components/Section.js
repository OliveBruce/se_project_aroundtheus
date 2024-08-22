export default class Section {
  constructor({ renderer }, classSelector) {
    this._items = [];
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems(items) {
    this._items = items;
    this._items.reverse().forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
