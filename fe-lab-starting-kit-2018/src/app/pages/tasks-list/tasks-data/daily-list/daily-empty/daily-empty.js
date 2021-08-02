import { WFMComponent } from '../../../../../../framework/index'
import { Router } from '../../../../../router'
import { Fierbase } from '../../../../../../framework/core/shared/firebase'
import { getFirestore } from 'firebase/firestore'
import { getDoc, query, collection, where, getDocs, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import "@babel/polyfill";

/**
 * @class EmptyDailyListComponent
 * @extends WFMComponent
 */
class EmptyDailyListComponent extends WFMComponent {

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of EmptyDailyListComponent.
     */
    constructor(config) {
        super(config);
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        Fierbase.init();
    }
}

/** Export emptyDailyListModule to render daily List component on task-list page. */
export const emptyDailyListComponent = new EmptyDailyListComponent({
    selector: 'daily-empty-component',
    template: `
    <div class="move-task">
      <h1 class="move-task--text">Task added,<br> move it to the top 5 in daily task list</h1>
      <img class="move-task--img" src="/images/upload.svg" alt="">
    </div>
    `
});