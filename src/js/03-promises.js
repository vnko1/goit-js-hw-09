import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputValue = {};

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  getValue(delay, step, amount);
  loopingFunction();
}

function getValue(delay, step, amount) {
  inputValue.delay = Number(delay.value);
  inputValue.step = Number(step.value);
  inputValue.amount = Number(amount.value);
}

function loopingFunction() {
  for (let i = 1; i <= inputValue.amount; i += 1) {
    createPromise(i, inputValue.delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    inputValue.delay += inputValue.step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
