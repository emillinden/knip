const circle = document.querySelector(".circle");
const start = document.querySelector(".button--start");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const state = document.querySelector(".state");
const reset = document.querySelector(".reset");

const REPETITIONS = 10;
const HOLD = 7 * 1000;
const REST = 6 * 1000;

let intervalId = null;
let repetitions = 0;
let time = 0;

start.addEventListener("click", () => {
  startWorkout();
});

reset.addEventListener("click", function () {
  location.reload();
});

const startWorkout = async () => {
  document.body.classList.add("started");
  start.classList.add("button--start--started");
  circle.classList.add("circle--started");
  timer.classList.add("timer--started");

  // Wait 1 second
  await new Promise((resolve) => setTimeout(resolve, 40));

  await load();

  timer.classList.add("timer--started");

  for (let i = 0; i < REPETITIONS; i++) {
    repetitions++;
    counter.textContent = `${repetitions} av ${REPETITIONS}`;
    circle.classList.add("circle--compressed");
    await interval("Knip! 🥴", HOLD);
    if (repetitions === REPETITIONS) break;
    circle.classList.remove("circle--compressed");
    await interval("Vila 😮‍💨", REST);
  }

  finish();
};

const load = async () => {
  let count = 5;
  timer.textContent = count;
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    count--;
    timer.textContent = count;
  }
  timer.classList.remove("timer--started");
};

const interval = async (title, stateTimer) => {
  state.textContent = title;
  time = stateTimer / 1000;
  for (let i = 0; i < stateTimer / 1000; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    time--;
    timer.textContent = time > 0 ? time : "";
    console.log(time > 0 ? time : "");
  }
};

const finish = () => {
  state.textContent = "Tight! 🥳";
  timer.textContent = "";
  counter.textContent = "";
  circle.classList.add("circle--finished");
  reset.classList.add("reset--finished");
};
