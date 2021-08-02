import { WFMModule } from "../../../../framework/index"
import { appRoutes } from "../../../app.routes";
import { appComponent } from '../../../appComp';
import { globalListComponent } from './global-list/global-list';
import { dailyListComponent } from './daily-list/daily-list';
import { editComponent } from '../../../components/edit-task-component/edit-task-component';


/**
 * @class GlobalListModule
 * @extends WFMModule
 */
class GlobalListModule extends WFMModule {

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of GlobalListModule.
     */
    constructor(config) {
        super(config);
    }
}

/** Export GlobalListModule to render daily and global-list component.*/
export const globalListModule = new GlobalListModule({
    components: [
        globalListComponent,
        dailyListComponent,
        editComponent
    ],
    mainComp: appComponent,
    routes: appRoutes
})