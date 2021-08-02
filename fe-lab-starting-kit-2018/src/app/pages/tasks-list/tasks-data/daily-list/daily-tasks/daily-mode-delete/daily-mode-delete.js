import { WFMComponent, bootstrap } from '../../../../../../../framework/index'
import { Fierbase } from '../../../../../../../framework/core/shared/firebase'
import "@babel/polyfill";
import $ from "jquery";
import {
    notificationsComponent
} from '../../../../../../components/notifications-component/notifications-component';
import { Toast } from '../../../../../../../framework/core/shared/Toast';
import Options from '../../../../../../../framework/core/shared/Options';
import { deleteModeListModule } from '..';
import { editComponent } from '../../../../../../components/edit-task-component/edit-task-component';

/**
 * @class DailyTasksDeleteModeComponent
 * @extends WFMComponent
 */
class DailyTasksDeleteModeComponent extends WFMComponent {
    notify = new Options('info', "", 3000);


    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of GlobalListComponent.
     */
    constructor(config) {
        super(config);
    }

    onInit() {
        document.getElementsByClassName('lists-delete')[0].style.visibility = 'inherit'
        this.getHobbyTasks();
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        Toast.init();
        Fierbase.init();
    }

    /**
     * @function deleteListAdd
     * Add task to array of delete.  
     * @param {string} el - id of current task.
     */
    deleteListAdd = (el) => {
        if (this.checkGetSessionDelete(el) === false) {
            this.saveDataToLocalStorage(el);
            this.countTasksToDelete();
            let data = document.getElementsByClassName('delData');
            let a = [];
            a = JSON.parse(sessionStorage.getItem('deleteItems')) || [];
            for (let j = 0; j < a.length; j++) {
                for (let i = 0; i < data.length; i < i++) {
                    if (a[j] === data[i].id) {
                        data[i].src = "/images/delData.png";
                    }
                }
            }
        } else {
            console.log("data edit");
        }
    }

