import moment from 'moment';
import {rand} from './info.js';

export const renderFilter = (filters, Filter, filterTasks, renderTasks, tasksContainer, initialTasks) => {
  const mainFilter = document.querySelector(`.main__filter`);
  mainFilter.innerHTML = ``;

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    const filterComponent = new Filter(filter);

    filterComponent.onFilter = () => {
      const filterName = filterComponent.element.querySelector(`input`).id;
      const filteredTasks = filterTasks(filters, filterName, initialTasks);
      renderTasks(filteredTasks, tasksContainer);
    };
    mainFilter.appendChild(filterComponent.render());
  }
};

export const filterTasks = (tasks, filterName, initialTasks) => {
  switch (filterName) {
    case `filter__all`:
      return initialTasks;

    case `filter__overdue`:
      return initialTasks.filter((it) => {
        if (it.dueDate) {
          return it.dueDate.isAfter();
        } else {
          return false;
        }
      });

    case `filter__today`:
      return initialTasks.filter((it) => {
        if (it.dueDate) {
          return it.dueDate.isSame(moment(), `day`);
        } else {
          return false;
        }
      });

    case `filter__repeating`:
      return initialTasks.filter((it) => [...Object.entries(it.repeatingDays)]
        .some((rec) => rec[1]));

    default:
      return initialTasks;
  }
};

export const getFilterData = (Filters) => {
  const massivFilters = [];
  for (const filter of Filters) {
    massivFilters.push({caption: filter, amount: rand()});
  }
  return massivFilters;
};
