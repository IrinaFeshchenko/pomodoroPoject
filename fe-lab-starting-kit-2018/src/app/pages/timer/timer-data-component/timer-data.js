import { WFMComponent, bootstrap } from '../../../../framework/index'
import { Router } from '../../../router';
import { Fierbase } from '../../../../framework/core/shared/firebase';
import { timerModule } from '../index';
import { timerComponent } from '../timer';
import { timerDataModule } from '..';
import Options from '../../../../framework/core/shared/Options';
import { Toast } from '../../../../framework/core/shared/Toast';
import { notificationsComponent } from '../../../components/notifications-component/notifications-component';
const Handlebars = require("handlebars");

/**
 * @class TimerDataComponent
 * @extends WFMModule
 */
class TimerDataComponent extends WFMComponent {
  notify = new Options('info', "", 3000);

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
    this.makeTimerData();
    Toast.init();
  }

  /**
   * @function makeTimerData
   * Get task data and pass it to the page.
   */
  makeTimerData() {
    let timerData = JSON.parse(localStorage.getItem('timerData'));
    this.setPartialTimer(timerData);
  }

  /**
   * @function editOnClick
   * Edit estimetion of current task.
   */
  editOnClick = () => {
    let data = JSON.parse(localStorage.getItem("timerData"));
    if (data.estimationTotal < 10) {
      data.estimationTotal++;
      localStorage.setItem("timerData", JSON.stringify(data));
      bootstrap(timerDataModule);
      timerComponent.timerData.roundsTotal = data.estimationTotal;
    } else {
      notificationsComponent.addPomodorosToTaskTimer(this.notify)
      Toast.show(this.notify)
    }
  }

  /**
   * @function setPartialTimer
   * Set data to timer page.
   * @param {Object} data - Task data.
   */
  setPartialTimer(data) {
    let otherList = document.getElementsByClassName("timer-data")[0]
    let timerData = document.createElement('div');
    timerData.className = 'timer-task';
    let timer_name = document.createElement('div');
    timer_name.className = 'timer-task__name';
    let timerDesc = document.createElement('div');
    timerDesc.className = 'timer-task__description'
    let timerEstimation = document.createElement('div');
    timerEstimation.className = 'timer-task__pomodoros';
    let name = document.createElement('h2');
    name.innerHTML = data.title
    let desc = document.createElement('p');
    desc.innerHTML = data.description;
    if (timerComponent.timerData.trueFalse.length === 0) {
      for (let i = 0; i < data.estimationTotal; i++) {
        let tomato_task = document.createElement('img');
        tomato_task.src = '/images/tomato-task.svg';
        timerEstimation.appendChild(tomato_task);
        tomato_task.id = i;
      }
    } else {
      for (let i = 0; i < data.estimationTotal; i++) {
        if (timerComponent.timerData.trueFalse[i] === true) {
          let tomato_task = document.createElement('img');
          tomato_task.src = '/images/done.png';
          timerEstimation.appendChild(tomato_task);
          tomato_task.className = "done-pomodoro"
        } else if (timerComponent.timerData.trueFalse[i] === false) {
          let tomato_task = document.createElement('img');
          tomato_task.src = '/images/failed.png';
          timerEstimation.appendChild(tomato_task);
          tomato_task.id = i;
          tomato_task.className = "failed-pomodoro"
        } else {
          let tomato_task = document.createElement('img');
          tomato_task.src = '/images/tomato-task.svg';
          timerEstimation.appendChild(tomato_task);
          tomato_task.id = i;
        }
      }
    }
    let addEstimation = document.createElement('img');
    addEstimation.className = 'timer-task__pomodoros--add-img';
    addEstimation.src = '/images/add.svg';
    addEstimation.addEventListener('click', () => {
      this.editOnClick();
    });
    timerEstimation.append(addEstimation)
    timerDesc.append(desc)
    timer_name.append(name)
    timerData.append(timer_name, timerDesc, timerEstimation);
    otherList.append(timerData);
  }

}

/** Export TimerDataComponent to render timer page. */
export const timerDataComponent = new TimerDataComponent({
  selector: 'timer-data-component',
  template: `
    <div class="timer-data">
    </div>
    `
});