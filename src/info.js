const TEST_DATA = 7;
const Filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

const rand = (max = 6, min = 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const addingCards = (info, makeTask, getTask, conteinerCards, boardTasks) => {
  for (let i = 0; i < info.TEST_DATA; i++) {
    conteinerCards.push(makeTask(getTask()));
  }
  conteinerCards = conteinerCards.join(` `);
  boardTasks.insertAdjacentHTML(`beforeend`, conteinerCards);
};

const getDateAndTime = (task) => {
  const dateTime = task.dueDate.toString().split(` `);
  const date = dateTime[2] + ` ` + dateTime[1];

  let getHour = task.dueDate.getHours();
  let getMinutes = task.dueDate.getMinutes();
  getMinutes = (getMinutes > 10) ? getMinutes : `0` + getMinutes;
  const format = (getHour >= 12) ? `PM` : `AM`;
  getHour = (getHour >= 12) ? getHour - 12 : getHour;
  const time = getHour + `:` + getMinutes + ` ` + format;
  return [date, time];
};

const checkRepeatDays = (task) => {
  const repDays = [];
  for (const day of task.repeatingDays) {
    if (day[1]) {
      repDays.push(day[0].toLowerCase());
    }
  }
  return repDays;
};

const getRandomTags = (task) => {
  const QUTY_TAGS = rand(4, 0);
  const setFromArray = Array.from(task.tags);
  const tagsForCard = new Set([]);

  while (tagsForCard.size < QUTY_TAGS) {
    const randomTag = setFromArray[rand(7, 0)];
    tagsForCard.add(randomTag);
  }
  return [...tagsForCard].map((it) => `<string>#${it}</string>`).join(` `);
};

export default {
  getRandomTags,
  checkRepeatDays,
  getDateAndTime,
  TEST_DATA,
  rand,
  Filters,
  addingCards,
};
