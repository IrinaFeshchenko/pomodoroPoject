import { WFMComponent, bootstrap } from '../../../../../framework/index'
import { Router } from '../../../../router'
import { Fierbase } from '../../../../../framework/core/shared/firebase'
import { getFirestore } from 'firebase/firestore'
import { getDoc, query, collection, where, getDocs, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import "@babel/polyfill";
import { dailyListModule, emptyDailyListModule } from '.';
import { tasksToDoListModule, tasksDoneListModule } from './daily-tasks';
import { dailyTasksDeleteModeComponent } from './daily-tasks/daily-mode-delete/daily-mode-delete';

/**
 * @class DailyListComponent
 * @extends WFMComponent
 */
class DailyListComponent extends WFMComponent {

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of DailyListComponent.
     */
    constructor(config) {
        super(config);
    }

    /**
     * @function events
     * Set events onClick on Render.
     */
    events() {
        return {
            'click .to-do-tasks': 'renderToDo',
            'click .done-tasks': 'renderDone',
            'click .select_allTasks': 'selectAllTasks',
            'click .deselect_allTasks': 'deselectAllTasks'
        }
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    async afterInit() {
        Fierbase.init();
        let a = await this.checkDailyTasks();
        if (a === 0) {
            bootstrap(emptyDailyListModule);
        } else {
            bootstrap(dailyListModule);
        }
    }

    /**
     * @function checkDailyTasks
     * Check count of daily tasks.
     */
    async checkDailyTasks() {
        var myVal = await Fierbase.checkDailyTasks();
        return myVal;
    }

    /**
     * @function renderToDo
     * Render to do list module.
     */
    async renderToDo() {
        let countTasks = await Fierbase.checkDailyTasks();
        if (countTasks > 0) {
            bootstrap(tasksToDoListModule);
        } else {
            bootstrap(emptyDailyListModule)
        }
    }

    /**
     * @function renderDone
     * Render done list module.
     */
    async renderDone() {
        let countTasks = await Fierbase.checkDailyTasks();
        console.log(countTasks)
        if (countTasks > 0) {
            bootstrap(tasksDoneListModule);
        } else {
            bootstrap(emptyDailyListModule)
        }
    }

    /**
     * @function selectAllTasks
     * Select all tasks in dailyList to delete.
     */
    selectAllTasks() {
        dailyTasksDeleteModeComponent.selectAll();
    }

    /**
     * @function deselectAllTasks
     * Deselect all tasks to delete.
     */
    deselectAllTasks() {
        dailyTasksDeleteModeComponent.deselectAll();
    }
}

/** Export DailyListModule to render taskList component on task-list page. */
export const dailyListComponent = new DailyListComponent({
    selector: 'daily-list-component',
    template: `
    <div class="daily__list">
    <div class="navigation nav-tasks">
    <div class="lists-delete">
      <a href="#" id="to-do-tasks" class="select_allTasks">Select All</a>
      <span> | </span>
      <a href="#" class="deselect_allTasks">Deselect All</a>
      </div>
    <div class="lists-info-daily">
      <a href="#" id="to-do-tasks" class="to-do-tasks">To Do</a>
      <span> | </span>
      <a href="#" class="done-tasks">Done</a>
      </div>
    </div>
    <daily-empty-component></daily-empty-component>
    <daily-tasks-component></daily-tasks-component>
  </div>
    `
});