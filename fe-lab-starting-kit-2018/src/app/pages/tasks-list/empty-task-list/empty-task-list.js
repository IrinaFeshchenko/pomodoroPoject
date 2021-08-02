import { WFMComponent } from '../../../../framework/index'
import "@babel/polyfill";
require('../../../components/cycle/cycle');

/**
 * @class EmptyTaskComponent
 * @extends WFMComponent
 */
class EmptyTaskComponent extends WFMComponent {

    /**
    * Constructor extends from WFMComponent.
    * @param  {WFMComponent} config - Constructor of EmptyTaskComponent.
    */
    constructor(config) {
        super(config);
    }
}

/** Export EmptyTaskComponent to render reports page. */
export const emptyComponent = new EmptyTaskComponent({
    selector: 'empty-tasks-component',
    template: `
    <div class="first-time-page">
        <div class="first-time-page__info">
          <img src="/images/first-time.png" alt="first-time-logo" class="first-time-page__info--image">
          <h1 class="move-task--text">Add your first task</h1>
        </div>
      </div>
    `
});