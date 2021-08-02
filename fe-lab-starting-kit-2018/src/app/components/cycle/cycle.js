require('./cycle.less'); // example of including component's styles
export { cycleDiagram }


function cycleDiagram(woriter = 4, work_time = 25, shortbreak = 2, long_break = 30) {
    let barElem = document.getElementById('bar');
    let halfCycle = (Number(woriter) * work_time) + (Number(shortbreak) * Number(woriter - 1)) + Number(long_break);
    let allCycle = ((Number(woriter) * work_time) + (Number(shortbreak) * Number(woriter))) + halfCycle;
    if (barElem) {
        barElem.innerHTML = '';
        let arr = [];
        let all = Number(woriter) * Number(4);
        for (let i = 0; i < all; i++) {
            if (i % 2 != 0) {
                if ((all / 2) - 1 == i) {
                    arr[i] = long_break;
                } else {
                    arr[i] = shortbreak;
                }
            } else {
                arr[i] = work_time;
            }
        }

        for (let i = 0; i < all; i++) {
            if (i % 2 != 0) {
                if ((all / 2) - 1 == i) {
                    var div = document.createElement("div");
                    barElem.appendChild(div);
                    div.className = "about-data";
                    div.style.width = arr[i] * 60 + "px";
                    div.style.backgroundColor = "#B470D0";
                } else {
                    var div = document.createElement("div");
                    barElem.appendChild(div);
                    div.className = "about-data";
                    div.style.width = arr[i] * 60 + "px";
                    div.style.backgroundColor = "#57A6DC";
                }
            } else {
                var div = document.createElement("div");
                barElem.appendChild(div);
                div.className = "about-data";
                div.style.width = arr[i] * 60 + "px";
                div.style.backgroundColor = "#FFB202";
            }
        }

        let data = Number(0);
        for (let i = 0; i < all; i++) {
            if (arr[i] < long_break) {
                data += arr[i];
            } else {
                break;
            }
        }
        data += Number(long_break);
        let hours = Number(Math.trunc(halfCycle / 60));
        let minutes = Number(halfCycle % 60);
        let allHours = Number(Math.trunc(allCycle / 60));
        let allMinutes = Number(allCycle % 60);
        let formatted = 'First cycle: ' + hours + 'h ' + minutes + 'm';
        let formatted2 = allHours + 'h ' + allMinutes + 'm';
        let timeFirstCycle = document.querySelector('.cycle-header');
        var time = document.createElement("p");
        if ((document.getElementById('your-cycle').getElementsByClassName('first__cycle-time').length) === 0) {
            time.innerText = formatted;
            time.style.textAlign = "center";
            time.className = "first__cycle-time"
            time.style.color = "#8DA5B8";
            timeFirstCycle.parentNode.insertBefore(time, timeFirstCycle.nextSibling);
        } else if ((document.getElementById('your-cycle').getElementsByClassName('first__cycle-time').length) === 1) {
            let first__cycle = document.querySelector('.first__cycle-time');
            first__cycle.textContent = formatted;
        }
        let timeAll = document.createElement('p');
        if ((document.getElementById('your-cycle').getElementsByClassName('all__cycle-time').length) === 0) {
            timeAll.innerText = formatted2;
            timeAll.style.textAlign = "right";
            timeAll.className = "all__cycle-time"
            timeAll.style.color = "#8DA5B8";
            timeFirstCycle.parentNode.insertBefore(timeAll, timeFirstCycle.nextSibling);
        } else if ((document.getElementById('your-cycle').getElementsByClassName('all__cycle-time').length) === 1) {
            let first__cycle = document.querySelector('.all__cycle-time');
            first__cycle.textContent = formatted2;
        }
        let timeNull = document.createElement('p');
        if ((document.getElementById('your-cycle').getElementsByClassName('null__cycle-time').length) === 0) {
            timeNull.innerText = '0m';
            timeNull.style.textAlign = "left";
            timeNull.className = "null__cycle-time"
            timeNull.style.color = "#8DA5B8";
            timeFirstCycle.parentNode.insertBefore(timeNull, timeFirstCycle.nextSibling);
        } else if ((document.getElementById('your-cycle').getElementsByClassName('all__cycle-time').length) === 1) {
            let first__cycle = document.querySelector('.null__cycle-time');
            first__cycle.textContent = '0m';
        }
        arr = [];
    }
}