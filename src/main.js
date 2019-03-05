import makeFilter from './make-filter.js';
import getCard from './make-task.js';
import makeTask from './get-task.js';
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
info.addingCards(info, getCard, makeTask, conteinerCards, boardTasks);

mainFilter.addEventListener(`change`, function (evt) {
  if (evt.target.tagName === `INPUT`) {
    boardTasks.innerText = ``;
    const cardCount = info.rand();
    for (let i = 0; i < cardCount; i++) {
      boardTasks.insertAdjacentHTML(`beforeend`, getCard(makeTask()));
    }
  }
});
