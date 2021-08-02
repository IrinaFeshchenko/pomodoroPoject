/** Export TaskStat to represent tasks statistic. */
export default class TasksStat {
    constructor(urgent, high, middle, low, failed) {
        this.urgent = urgent;
        this.high = high;
        this.middle = middle;
        this.low = low;
        this.failed = failed;
    }
}