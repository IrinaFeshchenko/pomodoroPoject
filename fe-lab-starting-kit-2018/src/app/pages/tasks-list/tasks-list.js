import { WFMComponent } from '../../../framework/index';
import { bootstrap } from "../../../framework/core/bootstrap"
import { Fierbase } from '../../../framework/core/shared/firebase'
import 'firebase/firestore'
import { emptyModule, firstVisitModule, tasksListModule } from '.';
require('./tasks-list.less');

/**
 * @class TaskListComponent
 * @extends WFMComponent
 */
class TaskListComponent extends WFMComponent {

  /**
    * Constructor extends from WFMComponent.
    * @param  {WFMComponent} config - Constructor of TaskListComponent.
    */
  constructor(config) {
    super(config);
  }

  /**
    * @function onInit
    * Initialize render of component.
    */
  onInit() {
    Fierbase.init();
    window.onload = function () {
      sessionStorage.removeItem('deleteItems');
    }
  }

  /**
    * @function afterInit
    * Initialize functions that should compile after @function onInit .
    */
  async afterInit() {
    if (sessionStorage.getItem('isNewUser') == null) {
      bootstrap(firstVisitModule);
      sessionStorage.setItem('isNewUser', true);
    } else if (await this.checkTasks() <= 0) {
      bootstrap(emptyModule);
    } else {
      bootstrap(tasksListModule);
    }
  }

  /**
    * @function checkTasks
    * Check tasks to render correct component.
    * @returns {Number} - count of tasks in firestore. 
    */
  async checkTasks() {
    var myVal = await Fierbase.checkTasks();
    return myVal;
  }
}

/** Export TaskListModule to render taskList component on task-list page. */
export const taskListComponent = new TaskListComponent({
  selector: 'app-task-list-page',
  template: `
    <main class="main" id="main">
    <div class="container">
      <first-time-component></first-time-component>
      <empty-tasks-component></empty-tasks-component>
    </div>
    <tasks-data-component></tasks-data-component>
  </main>
    `
})