import './index.html';
import './index.scss';

import { initControl } from './modules/control.js';
import { state } from './modules/state.js';
import { initTodo } from './modules/todo';

const initPomodoro = () => {
	initTodo();
	initControl();
}

initPomodoro();