import { WFMComponent } from '../../../framework/index';

/**
 * @class ErrorComponent
 * @extends WFMComponent
 */
class ErrorComponent extends WFMComponent{

  /**
    * Constructor extends from WFMComponent.
    * @param  {WFMComponent} config - Constructor of ErrorComponent.
    */
    constructor(config){
        super(config);
    }
}

/** Export ErrorComponent to render error page. */
export const errorComponent = new ErrorComponent({
    selector: 'error-page',
    template:`
    <div>
        <h1>Error</h1>
        <a href="#">Back to main-page</a>
    </div>
    `
})