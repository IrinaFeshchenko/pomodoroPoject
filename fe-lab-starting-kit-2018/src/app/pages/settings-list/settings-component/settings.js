import { WFMComponent } from '../../../../framework/index'
import { Router } from '../../../router';
import { cycleDiagram } from '../../../components/cycle/cycle'
import { Voter } from '../../../components/counter/counter'
import "@babel/polyfill";
require('../../../components/cycle/cycle');
import { Fierbase } from '../../../../framework/core/shared/firebase'
import Options from '../../../../framework/core/shared/Options';
import { Toast } from '../../../../framework/core/shared/Toast';
import { notificationsComponent } from '../../../components/notifications-component/notifications-component';


/**
 * @class SettingsComponent
 * @extends WFMComponent
 */
class SettingsComponent extends WFMComponent {
    notify = new Options('info', "", 3000)

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of SettingsComponent.
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
            'click .save-tasks-button': 'changeSettings',
        }
    }

    /**
     * @function onInit
     * Initialize render of component.
     */
    onInit() {
        Fierbase.init();
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        this.dataf();
        var voter = new Voter({
            elem: document.getElementById('voter'),
            step: 5,
            min: 15,
            max: 25
        });

        var voter2 = new Voter({
            elem: document.getElementById('voter2'),
            step: 1,
            min: 2,
            max: 5
        });
        var voter3 = new Voter({
            elem: document.getElementById('voter3'),
            step: 1,
            min: 3,
            max: 5
        });
        var voter4 = new Voter({
            elem: document.getElementById('voter4'),
            step: 5,
            min: 15,
            max: 30
        });
    }

    /**
     * @function dataf
     * SetSetting of component.
     */
    async dataf() {
        Fierbase.getSettings();
        var voter = new Voter({
            elem: document.getElementById('voter'),
            step: 5,
            min: 15,
            max: 25
        });
        var voter2 = new Voter({
            elem: document.getElementById('voter2'),
            step: 1,
            min: 2,
            max: 5
        });
        var voter3 = new Voter({
            elem: document.getElementById('voter3'),
            step: 1,
            min: 3,
            max: 5
        });
        var voter4 = new Voter({
            elem: document.getElementById('voter4'),
            step: 5,
            min: 15,
            max: 30
        });
    }

    /**
     * @function changeSettings
     * Changes settings of component.
     */
    async changeSettings() {
        var workTime = document.getElementById('vote1').innerHTML;
        var workIter = document.getElementById('vote2').innerHTML;
        var shortBreak = document.getElementById('vote3').innerHTML;
        var longBreak = document.getElementById('vote4').innerHTML;
        Toast.init();
        if (await Fierbase.updateSettings(workTime, workIter, shortBreak, longBreak)) {
            notificationsComponent.successSettings(this.notify);
            Toast.show(this.notify)

            var voter = new Voter({
                elem: document.getElementById('voter'),
                step: 5,
                min: 15,
                max: 25
            });
            var voter2 = new Voter({
                elem: document.getElementById('voter2'),
                step: 1,
                min: 2,
                max: 5
            });
            var voter3 = new Voter({
                elem: document.getElementById('voter3'),
                step: 1,
                min: 3,
                max: 5
            });
            var voter4 = new Voter({
                elem: document.getElementById('voter4'),
                step: 5,
                min: 15,
                max: 30
            });
        } else {
            notificationsComponent.errorSavingSettings(this.notify);
            Toast.show(this.notify)
        }
    }
}

/** Export SettingsComponent to render settings page. */
export const settingsComponent = new SettingsComponent({
    selector: 'change-settings-component',
    template: `
    <div class="settings">
                <div class="pomodoros-settings">
                    <p class="header-pomodoros">Pomodoros settings</p>
                    <div class="pomodoros-settings__points">
                        <div class="points-work">
                            <div class="points-work__first" id="points-work__first">
                                <div class="text-ponts-info first-ponts-info">
                                    <p class="text-points">WORK TIME</p>
                                </div>
                                <div id="voter">
                                    <div class="tab-add voter">
                                        <span class="down btn">—</span>
                                        <span class="vote vote1" id="vote1">15</span>
                                        <span class="up btn">+</span>
                                    </div>
                                </div>
                            </div>
                            <div class="points-work__second">
                                <p>Please select a value between 15 and 25 <span>minutes</span></p>
                            </div>
                        </div>
                        <div class="points-work">
                            <div class="points-work__first">
                                <div class="text-ponts-info second-ponts-info">
                                    <p class="text-points">WORK ITERATION</p>
                                </div>
                                <div id="voter2">
                                    <div class="tab-add voter">
                                        <span class="down btn">—</span>
                                        <span class="vote vote2" id="vote2">2</span>
                                        <span class="up btn">+</span>
                                    </div>
                                </div>
                            </div>
                            <div class="points-work__second">
                                <p>Please select a value between 2 and 5 <span>iterations</span></p>
                            </div>
                        </div>
                        <div class="points-work">
                            <div class="points-work__first">
                                <div class="text-ponts-info third-ponts-info">
                                    <p class="text-points">SHORT BREAK</p>
                                </div>
                                <div id="voter3">
                                    <div class="tab-add voter">
                                        <span class="down btn">—</span>
                                        <span class="vote vote3" id="vote3">3</span>
                                        <span class="up btn">+</span>
                                    </div>
                                </div>
                            </div>
                            <div class="points-work__second">
                                <p>Please select a value between 3 and 5 <span>minutes</span></p>
                            </div>
                        </div>
                        <div class="points-work">
                            <div class="points-work__first">
                                <div class="text-ponts-info fourth-ponts-info">
                                    <p class="text-points">LONG BREAK</p>
                                </div>
                                <div id="voter4">
                                    <div class="tab-add voter">
                                        <span class="down btn">—</span>
                                        <span class="vote vote4" id="vote4">15</span>
                                        <span class="up btn">+</span>
                                    </div>
                                </div>
                            </div>
                            <div class="points-work__second">
                                <p>Please select a value between 15 and 30 <span>minutes</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="your-cycle" id="your-cycle">
                        <p class="cycle-header">Your cycle</p>
                        <div class="bar-holder"><div class="bar" id="bar"></div></div>
                    </div>
                    <div class="buttons-navigation">
                        <button class="go-tasks-button"><a href="#task-list">Go to Tasks</a></button>
                        <button class="save-tasks-button">Save</button>
                    </div>
                </div>
            </div>
    `
});