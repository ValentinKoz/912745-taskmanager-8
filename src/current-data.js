import {getDateAndTime, getRandomTags} from './info.js';

const currentData = (data) => ({
  title: data.title[Math.floor(Math.random() * 3)],
  dueDate: getDateAndTime(data.dueDate),
  tags: getRandomTags(data.tags),
  picture: data.picture + `${Math.random()}`,
  color: data.color[Math.floor(Math.random() * 5)],
  repeatingDays: data.repeatingDays,
});

export default currentData;
