import { state } from "./state.js";
import { showTime, startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn')

export const changeActiveBtn = (dataUse) => {

	for (let i = 0; i < navigationBtns.length; i++) {
		if (navigationBtns[i].dataset.use === dataUse) {
			navigationBtns[i].classList.add('navigation__btn_active')
		} else {
			navigationBtns[i].classList.remove('navigation__btn_active')
		}
	}
}

const stop = () => {
	clearTimeout(state.timerId);
	state.isActive = false;
	btnStart.textContent = 'Start';
	state.timeLeft = state[state.status] * 60;
	showTime(state.timeLeft);
}

const changeOnPomodoro = () => {
	navigationBtns[1].classList.remove('navigation__btn_active')
	navigationBtns[2].classList.remove('navigation__btn_active')
	navigationBtns[0].classList.add('navigation__btn_active');
	clearTimeout(state.timerId);
	state.isActive = false;
	btnStart.textContent = 'Start';
	state.status = 'work';
	state.timeLeft = state[state.status] * 60;
	showTime(state.timeLeft);
}
navigationBtns[0].addEventListener('click', changeOnPomodoro);

const changeOnBreak = () => {
	navigationBtns[0].classList.remove('navigation__btn_active')
	navigationBtns[2].classList.remove('navigation__btn_active')
	navigationBtns[1].classList.add('navigation__btn_active');
	clearTimeout(state.timerId);
	state.isActive = false;
	btnStart.textContent = 'Start';
	state.status = 'break';
	state.timeLeft = state[state.status] * 60;
	showTime(state.timeLeft);
}
navigationBtns[1].addEventListener('click', changeOnBreak);

const changeOnRelax = () => {
	navigationBtns[0].classList.remove('navigation__btn_active')
	navigationBtns[1].classList.remove('navigation__btn_active')
	navigationBtns[2].classList.add('navigation__btn_active');
	clearTimeout(state.timerId);
	state.isActive = false;
	btnStart.textContent = 'Start';
	state.status = 'relax';
	state.timeLeft = state[state.status] * 60;
	showTime(state.timeLeft);
}
navigationBtns[2].addEventListener('click', changeOnRelax);

export const initControl = () => {
	btnStart.addEventListener('click', () => {
		if (state.isActive) {
			clearTimeout(state.timerId);
			state.isActive = false;
			btnStart.textContent = 'Start';
		} else {
			state.isActive = true;
			btnStart.textContent = 'Pause';
			startTimer();
		}
	});

	btnStop.addEventListener('click', stop);
	showTime(state.timeLeft);
}