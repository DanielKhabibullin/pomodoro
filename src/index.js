import './index.html';
import './index.scss';

import { initControl } from './modules/control.js';
import { state } from './modules/state.js';

const initPomodoro = () => {
	initControl();

	state.activeTodo = {
		id: 'default',
		pomodoro: 2,
		title: 'Pomodoro',
	}
}

initPomodoro();