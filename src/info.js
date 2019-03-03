const rand = (max = 6, min = 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const TEST_DATA = 7;
const Filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

const addingCards = (info, getCard, task, conteinerCards, boardTasks) => {
  for (let i = 0; i < info.TEST_DATA; i++) {
    conteinerCards.push(getCard(task()));
  }
  conteinerCards = conteinerCards.join(` `);
  boardTasks.insertAdjacentHTML(`beforeend`, conteinerCards);
};

export default {
  TEST_DATA,
  rand,
  Filters,
  addingCards,
};
