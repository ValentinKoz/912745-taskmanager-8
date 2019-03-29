import Task from './task.js';
import data from './data.js';
import TaskEdit from './edit-Task.js';
import currentData from './current-data.js';

export const TEST_DATA = 7;
export const Filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

export const rand = (max = 6, min = 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getTaskData = () => {
  const massivTasks = [];
  for (let i = 0; i < TEST_DATA; i++) {
    const dataForTask = currentData(data());
    massivTasks.push(dataForTask);
  }
  return massivTasks;
};

export const createRandomDate = (date) => {
  date.add(rand(), `days`);
  date.subtract(rand(), `days`);
  return date;
};

const deleteTask = (tasks, i) => {
  tasks[i] = null;
  return tasks;
};

const updateTask = (tasks, i, newTask) => {
  tasks[i] = Object.assign({}, tasks[i], newTask);
  return tasks[i];
};

export const renderTasks = (tasks, taskContainer) => {
  taskContainer.innerHTML = ``;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const componentTask = new Task(task);
    const editComponentTask = new TaskEdit(task);

    componentTask.onEdit = () => {
      editComponentTask.render();
      taskContainer.replaceChild(editComponentTask.element, componentTask.element);
      componentTask.unrender();
    };

    editComponentTask.onDelete = () => {
      deleteTask(tasks, i);
      taskContainer.removeChild(editComponentTask.element);
      editComponentTask.unrender();
    };

    editComponentTask.onSubmit = (newObject) => {

      const updatedTask = updateTask(tasks, i, newObject);

      componentTask.update(updatedTask);
      componentTask.render();
      taskContainer.replaceChild(componentTask.element, editComponentTask.element);
      editComponentTask.unrender();
    };
    taskContainer.appendChild(componentTask.render());
  }
};

export const getRandomTags = (tags) => {
  const qutyTegs = rand(4, 0);
  while (tags.length !== qutyTegs) {
    const index = rand(tags.length, 0);
    tags.splice(index, 1);
  }
  return tags;
};
