import { WFMComponent } from '../framework/index';

/**
 * @class AppComponent
 * @extends WFMMComponent
 */
class AppComponent extends WFMComponent {

    /**
     * Constructor extends from WFMModule.
     * @param  {WFMComponent} config - Constructor of AppComponent.
     */
    constructor(config) {
        super(config);
    }
}

/** Export appComponent to render main page. */
export const appComponent = new AppComponent({
    selector: 'app-root',
    template: `
    
    `
});