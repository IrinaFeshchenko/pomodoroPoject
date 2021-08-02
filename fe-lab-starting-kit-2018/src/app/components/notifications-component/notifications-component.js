import { WFMComponent } from '../../../framework/index';
import Options from '../../../framework/core/shared/Options';


class NotificationsComponent extends WFMComponent {
    constructor(config) {
        super(config);
    }

    successSaveTask(options){
        options.text = "Your task was successfully saved";
        options.type = "success";
    }

    successRemoveTask(options){
        options.text = "Your task was successfully removed";
        options.type = "success";
    }

    finishedPomodoro(options){
        options.text = "You finished pomodoro";
        options.type = "success";
    }
    successSettings(options){
        options.text = "Settings was successfully saved";
        options.type = "success";
    }

    errorTaskCreateEdit(options){
        options.text = "Unable to save your task. Try again later";
        options.type = "error";
    }

    errorRemovingTask(options){
        options.text = "Unable to remove task. Try again later";
        options.type = "error";
    }

    timerError(options){
        options.text = "Unable to mark pomodoro/task as completed. Try again later";
        options.type = "error";
    }

    errorMoveToDaily(options){
        options.text = "Unable to move to the daily task list. Try again later";
        options.type = "error";
    }

    errorSavingSettings(options){
        options.text = "Unable to save settings. Try again later ";
        options.type = "error";
    }

    infoPomodoroFinished(options){
        options.text = "You finished pomodoro!";
        options.type = "info";
    }
    infoMovedToDaily(options){
        options.text = "You task was moved to the daily task list";
        options.type = "info";
    }
    addPomodorosToTaskTimer(options){
        options.text = "You task has maximum pomodoros";
        options.type = "warning";
    }

}

export const notificationsComponent = new NotificationsComponent({
    selector: 'notifications-component',
    template: `
    <div class="notification-tabs">
      <div class="container notification-container">
      </div>
    </div>
    `
});
