import './index.html';
import './index.scss';

import {initControl} from './modules/control.js';
import {initTodo} from './modules/todo';

const initPomodoro = () => {
	initTodo();
	initControl();
};

initPomodoro();
