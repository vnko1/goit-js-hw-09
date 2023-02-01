import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let selectedTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getTime.call(options, selectedDates[0]);
  },
};
const BUTTON_UI = {
  status: 'start',
  start: { text: 'start' },
  stop: { text: 'stop' },
};

const inputEl = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

btn.disabled = true;

flatpickr(inputEl, options);
btn.addEventListener('click', onBtnClick);

function getTime(selectedDate) {
  if (this.defaultDate > selectedDate) {
    Notify.failure('Please choose a date in the future', {
      clickToClose: true,
    });
    return;
  }
  btn.disabled = false;
  selectedTime = selectedDate;
}

function onBtnClick() {
  const { status } = BUTTON_UI;
  if (status === 'start') {
    BUTTON_UI.status = 'stop';
    setTimer();
    intervalId = setInterval(setTimer, 1000);
    btn.textContent = BUTTON_UI.stop.text;
  } else {
    BUTTON_UI.status = 'start';
    clearInterval(intervalId);
    btn.textContent = BUTTON_UI.start.text;
  }
}

function setTimer() {
  const currentTime = Date.now();
  const deltaTime = selectedTime - currentTime;

  if (deltaTime < 1000) {
    outputTimerValue(convertMs(deltaTime));
    clearInterval(intervalId);
    return;
  }
  outputTimerValue(convertMs(deltaTime));
}

function outputTimerValue({ days, hours, minutes, seconds }) {
  daysOutput.textContent = days;
  hoursOutput.textContent = hours;
  minutesOutput.textContent = minutes;
  secondsOutput.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
