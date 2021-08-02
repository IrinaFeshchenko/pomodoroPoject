import {WFMModule} from "../../../framework/index"
import { appRoutes } from "../../app.routes";
import { appComponent } from '../../appComp';
import { reportsDayComponent } from './reports-info-day/reports-info-day';
import { reportsWeekComponent } from './reports-info-week/reports-info-week';
import { reportsMonthComponent } from './reports-info-month/reports-info-month';
import { reportsDayPomodorosComponent } from './reports-pomodoros-day/pomodoros-stat-day';
import { reportsWeekPomodorosComponent } from "./reports-pomodoros-week/pomodoros-stat-week";
import { reportsPomodorosMonthComponent } from "./reports-pomodoros-month/pomodoros-stat-month";


/**
 * @class ReportsModule
 * @extends WFMModule
 */
class ReportsModule extends WFMModule{

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of ReportsModule.
     */
    constructor(config){
        super(config);
    }
}

/** Export ReportsModule to render timer reports tasks for current day functionality on timer page. */
export const reportDayModule = new ReportsModule({
    components: [
        reportsDayComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)
/** Export ReportsModule to render timer reports pomodoros for current day functionality on timer page. */
export const reportDayPomodorosModule = new ReportsModule({
    components: [
        reportsDayPomodorosComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)

/** Export ReportsModule to render timer reports tasks for current week functionality on timer page. */
export const reportWeekModule = new ReportsModule({
    components: [
        reportsWeekComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)

/** Export ReportsModule to render timer reports pomodoros for current week functionality on timer page. */
export const reportWeekPomodorosModule = new ReportsModule({
    components: [
        reportsWeekPomodorosComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)

/** Export ReportsModule to render timer reports tasks for current month functionality on timer page. */
export const reportMonthModule = new ReportsModule({
    components: [
        reportsMonthComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)

/** Export ReportsModule to render timer reports pomodoros for current month functionality on timer page. */
export const reportPomodorosMonthModule = new ReportsModule({
    components: [
        reportsPomodorosMonthComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)
