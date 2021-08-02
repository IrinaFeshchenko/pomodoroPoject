import {WFMModule} from "../../../framework/index"
import { appRoutes } from "../../app.routes";
import { appComponent } from '../../appComp';
import { timerComponent } from "./timer";
import { timerDataComponent } from './timer-data-component/timer-data';
import { timerSetComponent } from './timer-work-component/timer-work-component';


/**
 * @class TimerModule
 * @extends WFMModule
 */
class TimerModule extends WFMModule{

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of TimerModule.
     */
    constructor(config){
        super(config);
    }
}

/** Export TimerModule to render timer functionality on timer page. */
export const timerModule = new TimerModule({
    components: [
        timerSetComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)

/** Export TimerModule to render timer task data on timer page. */
export const timerDataModule = new TimerModule({
    components: [
        timerDataComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)