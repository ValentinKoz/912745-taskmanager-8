import {getDateAndTime, getRandomTags, checkRepeatDays} from './info.js';
import {createElement} from './create-element.js';
import Component from './component.js';

class Task extends Component{
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = getDateAndTime(data.dueDate);
    this._tags = getRandomTags(data.tags);
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = checkRepeatDays(data.repeatingDays);

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _onEditButtonClick(evt) {
    if (evt.target.classList.contains(`card__btn--edit`)) {
      if (typeof this._onEdit === `function`) {
        this._onEdit();
      }
    }
  }

  get template() {
    return `
      <article class="card card--${this._color} ${this._repeatingDays.lenght !== 0 ? `card--repeat` : ``}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
                </div>
                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>
                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._title}</textarea>
                  </label>
                </div>
                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">no</span>
                      </button>
                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${this._dueDate[0]}"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder=""
                            name="time"
                            value="${this._dueDate[1]}"
                          />
                        </label>
                      </fieldset>
                    </div>
                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                      ${this._tags.map((tag) => (`
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="${tag}"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #${tag}
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>`.trim())).join(``)}
                      </div>
                    </div>
                  </div>
                  <label class="card__img-wrap ">
                    <input
                      type="file"
                      class="card__img-input visually-hidden"
                      name="img"
                    />
                    <img
                      src="${this._picture}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>
                </div>
              </div>
            </form>
          </article>
      `.trim();
  }

  set onEdit(fn) {
      this._onEdit = fn;
    }

  bind() {
    this._element
          .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element
    .removeEventListener(`click`, this._onEditButtonClick);
  }
}

export default Task;
