import { changeActiveBtn, stop } from "./control.js";
import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const countElem = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');

const getTodo = () => JSON.parse(localStorage.getItem('pomodoro') || '[]');

const addTodo = (title) => {
		const todo = {
			title,
			pomodoro: 0,
			id: Math.random().toString(16).substring(2, 8),
		};

	const todoList = getTodo();
	todoList.push(todo);

	localStorage.setItem('pomodoro', JSON.stringify(todoList));
	return todo;
};

export const updateTodo = (todo) => {
	const todoList = getTodo();
	if (!todoList.length) {
		return;
	}

	const todoItem = todoList.find((item) => item.id === todo.id);
	todoItem.title = todo.title;
	todoItem.pomodoro = todo.pomodoro;
	localStorage.setItem('pomodoro', JSON.stringify(todoList));
};

const deleteTodo = (todo) => {
	const todoList = getTodo();
	const newTodoList = todoList.filter((item) => item.id !== todo.id);
	if (todo.id === state.activeTodo.id) {
		state.activeTodo = newTodoList[newTodoList.length -1];
	}
	localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
};

const createTodoListItem = (todo) => {
	if (todo.id !== 'default') {
		const todoItem = document.createElement('li');
		todoItem.classList.add('todo__item');

		const todoItemWrapper = document.createElement('div');
		todoItemWrapper.classList.add('todo__item-wrapper');
		todoItem.append(todoItemWrapper);

		const todoBtn = document.createElement('button');
		todoBtn.classList.add('todo__btn');
		todoBtn.textContent = todo.title;
		
		const editBtn = document.createElement('button');
		editBtn.classList.add('todo__edit');
		editBtn.ariaLabel = 'Edit task';

		const delBtn = document.createElement('button');
		delBtn.classList.add('todo__del');
		delBtn.ariaLabel = 'Delete task';

		todoItemWrapper.append(todoBtn, editBtn, delBtn);

		todoListElem.prepend(todoItem);

		todoBtn.addEventListener('click', () => {
			state.activeTodo = todo;
			showTodo();
			changeActiveBtn('work');
			stop();
		});
		editBtn.addEventListener('click', () => {
			todo.title = prompt('Task name', todo.title);
			todoBtn.textContent = todo.title;
			if (todo.id === state.activeTodo.id) {
				state.activeTodo.title = todo.title
			}
			showTodo();
			updateTodo(todo);
		});
		delBtn.addEventListener('click', () => {
			deleteTodo(todo);
			showTodo();
			todoItem.remove();
		});
	}
};

const renderTodoList = (list) => {
	todoListElem.textContent = '';
	list.forEach(createTodoListItem);
};

export const showTodo = () => {
	if (state.activeTodo) {
		titleElem.textContent = state.activeTodo.title;
		countElem.textContent = state.activeTodo.pomodoro; //todo
	} else {
		titleElem.textContent = 'Add some task';
		countElem.textContent = 0;
	}
};

const createBtnAddTodo = () => {
	const li = document.createElement('li');
	li.classList.add('todo__item');

	const todoAddBtn = document.createElement('button');
	todoAddBtn.classList.add('todo__add');
	todoAddBtn.textContent = 'Add new task';
	li.append(todoAddBtn);

	todoAddBtn.addEventListener('click', () => {
		const title = prompt('Enter task name')?.trim();
		if(title) {
			const todo = addTodo(title);
			createTodoListItem(todo);
			state.activeTodo = todo;
			showTodo();
			subtitle.remove(); //todo
		} else {
			alert('Enter correct data');
		}
	});
	
	return li;
};

export const initTodo = () => {
	const todoList = getTodo();
	const subtitle = document.createElement('p');
	subtitle.textContent = 'No tasks here';
	if (!todoList.length) {
		todoListElem.insertAdjacentElement('beforebegin', subtitle);
		state.activeTodo = {
			id: 'default',
			pomodoro: 0,
			title: 'Add some task',
		};
	} else {
		state.activeTodo = todoList[todoList.length -1];
	}

	showTodo();

	renderTodoList(todoList);

	const listItemBtnAddTodo = createBtnAddTodo();

	todoListElem.append(listItemBtnAddTodo);
};

