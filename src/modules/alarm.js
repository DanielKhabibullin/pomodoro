import mp3 from '/Daniel/courses/methed/pomodoro/src/audio/august.mp3'

//const smthn = require('../audio/august.mp3');
const audio = new Audio(mp3);

export const alarm = () => {
	audio.play();
}