import { WFMComponent } from '../../../../framework/index'
import { Router } from '../../../router'
import "@babel/polyfill";

/**
 * @class FirstTimeComponent
 * @extends WFMComponent
 */
class FirstTimeComponent extends WFMComponent {

  /**
   * Constructor extends from WFMComponent.
   * @param  {WFMComponent} config - Constructor of FirstTimeComponent.
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
      'click .skip-set': 'skipSettings',
      'click .go-set': 'goToSettings'
    }
  }

  /**
    * @function gotoSettings
    * Navigate to set your own settings.
    */
  goToSettings() {
    Router.navigate('settings')
  }

  /**
    * @function gotoSettings
    * Navigate to your task-list.
    */
  skipSettings() {
    Router.navigate('task-list')
  }
}

/** Export FirstTimeComponent to render reports page. */
export const firstTimeComponent = new FirstTimeComponent({
  selector: 'first-time-component',
  template: `
    <div class="first-time-page">
        <div class="first-time-page__info">
          <img src="/images/Pomodoro.png" alt="first-time-logo" class="first-time-page__info--image">
          <h1 class="move-task--text">As you visited our site for a first time you can check and customize your default application settings</h1>
        </div>
        <div class="first-time-page__navigation">
          <div class="buttons-navigation">
            <button class="go-tasks-button skip-set"><a>Skip</a></button>
            <button class="save-tasks-button go-set">Go to Settings</button>
        </div>
        </div>
      </div>
    `
});