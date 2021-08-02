import { WFMComponent } from '../../../../framework/index';
import { Fierbase } from '../../../../framework/core/shared/firebase';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import $ from "jquery"

/**
 * @class ReportsWeekComponent
 * @extends WFMComponent
 */
class ReportsWeekComponent extends WFMComponent {
    dataStat;

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of TimerComponent.
     */
    constructor(config) {
        super(config);
    }

    /**
     * @function onInit
     * Initialize render of component.
     */
    onInit() {
        Fierbase.init();
        Exporting(Highcharts);
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        this.weekChart();
    }

    /**
     * @function dates
     * Returns dates from monday till friday of curren week.
     * @param {Date} current - Current date.
     * @returns {Array} - Array of curren week from Monday till Friday. 
     */
    dates(current) {
        var week = new Array();
        current.setDate((current.getDate() - current.getDay() + 1));
        for (var i = 0; i < 5; i++) {
            week.push(
                new Date(current)
            );
            current.setDate(current.getDate() + 1);
        }
        return week;
    }

    /**
     * @function weekChart
     * Select data for week chart and insert it into chart.
     */
    async weekChart() {
        let arr = this.dates(new Date(Date.now()));
        this.dataStat = await Fierbase.countStatTasksWeekByPriority(arr);
        let mondayStat = this.dataStat[0];
        let tueStat = this.dataStat[1];
        let wedStat = this.dataStat[2];
        let thuStat = this.dataStat[3];
        let friStat = this.dataStat[4];

        $(function() {
            var chart = Highcharts.chart('chart-week', {

                chart: {
                    type: 'column',
                    marginTop: 80,
                    marginRight: 40,
                    backgroundColor: 'none'
                },

                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                xAxis: {
                    categories: ['MON', 'TUE', 'WED', 'THU', 'FRI']
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: ''
                    }
                },

                tooltip: {
                    formatter: function() {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },

                plotOptions: {
                    column: {
                        stacking: 'normal',
                        depth: 40
                    }
                },

                series: [{
                    name: 'URGENT',
                    data: [mondayStat.urgent, tueStat.urgent, wedStat.urgent, thuStat.urgent, friStat.urgent],
                    stack: 'completed',
                    color: "#F75C4C"
                }, {
                    name: 'HIGH',
                    data: [mondayStat.high, tueStat.high, wedStat.high, thuStat.high, friStat.high],
                    stack: 'completed',
                    color: "#FFA841"
                }, {
                    name: 'MIDDLE',
                    data: [mondayStat.middle, tueStat.middle, wedStat.middle, thuStat.middle, friStat.middle],
                    stack: 'completed',
                    color: "#FDDC43"
                }, {
                    name: 'LOW',
                    data: [mondayStat.low, tueStat.low, wedStat.low, thuStat.low, friStat.low],
                    stack: 'completed',
                    color: "#1ABC9C"
                }, {
                    name: 'FAILED',
                    data: [mondayStat.failed, tueStat.failed, wedStat.failed, thuStat.failed, friStat.failed],
                    stack: 'failed',
                    color: "#8DA5B8"
                }]
            });
        });
    }
}

/** Export ReportsWeekComponent to render reports page. */
export const reportsWeekComponent = new ReportsWeekComponent({
    selector: 'app-reports-week-page',
    template: `
          <div class="statistic-day">
          <div id="chart-week">
          </div>
          </div>
    `
})