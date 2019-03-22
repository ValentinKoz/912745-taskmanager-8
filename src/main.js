import makeFilter from './make-filter.js';
import {Filters, rand, primaryTaskList, createTask} from './info.js';

const mainFilter = document.querySelector(`.main__filter`);
const taskContainer = document.querySelector(`.board__tasks`);
let conteinerFilters = [];

for (const Filter of Filters) {
  conteinerFilters.push(makeFilter(Filter, rand()));
}
conteinerFilters = conteinerFilters.join(` `);
mainFilter.insertAdjacentHTML(`beforeend`, conteinerFilters);
primaryTaskList();

mainFilter.addEventListener(`change`, function (evt) {
  if (evt.target.tagName === `INPUT`) {
    taskContainer.innerText = ``;
    const cardCount = rand();
    for (let i = 0; i < cardCount; i++) {
      createTask();
    }
  }
});
