import { WFMComponent, bootstrap } from '../../../framework/index'
import { Router } from '../../router';
import { globalListComponent } from '../tasks-list/tasks-data/global-list/global-list';
import { Fierbase } from '../../../framework/core/shared/firebase';
import { timerModule, timerDataModule } from '.';
const Handlebars = require("handlebars");
import $ from "jquery";
import './timer.less';
import Timer from '../../../framework/core/shared/timer';
import { tasksHeaderComponent } from '../../components/task-list-header/task-list.header';
import Options from '../../../framework/core/shared/Options';
import { Toast } from '../../../framework/core/shared/Toast';
import {
  notificationsComponent
} from '../../components/notifications-component/notifications-component';
require('./timer.less');

/**
 * @class TimerComponent
 * @extends WFMComponent
 */
class TimerComponent extends WFMComponent {

  timerData = new Timer(0, 8, 3, 15, []);
  notify = new Options('info', "", 3000)
  animation;
  myCounter;
  rest = true;

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
      'click .start-task': 'startTimer',
      'click .finish-pomodora': 'finishPomodora',
      'click .fail-pomodora': 'failPomodora',
      'click .start-pomodora': 'startPomodora',
      'click .finish-task': 'finishTask'
    }
  }

  /**
   * @function onInit
   * Initialize render of component.
   */
  onInit() {
    Fierbase.init();
    this.setTimerData();
  }

  /**
   * @function afterInit
   * Initialize functions that should compile after @function onInit .
   */
  afterInit() {
    Toast.init();
    bootstrap(timerModule);
    bootstrap(timerDataModule);
    let dataForTimer = [];
    dataForTimer = JSON.parse(localStorage.getItem("timerData"));
    this.colorTimerByCategory(dataForTimer.category);
  }

  /**
   * @function colorTimerByCategory
   * Color border of timer relatively to catagoty of the task.
   * @param {String} category - Category of task to set color of timer.
   */
  colorTimerByCategory(category) {
    let colorTimer = document.getElementsByClassName("timer-item__inner")[0];
    if (category === "Work") {
      colorTimer.style.border = "2px solid #ffb200";
    } else if (category === "Education") {
      colorTimer.style.border = "2px solid #59abe3";
    } else if (category === "Hobby") {
      colorTimer.style.border = "2px solid #b470d0";
    } else if (category === "Sport") {
      colorTimer.style.border = "2px solid #e16c65";
    } else {
      colorTimer.style.border = "2px solid #00d4d9";
    }
  }

  /**
   * @function setTimerData
   * Set timer data to Options Object .
   */
  setTimerData() {
    let dataForTimer = [];
    dataForTimer = JSON.parse(localStorage.getItem("timerData"));
    let settings = [];
    settings = JSON.parse(localStorage.getItem("settings"));
    this.timerData.roundsTotal = dataForTimer.estimationTotal * 2;
    this.timerData.timeRest = settings.rest_time + ":00";
    this.timerData.timeWork = settings.work_time + ":00";
  }

  /**
   * @function startTimer
   * Start pomodoro task with timer .
   */
  startTimer() {
    let ddoc = document.getElementsByClassName("navigation-start")[0];
    ddoc.style.display = "none";
    ddoc.style.visibility = "hidden"
    let ddoc2 = document.getElementsByClassName("timer--next")[0];
    ddoc2.style.display = "flex";
    ddoc2.style.visibility = "visible"
    this.rest = false;
    window.timer2 = this.timerData.timeWork;
    this.fuuuu();
    this.timeout = setInterval(this.countdownSeconds.bind(this), 1000);
    document.getElementById('min').style.visibility = "visible";
  }

  /**
   * @function countdownSeconds
   * Set countdown seconds.
   */
  async countdownSeconds() {
    document.getElementsByClassName('timer_info')[0].style.fontSize = "70px";
    $(".statistic-back").hide();
    var timer = window.timer2.split(':');
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    $('.timer_info').html(minutes + ':' + seconds);
    window.timer2 = minutes + ':' + seconds;

    if (minutes <= 0 && this.rest == false && seconds <= 0 && this.timerData.roundsLeft < this.timerData.roundsTotal) {
      this.timerData.roundsLeft++;
      this.timerData.trueFalse.push(true);
      bootstrap(timerDataModule);
      window.timer2 = this.timerData.timeRest;
      $('#time').html('0');
      clearInterval(window.myCounter);
      this.fuuuu();
      this.rest = true;
      Toast.init()
      notificationsComponent.infoPomodoroFinished(this.notify);
      Toast.show(this.notify);
      $('.break-name').html('BREAK');
      this.breakButtons();
    } else if (minutes <= 0 && this.rest == true && seconds <= 0 && this.timerData.roundsLeft < this.timerData.roundsTotal) {
      this.timerData.roundsLeft++;
      window.timer2 = this.timerData.timeWork;
      $('#time').html('0');
      clearInterval(window.myCounter);
      this.fuuuu();
      this.rest = false;
      $('.break-name').html('');
      this.workButtons();
    } else if (this.timerData.roundsLeft === this.timerData.roundsTotal) {
      clearInterval(this.timeout);
      $('#time').html('0');
      clearInterval(window.myCounter);
      $('.break-name').html('');
      $('.timer_info').html('You Completed Task');
      $(".statistic-back").show();
      document.getElementsByClassName('timer_info')[0].style.fontSize = "30px";
      $('.pie').css('background-image',
        'linear-gradient(' + 90 + 'deg, transparent 50%, #8DA5B8 50%),linear-gradient(90deg, #8DA5B8 50%, transparent 50%)'
      );
    }
  }

  /**
   * @function fuuuu
   * Animate timer.
   */
  fuuuu() {
    var timer = window.timer2.split(':');
    var minutes = parseInt(timer[0], 10);
    var totaltime = minutes * 60;
    function update(percent) {
      var deg;
      if (percent < (totaltime / 2)) {
        deg = 90 + (360 * percent / totaltime);
        $('.pie').css('background-image',
          'linear-gradient(' + deg + 'deg, transparent 50%, #2a3f50 50%),linear-gradient(90deg, #2a3f50 50%, transparent 50%)'
        );
      } else if (percent >= (totaltime / 2)) {
        deg = -90 + (360 * percent / totaltime);
        $('.pie').css('background-image',
          'linear-gradient(' + deg + 'deg, transparent 50%, #8DA5B8 50%),linear-gradient(90deg, #2a3f50 50%, transparent 50%)'
        );
      }
    }
    var count = parseInt($('#time').text());
    window.myCounter = setInterval(function () {
      count += 1;
      $('#time').html(count);
      update(count);

      if (count == totaltime) {
        $('#time').html('0');
        clearInterval(window.myCounter);
        $('.pie').css('background-image',
          'linear-gradient(' + 90 + 'deg, transparent 50%, #8DA5B8 50%),linear-gradient(90deg, #2a3f50 50%, transparent 50%)'
        );
      }
    }, 1000);
  }


  /**
   * @function finishPomodora
   * Finish pomodora on click button and start break timer.
   */
  finishPomodora() {
    clearInterval(this.timeout);
    this.rest = true;
    this.timerData.roundsLeft++;
    window.timer2 = this.timerData.timeRest;
    this.timerData.trueFalse.push(true);
    bootstrap(timerDataModule);

    $('#time').html('0');
    clearInterval(window.myCounter);
    this.fuuuu();

    this.timeout = setInterval(this.countdownSeconds.bind(this), 1000);
    $('.break-name').html('BREAK');
    this.breakButtons();
    Toast.init()
    notificationsComponent.infoPomodoroFinished(this.notify);
    Toast.show(this.notify);
  }

  /**
   * @function failPomodora
   * Fail current pomodora and start break timer.
   */
  async failPomodora() {
    clearInterval(this.timeout);
    this.rest = true;
    this.timerData.roundsLeft++;
    window.timer2 = this.timerData.timeRest;
    this.timerData.trueFalse.push(false);
    bootstrap(timerDataModule);

    $('#time').html('0');
    clearInterval(window.myCounter);
    this.fuuuu();

    this.timeout = setInterval(this.countdownSeconds.bind(this), 1000);
    $('.break-name').html('BREAK');
    this.breakButtons();
    Toast.init()
    notificationsComponent.infoPomodoroFinished(this.notify);
    Toast.show(this.notify);
  }

  /**
   * @function breakButtons
   * Set visible breakButtons.
   */
  breakButtons() {
    let ddoc = document.getElementsByClassName("timer--next")[0];
    ddoc.style.display = "none";
    ddoc.style.visibility = "hidden"
    let ddoc2 = document.getElementsByClassName("timer--finish")[0];
    ddoc2.style.display = "flex";
    ddoc2.style.visibility = "visible"
  }

  /**
   * @function workButtons
   * Set visible workButtons .
   */
  workButtons() {
    let ddoc = document.getElementsByClassName("timer--finish")[0];
    ddoc.style.display = "none";
    ddoc.style.visibility = "hidden"
    let ddoc2 = document.getElementsByClassName("timer--next")[0];
    ddoc2.style.display = "flex";
    ddoc2.style.visibility = "visible"
  }

  /**
   * @function startPomodora
   * Start next pomodoro timer.
   */
  startPomodora() {
    clearInterval(this.timeout);
    this.rest = false;
    this.timerData.roundsLeft++;
    window.timer2 = this.timerData.timeWork;
    $('#time').html('0');
    clearInterval(window.myCounter);
    this.fuuuu();
    this.timeout = setInterval(this.countdownSeconds.bind(this), 1000);
    $('.break-name').html('');
    this.workButtons();
  }

  /**
   * @function finishTask
   * Finish task earlier.
   */
  async finishTask() {
    clearInterval(this.timeout);
    $('#time').html('0');
    clearInterval(window.myCounter);
    $('.pie').css('background-image',
      'linear-gradient(' + 90 + 'deg, transparent 50%, #8DA5B8 50%),linear-gradient(90deg, #8DA5B8 50%, transparent 50%)'
    );

    this.timerData.roundsLeft = this.timerData.roundsTotal;
    while (this.timerData.trueFalse.length < this.timerData.roundsLeft / 2) {
      this.timerData.trueFalse.push(false);
    }
    bootstrap(timerDataModule)
    $('.break-name').html('');
    $('#min').css('visibility', 'hidden');
    document.getElementsByClassName('timer_info')[0].style.fontSize = "30px";
    $('.timer_info').html(`You <br> Completed <br> Task`);
    let ddoc = document.getElementsByClassName("timer--finish")[0];
    ddoc.style.display = "none";
    ddoc.style.visibility = "hidden";
    $(".statistic-back").show();
    var numItems = $('.done-pomodoro').length;
    let id = localStorage.getItem("id");
    let dataToUpdate = [];
    dataToUpdate.push(JSON.parse(localStorage.getItem("timerData"))) || [];
    Toast.init();
    if (await Fierbase.updateTaskToCompleted(id, numItems, dataToUpdate[0].estimationTotal)) {
      notificationsComponent.finishedPomodoro(this.notify);
      Toast.show(this.notify);
    } else {
      notificationsComponent.timerError(this.notify);
      Toast.show(this.notify);
    }
  }

}

/** Export TimerComponent to render timer page. */
export const timerComponent = new TimerComponent({
  selector: 'timer-component',
  template: `
    <main class="main">
    <div class="container timer__container">
      <div class="timer-task timer-task-name">
        <timer-data-component></timer-data-component>
      </div>
      <timer-set-component></timer-set-component>
      <div class="button-navigation navigation-start">
        <button class="start-task">Start</button>
      </div>
      <div class="buttons-navigation navigation-timer timer--next">
        <button class="fail-pomodora">Fail Pomodora</button>
        <button class="finish-pomodora">Finish Pomodora</button>
      </div>
      <div class="buttons-navigation navigation-timer timer--finish">
        <button class="start-pomodora">Start Pomodora</button>
        <button class="finish-task">Finish Task</button>
      </div>
    </div>
  </main>
    `
});

function sum(a, b) {
  return a + b;
}