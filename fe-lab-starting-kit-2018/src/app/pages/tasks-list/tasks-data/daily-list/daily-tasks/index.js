import { WFMModule } from "../../../../../../framework/index"
import { appRoutes } from "../../../../../app.routes";
import { appComponent } from '../../../../../appComp';
import { editComponent } from "../../../../../components/edit-task-component/edit-task-component";
import { dailyTasksDeleteModeComponent } from "./daily-mode-delete/daily-mode-delete";
import { dailyTasksToDoComponent } from "./daily-tasks-do/daily-tasks-do";
import { dailyTasksDoneComponent } from './daily-tasks-done/daily-tasks-done';


/**
 * @class DailyTasksModule
 * @extends WFMModule
 */
class DailyTasksModule extends WFMModule {

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of DailyTasksModule.
     */
    constructor(config) {
        super(config);
    }
}

/** Export tasksToDoListModule to render component to do tasks. */
export const tasksToDoListModule = new DailyTasksModule({
    components: [
        dailyTasksToDoComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})

/** Export tasksDoneListModule to render component for done tasks. */
export const tasksDoneListModule = new DailyTasksModule({
    components: [
        dailyTasksDoneComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})

/** Export deleteModeListModule to render component in mode delete. */
export const deleteModeListModule = new DailyTasksModule({
    components: [
        dailyTasksDeleteModeComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})