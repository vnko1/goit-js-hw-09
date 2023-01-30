import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getTime.call(options, selectedDates[0]);
  },
};

const inputEl = document.getElementById('datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysOutput = document.querySelector('data-days');
const hoursOutput = document.querySelector('data-hours');
const minutesOutput = document.querySelector('data-minutes');
const secondsOutput = document.querySelector('data-seconds');

btnEl.disabled = 'disabled';

let date;

// document.addEventListener('click', onStartClick);

flatpickr(inputEl, options);

// function onStartClick() {
//   setInterval(updateCounter, 1000);
// }

// function updateCounter() {
//   daysOutput.textContent = convertMs(date).days;
//   secondsOutput.textContent = convertMs(date).seconds;
// }

function getTime(selectedDate) {
  if (selectedDate.getTime() < this.defaultDate.getTime()) {
    alert('Please choose a date in the future');
    return;
  }
  date = selectedDate;
  console.log(date.getUTCMilliseconds());
  btnEl.removeAttribute('disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
