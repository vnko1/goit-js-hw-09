const body = document.body;
const startBtn = body.querySelector('[data-start]');
const closeBtn = body.querySelector('[data-stop]');

let intervalId = null;

onLoad();

startBtn.addEventListener('click', onStartClick);
closeBtn.addEventListener('click', onStopClick);

function onStartClick({ target }) {
  intervalId = setInterval(
    () => (body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  target.disabled = 'disabled';
  closeBtn.removeAttribute('disabled');
}

function onStopClick({ target }) {
  clearInterval(intervalId);
  target.disabled = 'disabled';
  startBtn.removeAttribute('disabled');
  localStorage.setItem('color', body.style.backgroundColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bgColorSet() {
  body.style.backgroundColor = getRandomHexColor();
}

function onLoad() {
  closeBtn.disabled = 'disabled';
  body.style.backgroundColor = localStorage.getItem('color');
}
