/** Export Timer to represent timer to control rounds and workTime. */
export default class Timer {
    constructor(roundsLeft,roundsTotal,timeRest,timeWork,trueFalse) {
        this.roundsLeft = roundsLeft;
        this.roundsTotal = roundsTotal;
        this.timeRest = timeRest;
        this.timeWork = timeWork;
        this.trueFalse = trueFalse;
    }
}