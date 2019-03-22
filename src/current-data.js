import {getRandomTags, rand, createRandomDate} from './info.js';

const currentData = (data) => ({
  title: data.title[rand(3, 0)],
  dueDate: createRandomDate(data.dueDate),
  tags: getRandomTags(data.tags),
  picture: data.picture + `${Math.random()}`,
  color: data.color[rand(5, 0)],
  repeatingDays: data.repeatingDays,
});

export default currentData;
