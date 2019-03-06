import makeFilter from './make-filter.js';
import makeTask from './make-task.js';
import getTask from './get-task.js';
import info from './info.js';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
let conteinerFilters = [];

for (const Filter of info.Filters) {
  conteinerFilters.push(makeFilter(Filter, info.rand()));
}
conteinerFilters = conteinerFilters.join(` `);
mainFilter.insertAdjacentHTML(`beforeend`, conteinerFilters);

let conteinerCards = [];
info.addingCards(info, makeTask, getTask, conteinerCards, boardTasks);

mainFilter.addEventListener(`change`, function (evt) {
  if (evt.target.tagName === `INPUT`) {
    boardTasks.innerText = ``;
    const cardCount = info.rand();
    for (let i = 0; i < cardCount; i++) {
      boardTasks.insertAdjacentHTML(`beforeend`, makeTask(getTask()));
    }
  }
});
