import { WFMComponent } from '../../../framework/index';


class ReportsHeaderComponent extends WFMComponent {
    constructor(config) {
        super(config);
    }
}

export const reportsHeaderComponent = new ReportsHeaderComponent({
    selector: 'reports-header',
    template: `
    <header class="header">
    <div class="container">
      <div id="menu-header" class="menu-header">
        <div class="menu-header__logo-part">
          <p class="logo logo-settings">Report</p>
          <img hidden class="logo2" src="../images/logo2.png" alt="do">
        </div>
        <div class="menu-header__menu-part">
          <a href="#task-list"><img src="../images/Global_List.svg" class="menu-icons" alt="do"></a>
          <a href="#reports/day/tasks"><img src="../images/stat.svg" class="menu-icons" alt="do"></a>
          <a href="#settings/pomodoros"><img src="../images/settings.svg" class="menu-icons" alt="do"></a>
        </div>
      </div>
      <div class="menu-second">
        <p class="logo2">Report</p>
      </div>
    </div>
  </header>
    `
});