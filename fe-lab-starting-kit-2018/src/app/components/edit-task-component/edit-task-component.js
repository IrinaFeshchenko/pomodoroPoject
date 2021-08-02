import { WFMComponent, bootstrap } from '../../../../src/framework/index'
import "@babel/polyfill";
import { Fierbase } from '../../../framework/core/shared/firebase';
import Task from '../../../framework/core/shared/Tasks';
import { Toast } from '../../../framework/core/shared/Toast';
import { notificationsComponent } from '../notifications-component/notifications-component';
import { tasksListModule } from '../../pages/tasks-list';
import Options from '../../../framework/core/shared/Options';

class EditComponent extends WFMComponent {
    notify = new Options('info', "", 3000);
    startAr;
    constructor(config) {
        super(config);
    }
    events() {
        return {
            'click .update_task': 'updateTaskOnClick',
            'click .close': 'closeModal'
        }
    }



    afterInit() {
        this.starAr = [].slice.call(document.querySelectorAll('[data-ratingedit]')).reverse();

        this.starAr.forEach((el) => {

            el.addEventListener('click', (e) => {
                const rating = e.target.dataset.ratingedit;
                for (let i = this.starAr.length; i-- > 0;) {
                    this.starAr[i].classList.remove('star');
                    this.starAr[i].src = "/images/estimation-checked.png"
                }

                for (let i = rating; i-- > 0;) {
                    this.starAr[i].classList.add('star');
                    this.starAr[i].src = "/images/estimation-notchecked.png"
                }
            })
        })
    }

    timeConverter(UNIX_timestamp) {
        Number.prototype.AddZero = function(b, c) {
            var l = (String(b || 10).length - String(this).length) + 1;
            return l > 0 ? new Array(l).join(c || '0') + this : this;
        }
        var a = new Date(UNIX_timestamp * 1000);
        var localDateTime = [(a.getMonth() + 1).AddZero(),
            a.getDate().AddZero(),
            a.getFullYear()
        ].join('/') + ', ' + [a.getHours().AddZero(),
            a.getMinutes().AddZero()
        ].join(':');
        return localDateTime;
    }

    async editOnClick(el) {
        let tokenShapshot = await Fierbase.getDataToEdit(el)
        document.getElementsByClassName("input--title__edit")[0].value = tokenShapshot.data().title;
        document.getElementsByClassName('input--description__edit')[0].value = tokenShapshot.data().description;
        let category = tokenShapshot.data().category;
        let priorityVal = tokenShapshot.data().priority;
        let categoryCheck = document.getElementsByClassName("custom-r-edit");
        for (let i = 0; i < categoryCheck.length; i++) {
            if (categoryCheck[i].value === category) {
                categoryCheck[i].checked = true;
            }
        }
        let priorityCheck = document.getElementsByClassName("custom-priority");
        for (let i = 0; i < priorityCheck.length; i++) {
            if (priorityCheck[i].value === priorityVal) {
                priorityCheck[i].checked = true;
            }
        }
        document.getElementById('deadline__date').value = new Date(this.timeConverter(tokenShapshot.data().deadline.seconds)).toISOString().slice(0, 16);
        const starArr = [].slice.call(document.querySelectorAll('[data-ratingedit]')).reverse();
        starArr.forEach(() => {
            for (let i = starArr.length; i-- > 0;) {
                starArr[i].classList.remove('star');
                starArr[i].src = "/images/estimation-checked.png"
            }
            for (let i = starArr.length - tokenShapshot.data().estimationTotal; i-- > 0;) {
                starArr[i].classList.add('star');
                starArr[i].src = "/images/estimation-notchecked.png"
            }
        });
        var modal = document.getElementById("myModal-addd");
        modal.style.display = "block";
        document.getElementsByClassName("update_task")[0].id = el;
    }

