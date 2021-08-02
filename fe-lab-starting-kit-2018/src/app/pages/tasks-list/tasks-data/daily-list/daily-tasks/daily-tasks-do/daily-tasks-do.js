import { WFMComponent, bootstrap } from '../../../../../../../framework/index'
import { Router } from '../../../../../../router'
import { Fierbase } from '../../../../../../../framework/core/shared/firebase'
import "@babel/polyfill";
import { notificationsComponent } from '../../../../../../components/notifications-component/notifications-component';
import { Toast } from '../../../../../../../framework/core/shared/Toast';
import Options from '../../../../../../../framework/core/shared/Options';
import { tasksToDoListModule } from '..';
import { editComponent } from '../../../../../../components/edit-task-component/edit-task-component';


/**
 * @class DailyTasksToDoComponent
 * @extends WFMComponent
 */
class DailyTasksToDoComponent extends WFMComponent {
    notify = new Options('info', "", 3000);

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of DailyTaskToDoComponent.
     */
    constructor(config) {
        super(config);
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    onInit() {
        this.getHobbyTasks()
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        Fierbase.init();
    }

    /**
     * @function editOnClick
     * Pass data of current task to mal window.  
     * @param {string} el - id of current task.
     */
    editOnClick = async (el) => {
        editComponent.editOnClick(el);
    }

    /**
     * @function deleteOnClick 
     * DeleteTask on click by id of the task.  
     * @param {string} el - id of current task.
     */
    deleteOnClick = async (el) => {
        Toast.init();
        if (await Fierbase.deleteTask(el)) {
            notificationsComponent.successRemoveTask(this.notify);
            Toast.show(this.notify);
            bootstrap(tasksToDoListModule)
        } else {
            notificationsComponent.errorRemovingTask(this.notify);
            Toast.show(this.notify)
        }
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
    * @function getHobbyTasks
    * Render daily tasks.
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
        }
        else if (priority === "Middle") {
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
            block.style.boxShadow = "-8px 0px 0px 0px #ffb200";
        } else if (category === "Education") {
            block.style.boxShadow = "-8px 0px 0px 0px #59abe3";
        } else if (category === "Hobby") {
            block.style.boxShadow = "-8px 0px 0px 0px #b470d0";
        } else if (category === "Sport") {
            block.style.boxShadow = "-8px 0px 0px 0px #e16c65";
        } else {
            block.style.boxShadow = "-8px 0px 0px 0px #00d4d9";
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
            if (getDate === nowDate && doc.data().status === null) {
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
                date.innerHTML = "TODAY"
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
                boxTomato.addEventListener('click', () => {
                    this.openTimer(editTask.id);
                });
                let p = document.createElement('p');
                let estimation = document.createElement('span');
                estimation.innerHTML = doc.data().estimationTotal;
                let hrefTomato = document.createElement('a');
                hrefTomato.href = '#';
                let tomatoImg = document.createElement('img');
                tomatoImg.src = '/images/white.png';
                tomatoImg.alt = 'tomato Image estimation';
                this.getPriorityOfTask(doc.data().priority, tomato_level, title);
                this.colorBorderCategory(doc.data().category, firstTask)
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

/** Export DailyTaskToDoComponent to render taskList to do mode component on task-list page. */
export const dailyTasksToDoComponent = new DailyTasksToDoComponent({
    selector: 'daily-tasks-to-do-component',
    template: `
    <div class="list">
    </div>
    `
});