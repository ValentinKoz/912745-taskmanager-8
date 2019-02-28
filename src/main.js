import getFilter from './make-filter.js';
import getCard from './make-task.js';
const TEST_DATA = 7;

let rand = (max = 6, min = 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const Filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];
let conteinerFilters = [];

for (let i = 0; i < Filters.length; i++) {
  conteinerFilters.push(getFilter(Filters[i], rand()));
}

conteinerFilters = conteinerFilters.join(` `);
mainFilter.insertAdjacentHTML(`beforeend`, conteinerFilters);

for (let i = 0; i < TEST_DATA; i++) {
  boardTasks.insertAdjacentHTML(`beforeend`, getCard());
}

mainFilter.addEventListener(`change`, function (evt) {
  if (evt.target.tagName === `INPUT`) {
    boardTasks.innerText = ``;
    const cardCount = rand();
    for (let i = 0; i < cardCount; i++) {
      boardTasks.insertAdjacentHTML(`beforeend`, getCard());
    }
  }
});
