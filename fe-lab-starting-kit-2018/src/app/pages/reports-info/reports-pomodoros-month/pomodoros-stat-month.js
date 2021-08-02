import { WFMComponent, bootstrap } from '../../../../framework/index';
import { Fierbase } from '../../../../framework/core/shared/firebase';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import $ from "jquery";

/**
 * @class ReportsPomodorosMonthComponent
 * @extends WFMComponent
 */
class ReportsPomodorosMonthComponent extends WFMComponent {

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
        this.setDataToChart();
    }


    /**
     * @function sendDataToChart
     * Selects data for current 30 days of month on pomodoros.
     */
    async setDataToChart() {
        let pasedData = [];
        let urgent = [];
        let high = [];
        let middle = [];
        let low = [];
        let failed = [];
        let arr = this.datesMonth();
        let data = await Fierbase.countStatPomodorosMonthByPriority(arr);
        for (let i = 0; i < data.length; i++) {
            urgent.push(data[i].urgent);
            high.push(data[i].high);
            middle.push(data[i].middle);
            low.push(data[i].low);
            failed.push(data[i].failed);
        }
        pasedData.push(...[{
                name: 'URGENT',
                data: urgent,
                color: "#F75C4C"
            },
            {
                name: 'HIGH',
                data: high,
                color: "#FFA841"
            },
            {
                name: 'MIDDLE',
                data: middle,
                color: "#FDDC43"
            },
            {
                name: 'LOW',
                data: low,
                color: "#1ABC9C"
            },
            {
                name: 'FAILED',
                data: failed,
                color: "#8DA5B8"
            }
        ]);
        this.weekChart(pasedData);
    }

    /**
     * @function datesMonth
     * Returns 30 days of curren month.
     * @returns {Array} - Array of current month 30 days. 
     */
    datesMonth() {
        var today = new Date();
        var end = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        var result = [];

        for (let i = 1; i <= end - 1; i++) {
            result.push(new Date(today.getFullYear() + '-' + (Number(today.getMonth() + 1) < 10 ? '0' + Number(today.getMonth() + 1) : Number(today.getMonth() + 1)) + '-' + (i < 10 ? '0' + i : i)))
        }
        return result;
    }

    /**
     * @function weekChart
     * Select data for current month pomodoros statistic and insert it into chart.
     * @param {Array} dataForChart - Array of 30 days current month.
     */
    async weekChart(dataForChart) {
        $(function() {
            var chart = Highcharts.chart('chart-month', {

                chart: {
                    type: 'column',
                    marginTop: 80,
                    marginRight: 40,
                    backgroundColor: 'none',
                    styledMode: true
                },

                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                xAxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
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

                series: dataForChart
            });

        });
    }
}

/** Export ReportsPomodorosMonthComponent to render reports page. */
export const reportsPomodorosMonthComponent = new ReportsPomodorosMonthComponent({
    selector: 'app-reports-month-page',
    template: `
          <div class="statistic-day">
            <div id="chart-month">
            </div>
          </div>
    `
})