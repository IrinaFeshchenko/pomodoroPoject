import { WFMComponent, bootstrap } from '../../../../framework/index'
import { Router } from '../../../router'
import { Fierbase } from '../../../../framework/core/shared/firebase'
import { getFirestore } from 'firebase/firestore'
import { getDoc, query, collection, where, getDocs, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { globalListModule } from '.';
import "@babel/polyfill";

/**
 * @class TaskDataComponent
 * @extends WFMComponent
 */
class TasksDataComponent extends WFMComponent {

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of TaskDataComponent.
     */
    constructor(config) {
        super(config);
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        bootstrap(globalListModule);
    }
}

/** Export TaskDataModule to render taskList component on task-list page. */
export const tasksDataComponent = new TasksDataComponent({
    selector: 'tasks-data-component',
    template: `
  <div class="container">
    <daily-list-component></daily-list-component>
  </div>
  <global-list-component></global-list-component>
  <edit-component></edit-component>
    `
});