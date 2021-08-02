require('./settings-list.less');
import { WFMComponent } from '../../../framework/index'
import { Router } from '../../router';
import { bootstrap } from "../../../framework/core/bootstrap"
import { settingsModule, categoriesModule } from './index'

/**
 * @class SettingsListComponent
 * @extends WFMComponent
 */
class SettingsListComponent extends WFMComponent {

    /**
    * Constructor extends from WFMComponent.
    * @param  {WFMComponent} config - Constructor of SettingsListComponent.
    */
    constructor(config) {
        super(config);
    }

    /**
     * @function events
     * Set events onClick on Render.
     */
    events() {
        return {
            'click .render_settings': 'goToSettings',
            'click .render_categories': 'goToCategories'
        }
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        if (window.location.hash === "#settings/pomodoros") {
            bootstrap(settingsModule)
        } else if (window.location.hash === "#settings/categories") {
            bootstrap(categoriesModule)
        }
    }

    /**
     * @function goToSettings   
     * Go to settings component.  
     * @param {Event} event - Event that was maked.
     */
    goToSettings(event) {
        event.preventDefault()
        Router.navigate('settings/pomodoros')
        bootstrap(categoriesModule)
        let settingsBlock = document.getElementsByClassName("settings")[0];
        settingsBlock.style.display = 'none';
    }

    /**
     * @function goToCategories  
     * Go to categories component.  
     * @param {Event} event - Event that was maked.
     */
    goToCategories(event) {
        event.preventDefault()
        Router.navigate('settings/categories')
        bootstrap(settingsModule)
        let settingsBlock = document.getElementsByClassName("navigation-info")[0];
        settingsBlock.style.display = 'none';
    }

}

/** Export ReportsWeekComponent to render reports page. */
export const settingsListComponent = new SettingsListComponent({
    selector: 'settings-component',
    template: `
    <main class="main">
        <div class="container">
            <div class="navigation">
                <a id="to-do-tasks" class="to-do-tasks render_settings">Pomodoros</a>
                <span> | </span>
                <a class="done-tasks render_categories">Categories</a>
            </div>
            <categories-component></categories-component>
            <change-settings-component></change-settings-component>
    </main>
    `
});