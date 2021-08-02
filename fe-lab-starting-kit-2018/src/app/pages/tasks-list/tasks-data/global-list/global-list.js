import { WFMComponent, bootstrap } from '../../../../../framework/index'
import { Router } from '../../../../router'
import { Fierbase } from '../../../../../framework/core/shared/firebase'
import Task from '../../../../../framework/core/shared/Tasks';
import { Toast } from '../../../../../framework/core/shared/Toast';
const Handlebars = require("handlebars");
import "@babel/polyfill";
import Options from '../../../../../framework/core/shared/Options';
import {
    notificationsComponent
} from '../../../../components/notifications-component/notifications-component';
import { tasksListModule } from '../..';
import { dailyListModule } from '../daily-list';
import { editComponent } from '../../../../components/edit-task-component/edit-task-component';

/**
 * @class GlobalListComponent
 * @extends WFMComponent
 */
class GlobalListComponent extends WFMComponent {
    notify = new Options('info', "", 3000);

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of GlobalListComponent.
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
            'click .allGlobal': 'getAllTasks',
            'click .urgentGlobal': 'getUrgentTasks',
            'click .highGlobal': 'getHighTasks',
            'click .middleGlobal': 'getMiddleTasks',
            'click .lowGlobal': 'getLowTasks',
            'click .global': 'openGlobalList'
        }
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        Toast.init();
        Fierbase.init();
        if (sessionStorage.getItem('globalList') == null) {
            sessionStorage.setItem('globalList', "all");
            this.getAll(sessionStorage.getItem('globalList'));
        } else {
            this.getAll(sessionStorage.getItem('globalList'));
        }
        var modal = document.getElementById("myModal-edit");
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        const starAr = [].slice.call(document.querySelectorAll('[data-ratingedit]')).reverse();

        starAr.forEach((el) => {
            el.addEventListener('click', (e) => {
                const rating = e.target.dataset.ratingedit;
                document.getElementById('star-rating').dataset.stars = rating;

                for (let i = starAr.length; i-- > 0;) {
                    starAr[i].classList.remove('star');
                    starAr[i].src = "/images/estimation-checked.png"
                }

                for (let i = rating; i-- > 0;) {
                    starAr[i].classList.add('star');
                    starAr[i].src = "/images/estimation-notchecked.png"
                }
            })
        })
    }


    /**
     * @function openGlobalList
     * Open global list on click.
     */
    openGlobalList() {
        document.getElementById('global-rotate').style.transform = 'rotate(90deg)';
        document.getElementsByClassName('global__menu')[0].style.visibility = 'visible';
        document.getElementsByClassName('allDataGlobal')[0].style.visibility = 'visible';
    }

    /**
     * @function openTimer 
     * Go to settings component.  
     * @param {string} el - id of current task.
     */
    async openTimer(el) {
        window.timer = el;
        let info = await Fierbase.getDataToEdit(el);
        localStorage.setItem("timerData", JSON.stringify(info.data()));
        localStorage.setItem("id", el);
        let settings = await Fierbase.getSettingsForTimer();
        localStorage.setItem("settings", JSON.stringify(settings));
        Router.navigate('timer');
    }

    /**
     * @function getUrgentTasks
     * Get tasks with priority urgent.
     */
    async getUrgentTasks() {
        let priority = "Urgent";
        sessionStorage.setItem('globalList', priority);
        this.getWorkTasks(priority);
        this.getOtherTasks(priority);
        this.getEducationTasks(priority);
        this.getHobbyTasks(priority);
        this.getSportTasks(priority);
    }

    /**
     * @function getMiddleTasks 
     * Get tasks with priority middle.
     */
    async getMiddleTasks() {
        let priority = "Middle";
        sessionStorage.setItem('globalList', priority);
        this.getWorkTasks(priority);
        this.getOtherTasks(priority);
        this.getEducationTasks(priority);
        this.getHobbyTasks(priority);
        this.getSportTasks(priority);
    }

    /**
     * @function getHighTasks
     * Get tasks with priority high.
     */
    async getHighTasks() {
        let priority = "High";
        sessionStorage.setItem('globalList', priority);
        this.getWorkTasks(priority);
        this.getOtherTasks(priority);
        this.getEducationTasks(priority);
        this.getHobbyTasks(priority);
        this.getSportTasks(priority);
    }

    /**
     * @function getLowTasks 
     * Get tasks with priority low.
     */
    async getLowTasks() {
        let priority = "Low";
        sessionStorage.setItem('globalList', priority);
        this.getWorkTasks(priority);
        this.getOtherTasks(priority);
        this.getEducationTasks(priority);
        this.getHobbyTasks(priority);
        this.getSportTasks(priority);
    }

    /**
     * @function getAllTasks 
     * Get all tasks by priority.
     */
    async getAllTasks() {
        let priority = "all";
        sessionStorage.setItem('globalList', priority);
        this.getWorkTasks(priority);
        this.getOtherTasks(priority);
        this.getEducationTasks(priority);
        this.getHobbyTasks(priority);
        this.getSportTasks(priority);
    }

    /**
     * @function getAll
     * Get all tasks by priority.  
     * @param {string} priority - priority tasks.
     */
    async getAll(priority) {
        this.getWorkTasks(priority);
        this.getOtherTasks(priority);
        this.getEducationTasks(priority);
        this.getHobbyTasks(priority);
        this.getSportTasks(priority);
    }

    /**
     * @function getHobbyTasks
     * Render hobby tasks by priority.
     * @param {string} priotity - priority task.
     */
    async getHobbyTasks(priotity) {
        let countTasks = await Fierbase.checkTasksByCategory("Hobby", priotity);
        let other = document.getElementsByClassName("hobby-list")[0];
        other.innerHTML = '';
        if (countTasks > 0) {
            other.insertAdjacentHTML('beforeend', `
        <div class="ping_about">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                fill="#b470d0" />
              <path
                d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                fill="#2A3F50" />
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                fill="#b470d0" />
            </svg>
            <p class="color-category--hobby">HOBBY</p>
        </div>
        <div class="list list-hobby-data">
        </div>
        `);
            document.getElementsByClassName("color-category--hobby")[0].style.color = '#b470d0';
            let otherList = document.getElementsByClassName("list-hobby-data")[0]
            let tokenShapshot = await Fierbase.getTasksByCategory("Hobby", priotity);
            this.getTasksByCategory(tokenShapshot, otherList)
        } else {
            console.log("no tasks Hobby");
        }
    }

    /**
     * @function getSportTasks
     * Render sport tasks by priority.
     * @param {string} priotity - priority task.
     */
    async getSportTasks(priotity) {
        let countTasks = await Fierbase.checkTasksByCategory("Sport", priotity);
        let other = document.getElementsByClassName("sport-list")[0];
        other.innerHTML = '';
        if (countTasks > 0) {
            other.insertAdjacentHTML('beforeend', `
        <div class="ping_about">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                fill="#e16c65" />
              <path
                d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                fill="#2A3F50" />
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                fill="#e16c65" />
            </svg>
            <p class="color-category--sport">SPORT</p>
          </div>
        <div class="list list-sport-data">
        </div>
        `);
            document.getElementsByClassName("color-category--sport")[0].style.color = '#e16c65';
            let otherList = document.getElementsByClassName("list-sport-data")[0]
            let tokenShapshot = await Fierbase.getTasksByCategory("Sport", priotity);
            this.getTasksByCategory(tokenShapshot, otherList)
        } else {
            console.log("no tasks sport");
        }
    }

    /**
     * @function getEducationTasks 
     * Render education tasks by priority.
     * @param {string} priotity - priority task.
     */
    async getEducationTasks(priotity) {
        let countTasks = await Fierbase.checkTasksByCategory("Education", priotity);
        let other = document.getElementsByClassName("education-list")[0];
        other.innerHTML = '';
        if (countTasks > 0) {
            other.insertAdjacentHTML('beforeend', `
        <div class="ping_about">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                fill="#59abe3" />
              <path
                d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                fill="#2A3F50" />
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                fill="#59abe3" />
            </svg>
            <p class="color-category--education">EDUCATION</p>
          </div>
          <div class="list list-education-data">
          </div>
        `);
            document.getElementsByClassName("color-category--education")[0].style.color = '#59abe3';
            let otherList = document.getElementsByClassName("list-education-data")[0]
            let tokenShapshot = await Fierbase.getTasksByCategory("Education", priotity);
            this.getTasksByCategory(tokenShapshot, otherList)
        } else {
            console.log("no tasks Education");
        }
    }

    /**
     * @function getWorkTasks
     * Render work tasks by priority.
     * @param {string} priotity - priority task.
     */
    async getWorkTasks(priotity) {
        let countTasks = await Fierbase.checkTasksByCategory("Work", priotity);
        let other = document.getElementsByClassName("work-list")[0];
        other.innerHTML = '';
        if (countTasks > 0) {
            other.insertAdjacentHTML('beforeend', `
        <div class="ping_about">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
              fill="#FFB202" />
            <path
              d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
              fill="#2A3F50" />
            <path
              d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
              fill="#FFB202" />
          </svg>
          <p class="color-category--work">WORK</p>
        </div>
        <div class="list list-work-data">
        </div>
        `);
            document.getElementsByClassName("color-category--work")[0].style.color = '#FFB202';
            let otherList = document.getElementsByClassName("list-work-data")[0]
            let tokenShapshot = await Fierbase.getTasksByCategory("Work", priotity);
            this.getTasksByCategory(tokenShapshot, otherList)
        } else {
            console.log("no tasks Work");
        }
    }

    /**
     * @function getOtherTasks 
     * Render other tasks by priority.
     * @param {string} priotity - priority task.
     */
    async getOtherTasks(priotity) {
        let countTasks = await Fierbase.checkTasksByCategory("Other", priotity);
        let other = document.getElementsByClassName("other-list")[0];
        other.innerHTML = '';
        if (countTasks > 0) {
            other.insertAdjacentHTML('beforeend', `<div class="ping_about">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                    fill="#00d4d9" />
                  <path
                    d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                    fill="#2A3F50" />
                  <path
                    d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                    fill="#00d4d9" />
                </svg>
                <p class="color-category--other">OTHER</p>
              </div>
              <div class="list list-other-data">
              </div>`);

            document.getElementsByClassName("color-category--other")[0].style.color = '#00d4d9';
            let otherList = document.getElementsByClassName("list-other-data")[0]
            let tokenShapshot = await Fierbase.getTasksByCategory("Other", priotity);
            this.getTasksByCategory(tokenShapshot, otherList)
        } else {
            console.log("no tasks Other")
        }
    }

    /**
     * @function getPriorityOfTask 
     * Color tasks due to thair priority.  
     * @param {string} priority - priority of current task.
     * @param {object} block - block to color.
     * @param {text} text - text to color.
     */
    getPriorityOfTask(priority, block, text) {
        if (priority === "High") {
            block.style.backgroundColor = '#FFA841'
            text.style.color = '#FFA841'
        } else if (priority === "Urgent") {
            block.style.backgroundColor = '#F75C4C'
            text.style.color = '#F75C4C'
        } else if (priority === "Middle") {
            block.style.backgroundColor = '#FDDC43'
            text.style.color = '#FDDC43'
        } else {
            block.style.backgroundColor = '#1ABC9C'
            text.style.color = '#1ABC9C'
        }
    }

    /**
     * @function deleteOnClick 
     * DeleteTask on click by id of the task.  
     * @param {string} el - id of current task.
     */
    deleteOnClick = async(el) => {
        if (await Fierbase.deleteTask(el)) {
            notificationsComponent.successRemoveTask(this.notify);
            Toast.show(this.notify);
            bootstrap(tasksListModule)
        } else {
            notificationsComponent.errorRemovingTask(this.notify);
            Toast.show(this.notify)
        }
    }

    /**
     * @function upDailyOnClick
     * Move to daily task list task on click.  
     * @param {string} el - id of current task.
     */
    upDailyOnClick = async(el) => {
        if (await Fierbase.updateTasksToDaily(el)) {
            bootstrap(dailyListModule)
            notificationsComponent.infoMovedToDaily(this.notify);
            Toast.show(this.notify);
        } else {
            notificationsComponent.errorMoveToDaily(this.notify);
            Toast.show(this.notify)
        }
    }

    /**
     * @function dayTimeStamp 
     * Return date due to timestamp from firebase.  
     * @param {timestamp} UNIX_timestamp - timestamp of task.
     */
    dayTimeStamp(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var date = a.getDate();
        var time = date;
        return time;
    }

    /**
     * @function monthTimeStamp 
     * Return month due to timestamp from firebase.  
     * @param {timestamp} UNIX_timestamp - timestamp of task.
     * @returns {string} - month from timestamp. 
     */
    monthTimeStamp(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var time = month;
        return time;
    }

    /**
     * @function timeConverter 
     * Return date due to timestamp from firebase.  
     * @param {timestamp} UNIX_timestamp - timestamp of task.
     * @returns {Date} - date in format local datetime. 
     */
    timeConverter(UNIX_timestamp) {
        Number.prototype.AddZero = function(b, c) {
            var l = (String(b || 10).length - String(this).length) + 1;
            return l > 0 ? new Array(l).join(c || '0') + this : this;
        }
        var a = new Date(UNIX_timestamp * 1000);
        var localDateTime = [(a.getMonth() + 1).AddZero(),
            a.getDate().AddZero(),
            a.getFullYear()
        ].join('/') + ', ' + [a.getHours().AddZero(),
            a.getMinutes().AddZero()
        ].join(':');
        return localDateTime;
    }

    /**
     * @function getTasksByCategory 
     * Render tasks due to their category.  
     * @param {Object} tokenShapshot - array of tasks.
     * @param {Object} list - block for implement.
     */
    getTasksByCategory(tokenShapshot, list) {
        const notificationPromises = tokenShapshot.map(doc => {
            let firstTask = document.createElement('div');
            firstTask.className = 'box first__box';
            let listBox = document.createElement('div');
            listBox.className = 'list__box';
            let tomato_level = document.createElement('div');
            tomato_level.className = 'tomato__level';
            let dateBox = document.createElement('div');
            dateBox.className = 'box-date';
            let boxInfo = document.createElement('div');
            boxInfo.className = 'box-info';
            let boxChange = document.createElement('div');
            boxChange.className = 'box-change';
            let date = document.createElement('p');
            date.className = 'red-date';
            date.innerHTML = this.dayTimeStamp(doc.data().deadline.seconds) + " ";
            let spanDate = document.createElement('span');
            spanDate.innerHTML = this.monthTimeStamp(doc.data().deadline.seconds);
            let title = document.createElement('h3');
            title.innerHTML = doc.data().title;
            let description = document.createElement('p');
            description.innerHTML = doc.data().description;
            let upTask = document.createElement('a');
            upTask.href = '#';
            upTask.id = doc.id;
            upTask.addEventListener('click', () => {
                this.upDailyOnClick(upTask.id);
            });
            let upSvg = document.createElement('img');
            upSvg.src = '/images/arrow.svg';
            upSvg.alt = 'up Task to List';
            let editTask = document.createElement('a');
            editTask.href = '#';
            editTask.id = doc.id;
            editTask.addEventListener('click', () => {
                this.editOnClick(editTask.id);
            });
            let editSvg = document.createElement('img');
            editSvg.src = '/images/edit.svg';
            editSvg.alt = 'edit Task';
            let deleteTask = document.createElement('a');
            deleteTask.href = '#';
            deleteTask.id = doc.id;
            deleteTask.addEventListener('click', () => {
                this.deleteOnClick(deleteTask.id);
            });
            let deleteSvg = document.createElement('img');
            deleteSvg.src = '/images/trashbox.svg';
            deleteSvg.alt = 'delete Task';
            let boxTomato = document.createElement('div');
            boxTomato.className = 'box-tomato';
            boxTomato.addEventListener('click', () => {
                this.openTimer(editTask.id);
            });
            let p = document.createElement('p');
            let estimation = document.createElement('span');
            estimation.innerHTML = doc.data().estimationTotal;
            let hrefTomato = document.createElement('a');
            let tomatoImg = document.createElement('img');
            tomatoImg.src = '/images/white.png';
            tomatoImg.alt = 'tomato Image estimation';
            this.getPriorityOfTask(doc.data().priority, tomato_level, title);
            hrefTomato.append(tomatoImg);
            boxTomato.append(hrefTomato);
            p.append(estimation);
            tomato_level.append(boxTomato, p);
            upTask.append(upSvg);
            editTask.append(editSvg);
            deleteTask.append(deleteSvg);
            boxChange.append(upTask, editTask, deleteTask);
            boxInfo.append(title, description);
            date.append(spanDate);
            dateBox.append(date);
            listBox.append(dateBox, boxInfo, boxChange);
            firstTask.append(listBox, tomato_level);
            list.append(firstTask);
        });
    }

    /**
     * @function editOnClick
     * Pass data of current task to mal window.  
     * @param {string} el - id of current task.
     */
    editOnClick = async(el) => {
        editComponent.editOnClick(el);
    }

    /**
     * @function updateTaskOnClick 
     * Update task from modalWindow onClick.  
     */
    async updateTaskOnClick() {
        let title = document.getElementsByClassName('input--title__edit')[0].value;
        let description = document.getElementsByClassName('input--description__edit')[0].value;
        let category = document.querySelector('input[name="det"]:checked').value;
        let deadline = document.getElementsByClassName('input--date__edit')[0].value;
        let estimation = 10 - Number(document.getElementsByClassName('star').length);
        let priority = document.querySelector('input[name="priority"]:checked').value;
        let task = new Task(title, description, new Date(Date.now()), null, new Date(deadline), false, estimation, null, priority, category);
        if (await Fierbase.updateTask(task, document.getElementsByClassName("update_task")[0].id)) {
            notificationsComponent.successSaveTask(this.notify);
            Toast.show(this.notify);
            document.getElementById("myModal-addd").style.display = "none";
            bootstrap(tasksListModule);
        } else {
            notificationsComponent.errorTaskCreateEdit(this.notify);
            Toast.show(this.notify);
        }
    }

    /**
     * @function closeModal
     * Close modal window.
     */
    closeModal() {
        var modal = document.getElementById("myModal-addd");
        modal.style.display = "none";
    }
}