    async updateTaskOnClick() {
        let title = document.getElementsByClassName('input--title__edit')[0].value;
        let description = document.getElementsByClassName('input--description__edit')[0].value;
        let category = document.querySelector('input[name="det"]:checked').value;
        let deadline = document.getElementsByClassName('input--date__edit')[0].value;
        let estimation = 10 - Number(document.getElementsByClassName('star').length);
        console.log(estimation)
        let priority = document.querySelector('input[name="priority"]:checked').value;
        let task = new Task(title, description, new Date(Date.now()), null, new Date(deadline), false, estimation, null, priority, category);
        Toast.init();
        if (await Fierbase.updateTask(task, document.getElementsByClassName("update_task")[0].id)) {
            notificationsComponent.successSaveTask(this.notify);
            Toast.show(this.notify);
            document.getElementById("myModal-addd").style.display = "none";
            bootstrap(tasksListModule);
        } else {
            notificationsComponent.errorTaskCreateEdit(this.notify);
            Toast.show(this.notify);
        }
    }

    closeModal() {
        var modal = document.getElementById("myModal-addd");
        modal.style.display = "none";
    }

}

export const editComponent = new EditComponent({
    selector: 'edit-component',
    template: `
    <div id="myModal-addd" class="modal">
      <div class="modal-content">
        <span class="close"><img src="/images/close-modal.svg" alt=""></span>
        <span class="update_task"><img src="/images/add-modal.svg" alt=""></span>
        <div class="modal-form">
          <h2>Edit Task</h2>
          <div class="container">
            <div class="modal-form__title modal-form--border">
              <p class="modal-form__title--text">TITLE</p>
              <input class="input-modal input--title__edit" placeholder="Add title here" type="text">
            </div>
            <div class="modal-form__description modal-form--border">
              <p class="modal-form--text">DESCRIPTION</p>
              <input class="input-modal input--description__edit" placeholder="Add description here" type="text">
            </div>
            <div class="modal-form__category modal-form--border">
              <p class="modal-form--text">CATEGORY</p>
              <div class="modal-form__category--radio-list">
                <input type="radio" name="det" value= "Work" class="custom-radio custom-r custom-r-edit custom-radio-first" id="happy">
                <label for="happy">Work</label>
                <input type="radio" name="det" id="happy1" value= "Education" class="custom-radio custom-r custom-r-edit custom-radio-second">
                <label for="happy1">Education</label>
                <input type="radio" name="det" value="Hobby" id="happy2" class="custom-radio custom-r custom-r-edit custom-radio-third">
                <label for="happy2">Hobby</label>
                <input type="radio" name="det" value = "Sport" id="happy3" class="custom-radio custom-r custom-r-edit custom-radio-fourth">
                <label for="happy3">Sport</label>
                <input type="radio" name="det" value = "Other" id="happy4" class="custom-radio custom-r custom-r-edit custom-radio-fifth">
                <label for="happy4">Other</label>
              </div>
            </div>
            <div class="modal-form__deadline modal-form--border">
              <p class="modal-form--text">DEADLINE</p>
              <input type="datetime-local" id="deadline__date" class="input-modal input--date__edit" placeholder="May 23, 2021">
            </div>
            <div class="modal-form__estimation modal-form--border">
              <p class="modal-form--text">ESTIMATION</p>
              <div class="modal-form__estimation--radio-list" id="star-rating">
                <img data-ratingedit="9" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="8" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="7" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="6" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="5" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="4" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img" data-ratingedit="3" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="2" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="1" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
                <img data-ratingedit="0" src="/images/estimation-notchecked.png" alt="" class="checked-estimation estimation">
              </div>
            </div>
            <div class="modal-form__priority modal-form--border">
              <p class="modal-form--text">PRIORITY</p>
              <div class="modal-form__category--radio-list">
                <input type="radio" name="priority" value = "Urgent" class="custom-radio custom-priority custom-radio-fourth" id="happy5">
                <label for="happy5">Urgent</label>
                <input type="radio" name="priority" value = "High" id="happy6" class="custom-radio custom-priority custom-radio-second">
                <label for="happy6">High</label>
                <input type="radio" name="priority" value="Middle" id="happy7" class="custom-radio custom-priority custom-radio-first">
                <label for="happy7">Middle</label>
                <input type="radio" name="priority" value="Low" id="happy8" class="custom-radio custom-priority custom-radio-third">
                <label for="happy8">Low</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
});