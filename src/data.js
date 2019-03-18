const data = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ],
  dueDate: new Date(Date.now() + 1 + Math.floor(Math.random() * 7 * 24 * 60) * 60 * 1000),
  tags: [
    `keks`,
    `lecture`,
    `problem`,
    `intensive`,
    `practice`,
    `theory`,
    `homework`,
  ],
  picture: `http://picsum.photos/100/100?r=`,
  color: [`black`, `yellow`, `blue`, `green`, `pink`],
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
});

export default data;
