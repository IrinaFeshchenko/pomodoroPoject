import { WFMModule } from "../../../../../framework/index"
import { appRoutes } from "../../../../app.routes";
import { appComponent } from '../../../../appComp';
import { emptyDailyListComponent } from "./daily-empty/daily-empty";
import {dailyTasksComponent} from "./daily-tasks/daily-tasks"


/**
 * @class DailyListModule
 * @extends WFMModule
 */
class DailyListModule extends WFMModule {

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of DailyListModule.
     */
    constructor(config) {
        super(config);
    }
}

/** Export epmptyDailyListModule to render component if daily list tasks is empty. */
export const emptyDailyListModule = new DailyListModule({
    components: [
        emptyDailyListComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})

/** Export dailyListModule to render component if daily list tasks is exist in fierstore. */
export const dailyListModule = new DailyListModule({
    components: [
        dailyTasksComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})