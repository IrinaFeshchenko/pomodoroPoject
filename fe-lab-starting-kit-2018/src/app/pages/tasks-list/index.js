//export { TaskList } from './task-list';

import { WFMModule } from "../../../framework/index"
import { appRoutes } from "../../app.routes";
import { appComponent } from '../../appComp';
import { firstTimeComponent } from './first-time-list/first-time-list';
import { emptyComponent } from './empty-task-list/empty-task-list';
import { tasksDataComponent } from './tasks-data/tasks-data';

/**
 * @class TaskListModule
 * @extends WFMModule
 */
class TaskListModule extends WFMModule {

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of TaskListModule.
     */
    constructor(config) {
        super(config);
    }
}

/** Export FirstVisitModule to render component if credentials is not set. */
export const firstVisitModule = new TaskListModule({
    components: [
        firstTimeComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})

/** Export emptyModule to render component if task-list is empty. */
export const emptyModule = new TaskListModule({
    components: [
        emptyComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})

/** Export taskListModule to render component if tasks is exist in firebase. */
export const tasksListModule = new TaskListModule({
    components: [
        tasksDataComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})

