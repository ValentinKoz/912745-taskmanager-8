import Task from './task.js';
import data from './data.js';
import TaskEdit from './edit-Task.js';
import currentData from './current-data.js';

export const TEST_DATA = 7;
export const Filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

export const rand = (max = 6, min = 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const primaryTaskList = () => {
  for (let i = 0; i < TEST_DATA; i++) {
    createTask();
  }
};
export const createRandomDate = (date) => {
  date.add(rand(), `days`);
  date.subtract(rand(), `days`);
  return date;
};

const taskContainer = document.querySelector(`.board__tasks`);

export const createTask = () => {

  const dataForTask = currentData(data());
  const componentTask = new Task(dataForTask);
  const editComponentTask = new TaskEdit(dataForTask);
  taskContainer.appendChild(componentTask.render());

  componentTask.onEdit = () => {
    editComponentTask.render();
    taskContainer.replaceChild(editComponentTask.element, componentTask.element);
    componentTask.unrender();
  };

  editComponentTask.onSubmit = (newObject) => {
    dataForTask.title = newObject.title;
    dataForTask.tags = newObject.tags;
    dataForTask.color = newObject.color;
    dataForTask.repeatingDays = newObject.repeatingDays;
    dataForTask.dueDate = newObject.dueDate;

    componentTask.update(dataForTask);
    componentTask.render();
    taskContainer.replaceChild(componentTask.element, editComponentTask.element);
    editComponentTask.unrender();
  };
};

export const getDateAndTime = (param) => {
  const dateAndTime = param;
  const dateTime = dateAndTime.toString().split(` `);
  const date = dateTime[2] + ` ` + dateTime[1];
  let getHour = dateAndTime.getHours();
  let getMinutes = dateAndTime.getMinutes();
  getMinutes = (getMinutes > 10) ? getMinutes : `0` + getMinutes;
  const format = (getHour >= 12) ? `PM` : `AM`;
  getHour = (getHour >= 12) ? getHour - 12 : getHour;
  const time = getHour + `:` + getMinutes + ` ` + format;
  return [date, time];
};

export const getRandomTags = (tags) => {
  const qutyTegs = rand(4, 0);
  while (tags.length !== qutyTegs) {
    const index = rand(tags.length, 0);
    tags.splice(index, 1);
  }
  return tags;
};
