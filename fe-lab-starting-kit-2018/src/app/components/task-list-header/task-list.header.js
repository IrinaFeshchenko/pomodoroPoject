import { WFMComponent, bootstrap } from '../../../framework/index';
import Task from '../../../framework/core/shared/Tasks';
import { Fierbase } from '../../../framework/core/shared/firebase';
import { deleteModeListModule, tasksToDoListModule } from '../../pages/tasks-list/tasks-data/daily-list/daily-tasks';
import {
  dailyTasksDeleteModeComponent
} from '../../pages/tasks-list/tasks-data/daily-list/daily-tasks/daily-mode-delete/daily-mode-delete';
import { Toast } from '../../../framework/core/shared/Toast';
import Options from '../../../framework/core/shared/Options';
import { notificationsComponent } from '../notifications-component/notifications-component';
import { tasksListModule } from '../../pages/tasks-list';
import $ from "jquery";


class TasksHeaderComponent extends WFMComponent {
  notify = new Options('info', "", 3000);
  constructor(config) {
    super(config);
  }
  events() {
    return {
      'click #addBtnModal': 'openModalAdd',
      'click .add': 'addTask',
      'click .deleteMode': 'deleteMode',
      'click .go-remove': 'deleteSelectedTasks',
      'click #openMA': 'open',
      'click .openModalAddBig': 'open'
    }
  }
  onInit() {
  }

