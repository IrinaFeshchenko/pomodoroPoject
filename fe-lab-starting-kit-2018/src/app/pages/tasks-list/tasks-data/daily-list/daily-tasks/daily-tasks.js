import { WFMComponent, bootstrap } from '../../../../../../framework/index'
import { Router } from '../../../../../router'
import { Fierbase } from '../../../../../../framework/core/shared/firebase'
import { getFirestore } from 'firebase/firestore'
import { getDoc, query, collection, where, getDocs, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { tasksToDoListModule } from '.';
import "@babel/polyfill";

/**
 * @class DailyTasksComponent
 * @extends WFMComponent
 */
class DailyTasksComponent extends WFMComponent {

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of DailyTasksComponent.
     */
    constructor(config) {
        super(config);
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        bootstrap(tasksToDoListModule)
    }

}

/** Export DailyTaskComponent to render daily task component on task-list page. */
export const dailyTasksComponent = new DailyTasksComponent({
    selector: 'daily-tasks-component',
    template: `
        <daily-tasks-to-do-component></daily-tasks-to-do-component>
        <daily-tasks-delete-mode-component></daily-tasks-delete-mode-component>
        <daily-empty-component></daily-empty-component>
    `
});