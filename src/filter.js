import Component from './component.js';

class Filter extends Component { // = (caption, amount = 0, isChecked = false) => {
  constructor(data) {
    super();
    this._amount = data.amount;
    this._caption = data.caption;
    this._onFilter = null;

    this.state = {
      isChecked: false,
    };
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <div class= "">
		  <input
            type="radio"
            id="filter__${this._caption.toLowerCase()}"
            class="filter__input visually-hidden"
            name='filter'
            ${this.state.isChecked ? ` checked` : ``}
          />
		      <label for="filter__${this._caption.toLowerCase()}" class="filter__label">${this._caption}
		  <span class="filter__${this._caption.toLowerCase()}-count">${this._amount}</span></label></div>`.trim();
  }

  _onFilterClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  bind() {
    this._element.querySelector(`.filter__input`)
      .addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.querySelector(`.filter__input`)
      .removeEventListener(`click`, this._onFilterClick);
  }
}

export default Filter;