  afterInit() {

    window.onscroll = function () { myFunction() };
    var header = document.getElementById("header");
    let image = document.getElementsByClassName('logo2')[0];
    let logo = document.getElementsByClassName('logo')[0];
    let addButton = document.getElementById('addBtnModal');
    let addScrollButton = document.getElementById('openMA');
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        image.style.display = 'block';
        logo.style.display = 'none';
        addButton.style.display = 'none';
        addScrollButton.style.visibility = 'visible';
      } else {
        header.classList.remove("sticky");
        image.style.display = 'none';
        logo.style.display = 'block';
        addButton.style.display = 'block';
        addScrollButton.style.visibility = 'hidden';
      }
    }
    Toast.init();
    const starArr = [].slice.call(document.querySelectorAll('[data-rating]')).reverse();

    starArr.forEach((el) => {
      el.addEventListener('click', (e) => {
        const rating = e.target.dataset.rating;
        document.getElementById('star-rating').dataset.stars = rating;

        for (let i = starArr.length; i-- > 0;) {
          starArr[i].classList.remove('star');
          starArr[i].src = "/images/estimation-checked.png"
        }

        for (let i = rating; i-- > 0;) {
          starArr[i].classList.add('star');
          starArr[i].src = "/images/estimation-notchecked.png"
        }
      })
    });
  }

  deleteMode() {
    if (!sessionStorage.getItem('deleteItems')) {
      let counter = document.createElement('span');
      counter.className = "badge badge-primary count";
      counter.innerHTML = "0";
      let elem = document.getElementsByClassName('deleteMode')[0];
      elem.append(counter);
      sessionStorage.setItem('deleteItems', JSON.stringify(null));
      bootstrap(deleteModeListModule);
    } else {
      if (dailyTasksDeleteModeComponent.countTaskDel() === 0) {
        this.removeCounter();
        sessionStorage.removeItem('deleteItems');
        bootstrap(tasksToDoListModule);
        document.getElementsByClassName('lists-delete')[0].style.visibility = 'hidden'
      } else {
        let modalDelete = document.getElementById("myModal-delete");
        modalDelete.style.display = "block";
      }
    }
  }
  async deleteSelectedTasks() {
    let arrayDelete = dailyTasksDeleteModeComponent.returnDeleteList();
    let a = await Fierbase.deleteListTasks(arrayDelete);
    console.log(a);
    if (a === true) {
      let modalDelete = document.getElementById("myModal-delete");
      modalDelete.style.display = "none";
      sessionStorage.removeItem('deleteItems');
      this.removeCounter();
      bootstrap(tasksToDoListModule);
    } else {
      bootstrap(deleteModeListModule);
    }
  }

  removeCounter() {
    let del = document.getElementsByClassName('count')[0];
    del.remove();
  }

  async addTask() {
    let title = document.getElementsByClassName('input--title')[0].value;
    let description = document.getElementsByClassName('input--description')[0].value;
    let category = document.querySelector('input[name="det"]:checked').value;
    let deadline = document.getElementsByClassName('input--date')[0].value;
    let estimation = 5 - Number(document.getElementsByClassName('star').length);
    let priority = document.querySelector('input[name="priority"]:checked').value;
    let status = null;
    let completedDate = null;
    let task = new Task(title, description, new Date(Date.now()), null, new Date(deadline), false, estimation, null, priority, category, status, completedDate);
    if (await Fierbase.addTask(task)) {
      notificationsComponent.successSaveTask(this.notify);
      Toast.show(this.notify);
      document.getElementById("myModal-add").style.display = "none";
      bootstrap(tasksListModule);
    } else {
      notificationsComponent.errorTaskCreateEdit(this.notify);
      Toast.show(this.notify);
    }
  }
  open() {
    var modal = document.getElementById("myModal-add");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  openModalAdd() {
    var modal = document.getElementById("myModal-add");
    console.log(modal)
    var btn = document.getElementById("addBtnModal");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function () {
      modal.style.display = "block";
    }
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

}

export const tasksHeaderComponent = new TasksHeaderComponent({
  selector: 'settings-header',
  template: `
    <header class="header" id="header">
    <div class="container">
      <div id="menu-header" class="menu-header">
        <div class="menu-header__logo-part">
          <p class="logo logo-daily">Daily Task List</p>
          <img hidden class="logo2" src="../images/logo2.png" alt="do">
          <img id="addBtnModal" class ="openModa" src="/images/add.svg" alt="do">
        </div>
        <div class="menu-header__menu-part">
          <a id="openMA" class ="openAdd">
            <img src="/images/add.svg" class="menu-icons" alt="do" width="24px">
          </a>
          <a class="deleteMode" href="#">
            <img src="../images/trashbox.svg" class="menu-icons" alt="do" width="24px">
          </a>
          <a href="#task-list"><img src="../images/Global_List.svg" class="menu-icons" alt="do"></a>
          <a href="#reports/day/tasks"><img src="../images/stat.svg" class="menu-icons" alt="do"></a>
          <a href="#settings/pomodoros"><img src="../images/settings.svg" class="menu-icons" alt="do"></a>
        </div>
      </div>
    </div>
  </header>
  <div class="menu-second">
        <p class="logo2">Daily Task List</p>
        <img class ="openModalAddBig" src="../images/add.svg" alt="do">
  </div>


  <div id="myModal-add" class="modal">
      <div class="modal-content">
        <span class="close"><img src="/images/close-modal.svg" alt=""></span>
        <span class="add"><img src="/images/add-modal.svg" alt=""></span>
        <div class="modal-form">
          <h2>Add Task</h2>
          <div class="container">
            <div class="modal-form__title modal-form--border">
              <p class="modal-form__title--text">TITLE</p>
              <input class="input-modal input--title" placeholder="Add title here" type="text">
            </div>
            <div class="modal-form__description modal-form--border">
              <p class="modal-form--text">DESCRIPTION</p>
              <input class="input-modal input--description" placeholder="Add description here" type="text">
            </div>
            <div class="modal-form__category modal-form--border">
              <p class="modal-form--text">CATEGORY</p>
              <div class="modal-form__category--radio-list">
                <input type="radio" name="det" value= "Work" class="custom-radio custom-r custom-radio-first" id="happy">
                <label for="happy">Work</label>
                <input type="radio" id="happy1" value= "Education" name="det" class="custom-radio custom-r custom-radio-second">
                <label for="happy1">Education</label>
                <input type="radio" name="det" value="Hobby" id="happy2" class="custom-radio custom-r custom-radio-third">
                <label for="happy2">Hobby</label>
                <input type="radio" value = "Sport" name="det" id="happy3" class="custom-radio custom-r custom-radio-fourth">
                <label for="happy3">Sport</label>
                <input type="radio" value = "Other" name="det" id="happy4" class="custom-radio custom-r custom-radio-fifth">
                <label for="happy4">Other</label>
              </div>
            </div>
            <div class="modal-form__deadline modal-form--border">
              <p class="modal-form--text">DEADLINE</p>
              <input type="datetime-local" class="input-modal input--date" placeholder="May 23, 2021">
            </div>
            <div class="modal-form__estimation modal-form--border">
              <p class="modal-form--text">ESTIMATION</p>
              <div class="modal-form__estimation--radio-list" id="star-rating">
                <img data-rating="4" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-rating="3" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-rating="2" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-rating="1" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-rating="0" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
              </div>
            </div>
            <div class="modal-form__priority modal-form--border">
              <p class="modal-form--text">PRIORITY</p>
              <div class="modal-form__category--radio-list">
                <input type="radio" name="priority" value = "Urgent" class="custom-radio custom-radio-fourth" id="happy5">
                <label for="happy5">Urgent</label>
                <input type="radio" name="priority" value = "High" id="happy6" class="custom-radio custom-radio-second">
                <label for="happy6">High</label>
                <input type="radio" name="priority" value="Middle" id="happy7" class="custom-radio custom-radio-first">
                <label for="happy7">Middle</label>
                <input type="radio" name="priority" value="Low" id="happy8" class="custom-radio custom-radio-third">
                <label for="happy8">Low</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="myModal-delete" class="modal">
      <div class="modal-content">
        <span class="close close2"><img src="/images/close-modal.svg" alt=""></span>
        <div class="modal-form">
          <h2>Remove Task</h2>
          <div class="container">
            <p class="delete-modal--text">Are you sure you want to remove selected task(s)?</p>
          </div>
          <div class="buttons-navigation">
            <button class="go-cancel">Cancel</button>
            <button class="go-remove">Remove</button>
          </div>
        </div>
      </div>
    </div>
    `
});