export const TEST_DATA = 7;
export const Filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

export const rand = (max = 6, min = 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const addingCards = (makeTask, getTask, boardTasks) => {
  let conteinerCards = [];
  for (let i = 0; i < TEST_DATA; i++) {
    conteinerCards.push(makeTask(getTask()));
  }
  conteinerCards = conteinerCards.join(` `);
  boardTasks.insertAdjacentHTML(`beforeend`, conteinerCards);
};

export const getDateAndTime = (Task) => {
  const dateTime = Task.dueDate.toString().split(` `);
  const date = dateTime[2] + ` ` + dateTime[1];

  let getHour = Task.dueDate.getHours();
  let getMinutes = Task.dueDate.getMinutes();
  getMinutes = (getMinutes > 10) ? getMinutes : `0` + getMinutes;
  const format = (getHour >= 12) ? `PM` : `AM`;
  getHour = (getHour >= 12) ? getHour - 12 : getHour;
  const time = getHour + `:` + getMinutes + ` ` + format;
  return [date, time];
};

export const checkRepeatDays = (Task) => {
  const repDays = [];
  for (const day of Task.repeatingDays) {
    if (day[1]) {
      repDays.push(day[0].toLowerCase());
    }
  }
  return repDays;
};

export const getRandomTags = (Task) => {
  const qutyTegs = rand(4, 0);
  const mas = [...Task.tags];

  while(mas.length !== qutyTegs){
    const index = rand(mas.length, 0);
    mas.splice(index ,1);
  }
  return mas.map((it) => `<string>#${it}</string>`).join(` `);
};
