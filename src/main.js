import {buildChart, chartConteiner} from './function-for-chart.js';
import {renderFilter, filterTasks, getFilterData} from './function-for-filter.js';
import Task from './task.js';
import TaskEdit from './edit-task.js';
import {loadTasks, errorLoad, block, unblock, Filters} from './info.js';
import Filter from './filter.js';
import {API} from './api.js';

const tasksContainer = document.querySelector(`.board__tasks`);
const controlStatistic = document.querySelector(`#control__statistic`);
const statisticPeriod = document.querySelector(`.statistic__period-input`);
const controlTasks = document.querySelector(`#control__task`);


const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;

loadTasks();
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const renderTasks = (tasks) => {
  tasksContainer.innerHTML = ``;

  for (const task of tasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    tasksContainer.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

      block(editTaskComponent, `Saving`);
      api.updateTask({id: task.id, data: task.toRAW()})
        .then(unblock(editTaskComponent))
        .then((newTask) => {
          taskComponent.update(newTask);
          taskComponent.render();
          tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
          editTaskComponent.unrender();
        }).catch(() => {
          editTaskComponent.shake(`SAVE`);
          unblock(editTaskComponent);
        });
    };

    editTaskComponent.setOnDelete(({id}) => {
      block(editTaskComponent, `Deleting`);
      api.deleteTask({id})
        .then(unblock(editTaskComponent))
        .then(() => api.getTasks())
        .then(renderTasks)
        .catch(() => {
          editTaskComponent.shake(`DELETE`);
          unblock(editTaskComponent);
        });
    });
  }
};

api.getTasks()
  .then((tasks) => {
    renderTasks(tasks);
  }).catch(errorLoad);

const massivTasks = [];
api.getTasks().then((tasks) => {
  tasks.map((task) => massivTasks.push(task));
});

const initialFilter = getFilterData(Filters);
renderFilter(initialFilter, Filter, filterTasks, renderTasks, tasksContainer, massivTasks);

controlStatistic.addEventListener(`click`, () => {
  chartConteiner(massivTasks);
});
statisticPeriod.addEventListener(`change`, () => {
  buildChart(massivTasks);
});

controlTasks.addEventListener(`click`, () => {
  const boardConteiner = document.querySelector(`.board`);
  const statistic = document.querySelector(`.statistic`);
  boardConteiner.classList.remove(`visually-hidden`);
  statistic.classList.add(`visually-hidden`);
});
