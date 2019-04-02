import Component from './component.js';
import flatpickr from "flatpickr";
import {createElement} from './create-element.js';
import moment from 'moment';

class TaskEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._repeatingDays = data.repeatingDays;
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._color = data.color;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onSubmit = null;
    this._onDelete = null;

    this.state = {
      isDate: false,
      isRepeated: false,
    };

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._changeDataInput = this._changeDataInput.bind(this);
    this._changeTimeInput = this._changeTimeInput.bind(this);
    this._changeRepeatedLabel = this._changeRepeatedLabel.bind(this);
    this._changeText = this._changeText.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this._deleteTags = this._deleteTags.bind(this);
    this._addTags = this._addTags.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: [],
      dueDate: false,
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      },
    };

    const taskEditMapper = TaskEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    return entry;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _changeTimeInput() {
    if (!this._dueDate) {
      this._dueDate = moment();
    }
    const value = this._element.querySelector(`.card__time`).value;
    const timeString = value.split(` `);
    let hours = timeString[0].split(`:`)[0];
    let minutes = timeString[0].split(`:`)[1];
    if (timeString[1] === `PM`) {
      hours = +hours + 12;
    }
    this._dueDate.hour(hours).minute(minutes);

    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _deleteTags(evt) {
    if (evt.target.classList.value === `card__hashtag-delete`) {
      const parentNode = evt.target.parentNode;
      const inputValue = parentNode.querySelector(`input`).value;
      const index = this._tags.indexOf(inputValue);
      this._tags.splice(index, 1);
      this.unbind();
      this._partialUpdate();
      this.bind();
    }
  }

  _addTags(evt) {
    this._tags.push(evt.target.value);
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _changeText() {
    this._title = this._element.querySelector(`.card__text`).value;
  }

  _changeDataInput() {
    if (!this._dueDate) {
      this._dueDate = moment();
    }
    const value = this._element.querySelector(`.card__date`).value;
    const [date, month] = value.split(` `);
    this._dueDate = this._dueDate.date(date).month(month);
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _changeRepeatedLabel(evt) {
    this._repeatingDays[evt.target.value] = !this._repeatingDays[evt.target.value];
    this.unbind();
    this._partialUpdate();
    this.bind();
  }
  _changeColor(evt) {
    this._color = evt.target.value;
  }

  _onChangeDate() {
    this.state.isDate = !this.state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this.state.isRepeated = !this.state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);

    this.state.isDate = false;
    this.state.isRepeated = false;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  setOnDelete(fn) {
    this._onDelete = fn;
  }

  _onDeleteButtonClick() {
    if (typeof this._onDelete === `function`) {
      this._onDelete({id: this._id});
    }
  }

  _partialUpdate() {
    const parentDomElement = document.querySelector(`.board__tasks`);
    const previousElement = this._element;

    this._element = createElement(this.template);
    parentDomElement.replaceChild(this._element, previousElement);
    previousElement.remove();
  }

  get template() {
    return `
    <article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this.state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${!this.state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" value="${this._dueDate ? this._dueDate.format(`D MMMM`) : ``}" placeholder="23 September" name="date"/>
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" value="${this._dueDate ? this._dueDate.format(`HH:mm A`) : ``}" placeholder="10:00 АМ" name="time"/>
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">${this.state.isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${!this.state.isRepeated && `disabled`}>
                  <div class="card__repeat-days-inner">
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-5" name="repeat" value="mo" ${this._repeatingDays.mo && `checked`}/>
                    <label class="card__repeat-day" for="repeat-mo-5">mo</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-5" name="repeat" value="tu"  ${this._repeatingDays.tu && `checked`}/>
                    <label class="card__repeat-day" for="repeat-tu-5">tu</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-5" name="repeat" value="we"  ${this._repeatingDays.we && `checked`}/>
                    <label class="card__repeat-day" for="repeat-we-5" >w</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-5" name="repeat" value="th"  ${this._repeatingDays.th && `checked`}/>
                    <label class="card__repeat-day" for="repeat-th-5">th</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-5" name="repeat" value="fr"  ${this._repeatingDays.fr && `checked`}/>
                    <label class="card__repeat-day" for="repeat-fr-5" >fr</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-5"  ${this._repeatingDays.sa && `checked`}/>
                    <label class="card__repeat-day" for="repeat-sa-5">sa</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-5" name="repeat" value="su"  ${this._repeatingDays.su && `checked`}/>
                    <label class="card__repeat-day" for="repeat-su-5" >su</label>
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${Array.from(this._tags).map((tag) => (`
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

                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                </label>
              </div>
            </div>

            <label class="card__img-wrap card__img-wrap--empty">
              <input type="file" class="card__img-input visually-hidden" name="img" />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input type="radio" id="color-black-5" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" ${ this._color === `black` ? `checked` : ``}/>
                <label for="color-black-5" class="card__color card__color--black">black</label>

                <input type="radio" id="color-yellow-5" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow"  ${ this._color === `yellow` ? `checked` : ``}/>
                <label for="color-yellow-5" class="card__color card__color--yellow">yellow</label>

                <input type="radio" id="color-blue-5" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue"  ${ this._color === `blue` ? `checked` : ``}/>
                <label for="color-blue-5" class="card__color card__color--blue">blue</label>

                <input type="radio" id="color-green-5" class="card__color-input card__color-input--green visually-hidden" name="color" value="green"  ${ this._color === `green` ? `checked` : ``}/>
                <label for="color-green-5" class="card__color card__color--green">green</label>

                <input type="radio" id="color-pink-5" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink"  ${ this._color === `pink` ? `checked` : ``}/>
                <label for="color-pink-5" class="card__color card__color--pink">pink</label>
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__form`)
    .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
    .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
    .addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__date`)
    .addEventListener(`change`, this._changeDataInput);
    this._element.querySelector(`.card__time`)
    .addEventListener(`click`, this._changeTimeInput);
    this._element.querySelector(`.card__repeat-days-inner`)
    .addEventListener(`change`, this._changeRepeatedLabel);
    this._element.querySelector(`.card__delete`)
    .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__text`)
    .addEventListener(`change`, this._changeText);
    this._element.querySelector(`.card__colors-wrap`)
    .addEventListener(`change`, this._changeColor);
    this._element.querySelector(`.card__hashtag`)
    .addEventListener(`click`, this._deleteTags);
    this._element.querySelector(`.card__hashtag-input`)
    .addEventListener(`change`, this._addTags);

    if (this.state.isDate) {
      flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__date`)
    .removeEventListener(`change`, this._changeDataInput);
    this._element.querySelector(`.card__time`)
    .removeEventListener(`click`, this._changeTimeInput);
    this._element.querySelector(`.card__repeat-days-inner`)
    .removeEventListener(`change`, this._changeRepeatedLabel);
    this._element.querySelector(`.card__delete`)
    .removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__text`)
    .removeEventListener(`change`, this._changeText);
    this._element.querySelector(`.card__colors-wrap`)
    .removeEventListener(`change`, this._changeColor);
    this._element.querySelector(`.card__hashtag`)
    .removeEventListener(`click`, this._deleteTags);
    this._element.querySelector(`.card__hashtag-input`)
    .removeEventListener(`change`, this._addTags);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  shake(text) {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._element.querySelector(`.card__inner`).style.border = `2px solid red`;
    setTimeout(() => {
      if (text === `SAVE`) {
        this._element.querySelector(`.card__save`).innerHTML = `${text}`;
      } else {
        this._element.querySelector(`.card__delete`).innerHTML = `${text}`;
      }
      this._element.querySelector(`.card__inner`).style.border = ``;
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.push(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      time: (value) => {
        if (!target.dueDate) {
          target.dueDate = moment();
        }
        const dateString = value.split(` `);
        let [hours, minutes] = dateString[0].split(`:`);

        if (dateString[1] === `PM`) {
          hours = +hours + 12;
        }

        target.dueDate.hour(hours).minute(minutes);
      },
      date: (value) => {
        if (!target.dueDate) {
          target.dueDate = moment();
        }
        target.dueDate.date(value.split(` `)[0]).month(value.split(` `)[1]);
      }
    };
  }

}

export default TaskEdit;
