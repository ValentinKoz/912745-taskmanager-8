import {createElement} from './create-element.js';
import Component from './component.js';

class TaskEdit extends Component{
  constructor(Task) {
    super();
    this._propertiesOfTask = Task;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;
  }

  _onSubmitButtonClick(evt) {
    if (evt.target.classList.contains(`card__save`)) {
      evt.preventDefault();
      if (typeof this._onSubmit === `function`) {
        this._onSubmit();
      }
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
    <article class="card card--edit card--blue ${this._propertiesOfTask._repeatingDays.lenght !== 0 ? `card--repeat` : ``}">
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
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._propertiesOfTask._title}</textarea>
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
                    <input class="card__date" type="text" placeholder="23 September" name="date" value="${this._propertiesOfTask._dueDate[0]}"/>
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time"  value="${this._propertiesOfTask._dueDate[1]}"/>
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days" disabled>
                  <div class="card__repeat-days-inner">
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-5" name="repeat" value="mo" ${this._propertiesOfTask._repeatingDays.indexOf(`mo`) !== -1 ? `checked` : ``}/>
                    <label class="card__repeat-day" for="repeat-mo-5">mo</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-5" name="repeat" value="tu"  ${this._propertiesOfTask._repeatingDays.indexOf(`tu`) !== -1 ? `checked` : ``}/>
                    <label class="card__repeat-day" for="repeat-tu-5">tu</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-5" name="repeat" value="we"  ${this._propertiesOfTask._repeatingDays.indexOf(`we`) !== -1 ? `checked` : ``}/>
                    <label class="card__repeat-day" for="repeat-we-5" >w</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-5" name="repeat" value="th"  ${this._propertiesOfTask._repeatingDays.indexOf(`th`) !== -1 ? `checked` : ``}/>
                    <label class="card__repeat-day" for="repeat-th-5">th</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-5" name="repeat" value="fr"  ${this._propertiesOfTask._repeatingDays.indexOf(`fr`) !== -1 ? `checked` : ``}/>
                    <label class="card__repeat-day" for="repeat-fr-5" >fr</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-5"  ${this._propertiesOfTask._repeatingDays.indexOf(`sa`) !== -1 ? `checked` : ``}/>
                    <label class="card__repeat-day" for="repeat-sa-5">sa</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-5" name="repeat" value="su"  ${this._propertiesOfTask._repeatingDays.indexOf(`su`) !== -1 ? `checked` : ``}/>
                    <label class="card__repeat-day" for="repeat-su-5" >su</label>
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${this._propertiesOfTask._tags.map((tag) => (`
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
                <input type="radio" id="color-black-5" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" ${this._propertiesOfTask._color === `black` ? `checked` : ``}/>
                <label for="color-black-5" class="card__color card__color--black">black</label>

                <input type="radio" id="color-yellow-5" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow"  ${this._propertiesOfTask._color === `yellow` ? `checked` : ``}/>
                <label for="color-yellow-5" class="card__color card__color--yellow">yellow</label>

                <input type="radio" id="color-blue-5" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue"  ${this._propertiesOfTask._color === `blue` ? `checked` : ``}/>
                <label for="color-blue-5" class="card__color card__color--blue">blue</label>

                <input type="radio" id="color-green-5" class="card__color-input card__color-input--green visually-hidden" name="color" value="green"  ${this._propertiesOfTask._color === `green` ? `checked` : ``}/>
                <label for="color-green-5" class="card__color card__color--green">green</label>

                <input type="radio" id="color-pink-5" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink"  ${this._propertiesOfTask._color === `pink` ? `checked` : ``}/>
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
    this._element.addEventListener(`click`, this._onSubmitButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onSubmitButtonClick);
  }

}

export default TaskEdit;