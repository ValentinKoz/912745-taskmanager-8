import makeFilter from './make-filter.js';
import getCard from './make-task.js';
import makeTask from './get-task.js';
import getTask from './info.js';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
let conteinerFilters = [];

for (const Filter of getTask.Filters) {
  conteinerFilters.push(makeFilter(Filter, getTask.rand()));
}
conteinerFilters = conteinerFilters.join(` `);
mainFilter.insertAdjacentHTML(`beforeend`, conteinerFilters);

let conteinerCards = [];
getTask.addingCards(getTask, getCard, makeTask, conteinerCards, boardTasks);

mainFilter.addEventListener(`change`, function (evt) {
  if (evt.target.tagName === `INPUT`) {
    boardTasks.innerText = ``;
    const cardCount = getTask.rand();
    for (let i = 0; i < cardCount; i++) {
      boardTasks.insertAdjacentHTML(`beforeend`, getCard(makeTask()));
    }
  }
});