    /**
     * @function selectAll
     * Add all task to delete.  
     */
    selectAll() {
        let that = this;
        var ids = $('.delData').map(function(index) {
            if (that.checkGetSessionDelete(this.id) === false) {
                that.saveDataToLocalStorage(this.id);
                that.countTasksToDelete();
            } else {
                console.log("data edit");
            }
        });
        let data = document.getElementsByClassName('delData');
        let a = [];
        a = JSON.parse(sessionStorage.getItem('deleteItems')) || [];
        for (let j = 0; j < a.length; j++) {
            for (let i = 0; i < data.length; i < i++) {
                if (a[j] === data[i].id) {
                    data[i].src = "/images/delData.png";
                }
            }
        }
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
     * @function selectAll
     * Deselect all task from deleting.  
     */
    deselectAll() {
        sessionStorage.removeItem('deleteItems');
        let data = document.getElementsByClassName('delData');
        this.countTasksToDelete();
        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data.length; i < i++) {
                data[i].src = "/images/trash.svg";
            }
        }
    }

    /**
     * @function countTasksToDelete
     * Count all task to delete.  
     */
    countTasksToDelete() {
        let a = [];
        a = JSON.parse(sessionStorage.getItem('deleteItems')) || [];
        let del = document.getElementsByClassName('count')[0];
        del.innerHTML = a.length;
    }

    /**
     * @function selectAll
     * Count tasks to delete.  
     * @return {Number} - count of tasks.
     */
    countTaskDel() {
        let a = [];
        a = JSON.parse(sessionStorage.getItem('deleteItems')) || [];
        return a.length;
    }

    /**
     * @function returnDeleteList
     * Return all tasks that was selected as for delete.  
     * @return {Array} - array of deleting id.
     */
    returnDeleteList() {
        let a = [];
        a = JSON.parse(sessionStorage.getItem('deleteItems')) || [];
        return a;
    }

    /**
     * @function checkGetSessionDelete
     * Check that task was added to delete array.  
     * @return {Boolean} - true or false.
     */
    checkGetSessionDelete(id) {
        let a = [];
        a = JSON.parse(sessionStorage.getItem('deleteItems')) || [];
        let check = false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] === id) {
                check = true;
            }
        }
        return check;
    }

    /**
     * @function getHobbyTasks
     * Render tasks to deleteComponent.  
     */
    async getHobbyTasks() {
        let countTasks = await Fierbase.checkDailyTasks();
        let other = document.getElementsByClassName("list")[0];
        other.innerHTML = '';
        if (countTasks > 0) {
            let tokenShapshot = await Fierbase.getDailyTasks();
            this.getTasksByCategory(tokenShapshot, other)
        } else {
            console.log("no tasks");
        }
    }

    /**
     * @function saveDataToLocalStorage
     * Save data to delete array.  
     * @param {string} data - id of task.
     */
    saveDataToLocalStorage(data) {
        let a = [];
        a = JSON.parse(sessionStorage.getItem('deleteItems')) || [];
        a.push(data);
        sessionStorage.setItem('deleteItems', JSON.stringify(a));
    }

    /**
     * @function checkGetSessionDelete
     * Check that task was added to delete array. 
     * @param {String} priority - priority of task.
     * @param {Object} block - block to coreect colors.
     * @param {Object} text - color text of block.
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
     * @function colorBorderCategory
     * Check that task was added to delete array. 
     * @param {String} category - category of task.
     * @param {Object} block - block to coreect colors.
     */
    colorBorderCategory(category, block) {
        if (category === "Work") {
            block.style.backgroundColor = "#ffb200";
        } else if (category === "Education") {
            block.style.backgroundColor = "#59abe3";
        } else if (category === "Hobby") {
            block.style.backgroundColor = "#b470d0";
        } else if (category === "Sport") {
            block.style.backgroundColor = "#e16c65";
        } else {
            block.style.backgroundColor = "#00d4d9";
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
            bootstrap(deleteModeListModule)
        } else {
            notificationsComponent.errorRemovingTask(this.notify);
            Toast.show(this.notify)
        }
    }

    /**
     * @function getTasksByCategory 
     * Render tasks due to their category.  
     * @param {Object} tokenShapshot - array of tasks.
     * @param {Object} list - block for implement.
     */
    getTasksByCategory(tokenShapshot, list) {
        const notificationPromises = tokenShapshot.map(doc => {
            let getDate = (Date.parse(doc.data().createdDate.toDate().toDateString()) / 1000);
            let nowDate = new Date(Date.now()).setHours(0, 0, 0, 0) / 1000;
            if (getDate === nowDate && doc.data().estimationTotal != doc.data().estimationUsed) {
                let firstTask = document.createElement('div');
                firstTask.className = 'box';
                let listBox = document.createElement('div');
                listBox.className = 'list__box';
                let tomato_level = document.createElement('div');
                tomato_level.className = 'tomato__level';
                let dateBox = document.createElement('div');
                dateBox.style.display = "flex";
                dateBox.style.height = "100%";
                dateBox.style.justifyContent = "cloumn";
                dateBox.style.alignItems = "center";
                dateBox.className = 'box-date';
                let boxInfo = document.createElement('div');
                boxInfo.className = 'box-info';
                let boxChange = document.createElement('div');
                boxChange.className = 'box-change';
                let date = document.createElement('img');
                date.src = '/images/trash.svg';
                date.id = doc.id;
                date.addEventListener('click', () => {
                    this.deleteListAdd(date.id);
                });
                date.className = "delData"
                date.style.width = "40px";
                date.style.height = "40px";
                date.style.display = "block";
                date.style.marginLeft = "auto";
                date.style.marginRight = "auto";
                let title = document.createElement('h3');
                title.innerHTML = doc.data().title;
                let description = document.createElement('p');
                description.innerHTML = doc.data().description;
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
                let p = document.createElement('p');
                let estimation = document.createElement('span');
                estimation.innerHTML = doc.data().estimationTotal;
                let hrefTomato = document.createElement('a');
                hrefTomato.href = '#';
                let tomatoImg = document.createElement('img');
                tomatoImg.src = '/images/white.png';
                tomatoImg.alt = 'tomato Image estimation';
                this.getPriorityOfTask(doc.data().priority, tomato_level, title);
                this.colorBorderCategory(doc.data().category, dateBox)
                hrefTomato.append(tomatoImg);
                boxTomato.append(hrefTomato);
                p.append(estimation);
                tomato_level.append(boxTomato, p);
                editTask.append(editSvg);
                deleteTask.append(deleteSvg);
                boxChange.append(editTask, deleteTask);
                boxInfo.append(title, description);
                dateBox.append(date);
                listBox.append(dateBox, boxInfo, boxChange);
                firstTask.append(listBox, tomato_level);
                list.append(firstTask)
            }
        });
    }
}

/** Export DailyTaskDeleteModeModule to render taskList delete mode component on task-list page. */
export const dailyTasksDeleteModeComponent = new DailyTasksDeleteModeComponent({
    selector: 'daily-tasks-delete-mode-component',
    template: `
    <div class="list">
    </div>
    `
});