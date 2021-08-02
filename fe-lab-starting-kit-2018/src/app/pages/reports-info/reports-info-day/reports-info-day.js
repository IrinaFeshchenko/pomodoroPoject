import { WFMComponent } from '../../../../framework/index';
import { Fierbase } from '../../../../framework/core/shared/firebase';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import $ from "jquery";

/**
 * @class ReportsDayComponent
 * @extends WFMComponent
 */
class ReportsDayComponent extends WFMComponent {
    chart;

    /**
     * Constructor extends from WFMComponent.
     * @param  {WFMComponent} config - Constructor of ReportsDayComponent.
     */
    constructor(config) {
        super(config);
    }

    /**
     * @function events
     * Set events onClick on Render.
     */
    events() {
        return {}
    }

    /**
     * @function onInit
     * Initialize render of component.
     */
    async onInit() {
        Fierbase.init();
        Exporting(Highcharts);
    }

    /**
     * @function afterInit
     * Initialize functions that should compile after @function onInit .
     */
    afterInit() {
        this.dayChart();
    }

    /**
     * @function dayChart
     * Select data for daily chart and insert it into chart.
     */
    async dayChart() {
        let statData = await Fierbase.countStatTasksDayByPriority();
        let that = this;
        $(function call() {
            that.chart = Highcharts.chart('statistic-day', {

                chart: {
                    type: 'column',
                    marginTop: 80,
                    marginRight: 40,
                    backgroundColor: "none"
                },

                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                xAxis: {
                    categories: ['URGENT', 'HIGH', 'MIDDLE', 'LOW', 'FAILED'],
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
                        return '<b>' + this.x + '</b><br/>Tasks: ' + this.point.stackTotal;
                    }
                },

                plotOptions: {
                    column: {
                        stacking: 'normal',
                        depth: 40
                    }
                },

                series: [{
                    name: 'Urgent',
                    data: [statData.urgent, 0, 0, 0, 0],
                    color: "#F75C4C"
                }, {
                    name: 'High',
                    data: [0, statData.high, 0, 0, 0],
                    color: "#FFA841"
                }, {
                    name: 'Middle',
                    data: [0, 0, statData.middle, 0, 0],
                    color: "#FDDC43"
                }, {
                    name: 'Low',
                    data: [0, 0, 0, statData.low, 0],
                    color: "#1ABC9C"
                }, {
                    name: 'Failed',
                    data: [0, 0, 0, 0, statData.failed],
                    color: "#8DA5B8"
                }]
            });
        });
    }
}

/** Export ReportsDayComponent to render reports page. */
export const reportsDayComponent = new ReportsDayComponent({
    selector: 'app-reports-day-page',
    template: `
          <div class="statistic-day" id="statistic-day">
          </div>
    `
})