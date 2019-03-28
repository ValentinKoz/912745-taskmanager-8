import Filter from './filter.js';
import {Filters, getTaskData, renderTasks} from './info.js';
import {buildChart, chartConteiner} from './function-for-chart.js';
import {renderFilter, filterTasks, getFilterData} from './function-for-filter.js';


const tasksContainer = document.querySelector(`.board__tasks`);
const controlStatistic = document.querySelector(`#control__statistic`);
const statisticPeriod = document.querySelector(`.statistic__period-input`);
const controlTasks = document.querySelector(`#control__task`);

const initialTasks = getTaskData();
renderTasks(initialTasks, tasksContainer);

const initialFilter = getFilterData(Filters);
renderFilter(initialFilter, Filter, filterTasks, renderTasks, tasksContainer, initialTasks);

controlStatistic.addEventListener(`click`, () => {
  chartConteiner(initialTasks);
});
statisticPeriod.addEventListener(`change`, () => {
  buildChart(initialTasks);
});

controlTasks.addEventListener(`click`, () => {
  const boardConteiner = document.querySelector(`.board`);
  const statistic = document.querySelector(`.statistic`);
  boardConteiner.classList.remove(`visually-hidden`);
  statistic.classList.add(`visually-hidden`);
});
