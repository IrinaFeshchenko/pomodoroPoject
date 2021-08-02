import {WFMModule} from "../framework/index"
import { bootstrap } from "../framework/core/bootstrap"
import { appRoutes } from "./app.routes";
import { appComponent } from './appComp';
import firebase from 'firebase/app'
import { settingsHeaderComponent } from './components/settings-header/settings-header';
import "@babel/polyfill";
import {FireBase} from '../framework/core/shared/firebase'
import {
    notificationsComponent
} from './components/notifications-component/notifications-component';

/* root component starts here */
require('assets/less/main.less'); // include general styles

require('./router'); // include router

/* example of including header component */
require('./components/counter/counter');
require('./components/cycle/cycle');

require('./pages/tasks-list/index')


/**
 * @class AppModule
 * @extends WFMModule
 */
class AppModule extends WFMModule{

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMModule} config - Constructor of AppModule.
     */
    constructor(config){
        super(config);
    }

    /**
     * @function onInit
     * Initialize render of component.
     */
    onInit(){
        sessionStorage.setItem('isNewUser', false);
    }
}

const appModule = new AppModule({
    components: [
        //headerComponent
    ],
    mainComp:appComponent,
    routes:appRoutes
}
)
bootstrap(appModule)