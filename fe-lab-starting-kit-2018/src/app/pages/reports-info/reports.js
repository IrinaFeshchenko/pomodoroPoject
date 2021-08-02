import { WFMComponent, bootstrap } from '../../../framework/index';
import { reportDayModule, reportMonthModule, reportWeekModule, reportDayPomodorosModule, reportWeekPomodorosModule, reportPomodorosMonthModule } from '.';
import { reportsMonthComponent } from './reports-info-month/reports-info-month';
import { Router } from '../../router';
require('./reports.less');

class ReportsComponent extends WFMComponent {
    constructor(config) {
        super(config);
    }
    events() {
        return {
            'click .render-day': 'goToDayReportTasks',
            'click .render-week': 'goToWeekReportTasks',
            'click .render-month': 'goToMonthReportTasks',
            'click .statistic-back': 'goToTaskList'
        }
    }

    onInit() {

    }
    afterInit() {
        let pomodorosStatRender = document.getElementsByClassName("stat-pomodoros")[0];
        let tasksStatRender = document.getElementsByClassName("stat-tasks")[0];
        if (window.location.hash === "#reports/day/tasks") {
            bootstrap(reportDayModule);
            pomodorosStatRender.href = "#reports/day/pomodoros";
            tasksStatRender.href = "#reports/day/tasks"
        } else if (window.location.hash === "#reports/week/tasks") {
            bootstrap(reportWeekModule)
            pomodorosStatRender.href = "#reports/week/pomodoros";
            tasksStatRender.href = "#reports/week/tasks"
        } else if (window.location.hash === "#reports/month/tasks") {
            bootstrap(reportMonthModule)
            pomodorosStatRender.href = "#reports/month/pomodoros";
            tasksStatRender.href = "#reports/month/tasks"
        } else if (window.location.hash === "#reports/day/pomodoros") {
            bootstrap(reportDayPomodorosModule);
            pomodorosStatRender.href = "#reports/day/pomodoros";
            tasksStatRender.href = "#reports/day/tasks"
        } else if (window.location.hash === "#reports/week/pomodoros") {
            bootstrap(reportWeekPomodorosModule);
            pomodorosStatRender.href = "#reports/week/pomodoros";
            tasksStatRender.href = "#reports/week/tasks"
        } else if (window.location.hash === "#reports/month/pomodoros") {
            bootstrap(reportPomodorosMonthModule);
            pomodorosStatRender.href = "#reports/month/pomodoros";
            tasksStatRender.href = "#reports/month/tasks"
        }
    }
    goToTaskList() {
        Router.navigate('task-list')
    }

    goToDayReportTasks() {
        event.preventDefault()
        Router.navigate('reports/day/tasks')
        bootstrap(reportDayModule)
    }
    goToWeekReportTasks() {
        event.preventDefault()
        Router.navigate('reports/week/tasks')
        bootstrap(reportWeekModule)
    }
    goToMonthReportTasks() {
        event.preventDefault()
        Router.navigate('reports/month/tasks')
        bootstrap(reportMonthModule)
    }
}

export const reportsComponent = new ReportsComponent({
    selector: 'app-reports-page',
    template: `
    <main class="main">
    <div class="container">
      <div class="navigation2">
        <a class="to-do-tasks render-day">Day</a>
        <span> | </span>
        <a class="done-tasks render-week">Week</a>
        <span> | </span>
        <a class="done-tasks render-month">Month</a>
      </div>
      <div class="statistic">
        <div class="statistic-back">
          <img src="/images/back.png" alt="do">
        </div>
        <div class="statistic-block">
          <app-reports-day-page></app-reports-day-page>
          <app-reports-week-page></app-reports-week-page>
          <app-reports-month-page></app-reports-month-page>
          <app-reports-day-promodoros-page></app-reports-day-promodoros-page>
        </div>
        <div class="statistic-back">
        <img src="/images/back.png" alt="do" style="display:none">
        </div>
      </div>
      <div class="navigation2">
        <div class="navigation-padding">
          <a href="#" class="to-do-tasks stat-pomodoros">Pomodoros</a>
          <span> | </span>
          <a href="#" class="done-tasks stat-tasks">Tasks</a>
        </div>
      </div>
    </div>
  </main>
    `
})