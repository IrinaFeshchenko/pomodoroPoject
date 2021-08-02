//export { TaskList } from './task-list';

import {WFMModule} from "../../../framework/index"
import { appRoutes } from "../../app.routes";
import { appComponent } from '../../appComp';
import { categoriesSettingsComponent } from './categories-component/categories';
import { settingsComponent } from './settings-component/settings';


/**
 * @class SettingsModule
 * @extends WFMModule
 */
class SettingsModule extends WFMModule{

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of SettingsModule.
     */
    constructor(config){
        super(config);
    }
}

/** Export SettingsModule to render settings component on settings page. */
export const settingsModule = new SettingsModule({
    components: [
        settingsComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)

/** Export SettingsModule to render categories component on settings page. */
export const categoriesModule = new SettingsModule({
    components: [
        categoriesSettingsComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)

