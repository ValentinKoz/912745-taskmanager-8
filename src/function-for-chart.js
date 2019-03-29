import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import flatpickr from "flatpickr";
import Chart from 'chart.js';

export const colorForChart = {
  black: `#000000`,
  yellow: `#FFFF00`,
  blue: `#0000FF`,
  green: `#008000`,
  pink: `#FFC0CB`,
};

export const filterTags = (tasks, timeAfter, timeBefore) => {
  const massivTags = {};
  const labels = [];
  const data = [];
  const backgroundColor = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].dueDate && tasks[i].dueDate.isBetween(timeAfter, timeBefore)) {
      const mas = [...tasks[i].tags];
      mas.forEach((a) => {
        massivTags[a] = massivTags[a] + 1 || 1;
      });
    }
  }
  for (const key in massivTags) {
    if (key) {
      labels.push(`#${key}`);
      data.push(massivTags[key]);
      backgroundColor.push(`#` + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
    }
  }
  return {
    labels,
    data,
    backgroundColor,
  };
};

export const filterColors = (tasks, timeAfter, timeBefore) => {
  const massivTags = {};
  const labels = [];
  const data = [];
  const color = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].dueDate.isBetween(timeAfter, timeBefore)) {
      const elem = tasks[i].color;
      if (massivTags[elem]) {
        massivTags[elem] += 1;
      } else {
        massivTags[elem] = 1;
      }
    }
  }
  for (const key in massivTags) {
    if (key) {
      labels.push(`#${key}`);
      data.push(massivTags[key]);
      color.push(colorForChart[key]);
    }
  }

  return {
    labels,
    data,
    color,
  };
};

export const chartConteiner = (initialTasks) => {

  const inputPeriod = document.querySelector(`.statistic__period-input`);
  const boardConteiner = document.querySelector(`.board`);
  const statistic = document.querySelector(`.statistic`);

  inputPeriod.value = `${moment().startOf(`week`).format(`YYYY-MM-DD`)} — ${moment().endOf(`week`).format(`YYYY-MM-DD`)}`;
  inputPeriod.placeholder = `${moment().startOf(`week`).format(`DD MMMM`)} — ${moment().endOf(`week`).format(`DD MMMM`)}`;

  boardConteiner.classList.add(`visually-hidden`);
  statistic.classList.remove(`visually-hidden`);

  flatpickr(document.querySelector(`.statistic__period-input`), {mode: `range`, altInput: true, altFormat: `j F`, locale: {rangeSeparator: ` — `}});

  buildChart(initialTasks);
};

export const buildChart = (initialTasks) => {

  const inputPeriod = document.querySelector(`.statistic__period-input`);
  const colorWrap = document.querySelector(`.statistic__colors-wrap`);
  const tagsWrap = document.querySelector(`.statistic__tags-wrap`);
  colorWrap.outerHTML = `<div class="statistic__colors-wrap"><canvas class="statistic__colors" width="400" height="300"></canvas></div>`;
  tagsWrap.outerHTML = `<div class="statistic__tags-wrap"><canvas class="statistic__tags" width="400" height="300"></canvas></div>`;
  const tagsCtx = document.querySelector(`.statistic__tags`);
  const colorsCtx = document.querySelector(`.statistic__colors`);

  if (!inputPeriod.value) {
    inputPeriod.value = `${moment().startOf(`week`).format(`YYYY-MM-DD`)} — ${moment().endOf(`week`).format(`YYYY-MM-DD`)}`;
  }

  let [start, finish] = inputPeriod.value.split(` — `);
  start = moment(start);
  finish = moment(finish);

  const tagsDataForChart = filterTags(initialTasks, start, finish);
  const colorDataForChart = filterColors(initialTasks, start, finish);

  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: tagsDataForChart.labels,
      datasets: [{
        data: tagsDataForChart.data,
        backgroundColor: tagsDataForChart.backgroundColor
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: colorDataForChart.labels,
      datasets: [{
        data: colorDataForChart.data,
        backgroundColor: colorDataForChart.color
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
  return [tagsChart, colorsChart];
};
