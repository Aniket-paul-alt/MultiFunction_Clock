
let alarmTime
let alarmInterval
const clockwatch = document.getElementById("clockwatch")
const stopwatch = document.getElementById("stopwatch")
const alarmwatch = document.getElementById("alarmwatch")
const alarmSet = document.getElementById("alarmSet")
const alarmBtn = document.getElementById("alarmBtn")
const alarmStop = document.getElementById("stopAlarm")
const alarmInClock = document.getElementById("alarmInClock")
const alarmSound = document.getElementById('alarmSound');
const day = document.getElementById("day")


stopwatch.addEventListener("click", () => {
    document.querySelector(".mainDiv").style.display = "none"
    document.querySelector(".stopwatchDiv").style.display = "block"
    document.querySelector(".alarmDiv").style.display = "none"
})

clockwatch.addEventListener("click", () => {
    document.querySelector(".mainDiv").style.display = "block"
    document.querySelector(".stopwatchDiv").style.display = "none"
    document.querySelector(".alarmDiv").style.display = "none"
})

alarmwatch.addEventListener("click", () => {
    document.querySelector(".mainDiv").style.display = "none"
    document.querySelector(".stopwatchDiv").style.display = "none"
    document.querySelector(".alarmDiv").style.display = "flex"
})

const generateCurrTime = () => {
    const currTime = new Date()
    document.getElementById("clock").innerHTML = currTime.toLocaleTimeString()
    document.getElementById("date").innerHTML = currTime.toLocaleDateString()
    // console.log(currTime);
    const todayDay = currTime.getDay()
    switch (todayDay) {
        case 0:
            day.textContent = "Sunday"
            break;
        case 1:
            day.textContent = "Monday"
            break;
        case 2:
            day.textContent = "Tuesday"
            break;
        case 3:
            day.textContent = "Wednesday"
            break;
        case 4:
            day.textContent = "Thursday"
            break;
        case 5:
            day.textContent = "Friday"
            break;
        case 6:
            day.textContent = "Saturday"
            break;

        default:
            break;
    }

}

setInterval(generateCurrTime, 1000);

//stopwatch
const timerDisplay = document.getElementById('time');
const lapsDisplay = document.getElementById('laps');
let startTime;
let intervalId;
let pausedTime = 0;

function startTimer() {
    startTime = Date.now() - pausedTime;
    intervalId = setInterval(updateTimer, 10);
    // document.getElementById("start").disabled = true
    document.getElementById("start").style.display = "none"
    document.getElementById("pause").style.display = "block"
    document.getElementById("reset").style.display = "block"
}

function updateTimer() {
    const currentTime = Date.now() - startTime;
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = currentTime % 1000;

    timerDisplay.textContent = `${hours <= 9 ? "0" + hours : hours} : ${minutes <= 9 ? "0" + minutes : minutes} : ${seconds <= 9 ? "0" + seconds : seconds} : ${milliseconds <= 99 ? "0" + milliseconds : milliseconds}`;
}

function pauseTimer() {
    clearInterval(intervalId);
    pausedTime = Date.now() - startTime; // Save the elapsed time during pause
    document.getElementById("start").style.display = "block"
    document.getElementById("pause").style.display = "none"
    document.getElementById("reset").style.display = "block"
}

function resetTimer() {
    pauseTimer();
    timerDisplay.textContent = '00 : 00 : 00 : 000';
    pausedTime = 0; // Reset paused time
    document.getElementById("start").style.display = "block"
    document.getElementById("pause").style.display = "none"
    document.getElementById("reset").style.display = "none"
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);


//alarmclock
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarm');

function setAlarm() {
    alarmTime = alarmTimeInput.value;
    const currentTime = new Date();
    const alarmDate = new Date(currentTime.toDateString() + ' ' + alarmTime);

    if (alarmDate > currentTime) {
        alarmInClock.style.display = "flex"
        alarmSet.innerHTML = `Alarm Set to ${alarmTime}`
        const timeUntilAlarm = alarmDate - currentTime;
        alarmBtn.setAttribute("src", "./images/alarmclock.png")
        alarmStop.style.display = "block"
        alarmInterval = setTimeout(() => {
            // alert('Alarm! Time to wake up!');
            alarmSound.play();
            alarmSet.innerHTML = ``
        }, timeUntilAlarm);
    } else {
        alert('Please set a future alarm time.');
    }
}

function stopAlarm() {
    clearTimeout(alarmInterval);
    alarmSound.pause()
    // alert('Alarm stopped.');
}

alarmStop.addEventListener("click", () => {
    stopAlarm()
    alarmBtn.setAttribute("src", "./images/alarmnotset.png")
    alarmInClock.style.display = "none"
})

setAlarmButton.addEventListener('click', setAlarm);