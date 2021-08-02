require('./counter.less'); // example of including component's styles
import { cycleDiagram } from '../cycle/cycle'

export function Voter(options) {
    var elem = options.elem;
    if (elem) {
        var step = options.step;
        var min = options.min;
        var max = options.max;
        var voteElem = elem.querySelector('.vote');
        var voteElem1 = document.getElementById('vote1');
        var voteElem2 = document.getElementById('vote2');
        var voteElem3 = document.getElementById('vote3');
        var voteElem4 = document.getElementById('vote4');
        var barElem = document.getElementById('bar');

        elem.onclick = function (event) {
            if (event.target.closest('.down')) {
                voteDecrease();
            } else if (event.target.closest('.up')) {
                voteIncrease();
            }
        }

        elem.onmousedown = function () {
            return false;
        };

        function voteDecrease() {
            if (+voteElem.innerHTML === min) return;
            voteElem.innerHTML = parseInt(voteElem.innerHTML, 10) - step;
            cycleDiagram(Number(voteElem2.innerHTML), Number(voteElem1.innerHTML), Number(voteElem3.innerHTML), Number(voteElem4.innerHTML));
        }

        function voteIncrease() {
            if (+voteElem.innerHTML === max) return;
            voteElem.innerHTML = parseInt(voteElem.innerHTML, 10) + step;
            cycleDiagram(Number(voteElem2.innerHTML), Number(voteElem1.innerHTML), Number(voteElem3.innerHTML), Number(voteElem4.innerHTML));
        }

        this.setVote = function (num) {
            voteElem.innerHTML = parseInt(voteElem.innerHTML, 10) + num;
        };

        this.refreshVote = function () {
            voteElem.innerHTML = 0;
        };
    }
}
