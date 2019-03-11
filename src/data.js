const data = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: new Date(Date.now() + 1 + Math.floor(Math.random() * 7 * 24 * 60) * 60 * 1000),
  tags: new Set([
    `keks`,
    `lecture`,
    `problem`,
    `intensive`,
    `practice`,
    `theory`,
    `homework`,
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 5)],
  repeatingDays: new Map([
    [`Mo`, Math.random()],
    [`Tu`, Math.random()],
    [`We`, Math.random()],
    [`Th`, Math.random()],
    [`Fr`, Math.random()],
    [`Sa`, Math.random()],
    [`Su`, Math.random()],
  ]),
  isFavorite: Math.random(),
  isDone: Math.random(),
});

export default data;
