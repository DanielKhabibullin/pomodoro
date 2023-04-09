import workMp3 from '/Daniel/courses/methed/pomodoro/src/audio/wave2.mp3';
import breakMp3 from '/Daniel/courses/methed/pomodoro/src/audio/to-be-continued.mp3';
import relaxMp3 from '/Daniel/courses/methed/pomodoro/src/audio/eralash.mp3';
import {state} from './state.js';

// const smthn = require('../audio/august.mp3');
const audio = {
	work: new Audio(workMp3),
	break: new Audio(breakMp3),
	relax: new Audio(relaxMp3),
};

export const alarm = () => {
	audio[state.status].play();
};
