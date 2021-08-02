import { WFMComponent } from '../../../../framework/index'
import { Router } from '../../../router';

/**
 * @class CategoriesSettingsComponent
 * @extends WFMComponent
 */
class CategoriesSettingsComponent extends WFMComponent {

    /**
    * Constructor extends from WFMComponent.
    * @param  {WFMComponent} config - Constructor of CategoriesSettingsComponent.
    */
    constructor(config) {
        super(config);
    }
}

/** Export CategoriesSettingsComponent to render settings page. */
export const categoriesSettingsComponent = new CategoriesSettingsComponent({
    selector: 'categories-component',
    template: `
    <div class="navigation-info">
                <div class="pomodoros-categories">
                    <p class="header-pomodoros">Categories list overview</p>
                    <div class="pomodoros-categories__points">
                        <div class="points-work">
                            <div class="text-ponts-info first-ponts-info">
                                <p class="text-points">Work</p>
                            </div>
                        </div>
                        <div class="points-work">
                            <div class="text-ponts-info second-ponts-info">
                                <p class="text-points">Education</p>
                            </div>
                        </div>
                        <div class="points-work">
                            <div class="text-ponts-info third-ponts-info">
                                <p class="text-points">Hobby</p>
                            </div>
                        </div>
                        <div class="points-work">
                            <div class="text-ponts-info fourth-ponts-info">
                                <p class="text-points">Sport</p>
                            </div>
                        </div>
                        <div class="points-work">
                            <div class="text-ponts-info fifth-ponts-info">
                                <p class="text-points">Other</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-navigation">
                    <button class="go-tasks-button">Go to Tasks</button>
                </div>
            </div>
    `
});