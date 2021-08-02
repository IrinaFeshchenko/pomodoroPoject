import { WFMComponent, bootstrap } from '../../../../framework/index'
import { Router } from '../../../router';
import { Fierbase } from '../../../../framework/core/shared/firebase';
const Handlebars = require("handlebars");
import $ from "jquery";

/**
 * @class TimerSetComponent
 * @extends WFMModule
 */
class TimerSetComponent extends WFMComponent {

  /**
    * Constructor extends from WFMComponent.
    * @param  {WFMComponent} config - Constructor of TimerComponent.
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
      'click .statistic-day': 'openStatistic',
      'click .task-lists-back': 'openTaskList'
    }
  }

   /**
   * @function onInit
   * Initialize render of component.
   */
  onInit() {
    Fierbase.init();
  }

  /**
   * @function afterInit
   * Initialize functions that should compile after @function onInit .
   */
  afterInit() {
  }

  /**
   * @function openStatistic
   * Route to statistic page.
   */
  openStatistic() {
    Router.navigate('reports/day/tasks')
  }

  /**
   * @function openTaskList
   * Route to task-list page.
   */
  openTaskList() {
    Router.navigate('task-list')
  }

}

/** Export TimerSetComponent to render timer page. */
export const timerSetComponent = new TimerSetComponent({
  selector: 'timer-set-component',
  template: `
  <div class="timer-block">
        <div class="statistic-back task-lists-back">
          <img src="/images/back.png" alt="do">
        </div>
        <div class="timer-item">
          <div class="timer-item__inner">
          <div class="pie degree">
          <span class="block"></span>
          <span class="break-name"></span>
          <p class="val timer_info">Let’s do it!</p>
          <span id="time">0</span>
          <span id="min">min</span>
        </div>
          </div>
        </div>
        <div class="statistic-back statistic-day">
          <img src="/images/back.png" class="none" alt="do">
        </div>
  </div>

    `
});