/** Export GlobalListModule to render taskList component on task-list page. */
export const globalListComponent = new GlobalListComponent({
    selector: 'global-list-component',
    template: `
    <div class="container">
      <div class="main__global-list">
        <div class="global">
          <p>Global List</p>
          <svg id="global-rotate" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="icon" fill-rule="evenodd" clip-rule="evenodd"
              d="M2.87549 0.75L0.25 3.39299L3.8689 7.036L0.294556 10.6342L2.89283 13.2497L8.95547 7.14671L8.8628 7.05342L9 6.9153L2.87549 0.75Z"
              fill="#8DA5B8" />
          </svg>
        </div>
        <div class="global__menu">
          <p class="allGlobal">All</p>
          <span>|</span>
          <p class="urgentGlobal">Urgent</p>
          <span>|</span>
          <p class="highGlobal">High</p>
          <span>|</span>
          <p class="middleGlobal">Middle</p>
          <span>|</span>
          <p class="lowGlobal">Low</p>
        </div>
      </div>
      <div class="allDataGlobal">
      <div class="work-list">
      </div>
      <div class="education-list">
      </div>
      <div class="hobby-list">
      </div>
      <div class="sport-list">
      </div>
      <div class="other-list">
      </div>
      </div>
      </div>      
      </div>
    `
});