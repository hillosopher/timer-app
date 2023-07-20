let time = 0;
let running = 0;
let interval = null;
const timerInput = document.getElementById("timerInput");

function startStop() {
  if (running === 0) {
    running = 1;
    const timeArr = timerInput.value.split(":"); // split minutes and seconds
    time = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
    timerInput.readOnly = true; // make the input field read-only
    interval = setInterval(function () {
      if (time <= 0) {
        clearInterval(interval);
        running = 0;
        timerInput.readOnly = false; // make the input field editable again
        document.getElementById("startStopBtn").innerText = "Start";
        alert("Time is up!");
        const audio = new Audio("timer.mp3");

        audio.addEventListener(
          "canplaythrough",
          function () {
            this.currentTime = 51;
            this.play();
          },
          false
        );

        audio.play();
      } else {
        time--;
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        timerInput.value =
          (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
      }
    }, 1000);
    document.getElementById("startStopBtn").innerText = "Pause";
  } else {
    running = 0;
    clearInterval(interval);
    timerInput.readOnly = false; // make the input field editable again
    document.getElementById("startStopBtn").innerText = "Resume";
  }
}

function reset() {
  running = 0;
  time = 0;
  clearInterval(interval);
  timerInput.value = "00:00";
  timerInput.readOnly = false; // make the input field editable again
  document.getElementById("startStopBtn").innerText = "Start";
}

document.getElementById("startStopBtn").addEventListener("click", startStop);
document.getElementById("resetBtn").addEventListener("click", reset);
