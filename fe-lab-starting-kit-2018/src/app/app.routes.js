import { settingsListComponent } from "./pages/settings-list/settings-list";
import { reportsComponent } from './pages/reports-info/reports';
import { taskListComponent } from './pages/tasks-list/tasks-list';
import { settingsHeaderComponent } from './components/settings-header/settings-header';
import { tasksHeaderComponent } from './components/task-list-header/task-list.header';
import { reportsHeaderComponent } from './components/reports-header/reports-header';
import { errorComponent } from './pages/error/error';
import { timerHeaderComponent } from './components/timer-header/timer-header';
import { timerComponent } from './pages/timer/timer';
import { notificationsComponent } from "./components/notifications-component/notifications-component";

/** Export appRoutes to render pages and hash with it. */
export const appRoutes = [
    { path: '', component: taskListComponent, header: tasksHeaderComponent, notify: notificationsComponent },
    { path: 'reports/day/tasks', component: reportsComponent, header: reportsHeaderComponent, notify: notificationsComponent },
    { path: 'reports/day/pomodoros', component: reportsComponent, header: reportsHeaderComponent,notify: notificationsComponent },
    { path: 'reports/week/tasks', component: reportsComponent, header: reportsHeaderComponent, notify: notificationsComponent },
    { path: 'reports/week/pomodoros', component: reportsComponent, header: reportsHeaderComponent, notify: notificationsComponent },
    { path: 'reports/month/tasks', component: reportsComponent, header: reportsHeaderComponent ,notify: notificationsComponent},
    { path: 'reports/month/pomodoros', component: reportsComponent, header: reportsHeaderComponent,notify: notificationsComponent },
    { path: 'task-list', component: taskListComponent, header: tasksHeaderComponent,notify: notificationsComponent },
    { path: 'settings/pomodoros', component: settingsListComponent, header: settingsHeaderComponent,notify: notificationsComponent },
    { path: 'settings/categories', component: settingsListComponent, header: settingsHeaderComponent, notify: notificationsComponent },
    { path: 'timer', component: timerComponent, header: timerHeaderComponent, notify: notificationsComponent},
    { path: '**', component: errorComponent }
]