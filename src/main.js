import getFilter from './make-filter.js';
import getCard from './make-task.js';
import task from './get-task.js';
import info from './info.js';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
let conteinerFilters = [];

for (const Filter of info.Filters) {
  conteinerFilters.push(getFilter(Filter, info.rand()));
}
conteinerFilters = conteinerFilters.join(` `);
mainFilter.insertAdjacentHTML(`beforeend`, conteinerFilters);

let conteinerCards = [];
info.addingCards(info, getCard, task, conteinerCards, boardTasks);

mainFilter.addEventListener(`change`, function (evt) {
  if (evt.target.tagName === `INPUT`) {
    boardTasks.innerText = ``;
    const cardCount = info.rand();
    for (let i = 0; i < cardCount; i++) {
      boardTasks.insertAdjacentHTML(`beforeend`, getCard(task()));
    }
  }
});
