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
let date;
btnEl.disabled = 'disabled';

flatpickr(inputEl, options);

function getTime(selectedDate) {
  if (selectedDate.getTime() < this.defaultDate.getTime()) {
    alert('Please choose a date in the future');
    return;
  }
  date = selectedDate;
  console.log(date);
  btnEl.removeAttribute('disabled');
}
