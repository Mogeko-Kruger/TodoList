//setting the todo list, this array will get the task inserted by the user and be assigned
//as the text (string), the checked (bool) and the id, which is date.now() to assign a
//unique number
let todoItems = [];

function renderTodo (todo) {
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));

    const list = document.querySelector('.js-todo-list');

    // I don't know what these brackets are doing
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done' : '';

    const node = document.createElement('li');

    node.setAttribute('class', `todo-item ${isChecked}`);

    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
    <input id='${todo.id}' type='checkbox'/>
    <label for='${todo.id}' class='tick js-tick'></label>
    
    <span>${todo.text}</span>
    <button class='delete-todo js-delete-todo'>
    <i class="fas fa-times"></i>
    </button>
    `;

    if (item) {
        list.replaceChild(node, item);
    } else {

        list.append(node);

    }
}

function addTodo (text) {
    const Todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(Todo);
    renderTodo(Todo);
}

function toggleDone(key) {
  // findIndex is an array method that returns the position of an element
  // in the array.
  const index = todoItems.findIndex(item => item.id === Number(key));
  // Locate the todo item in the todoItems array and set its checked
  // property to the opposite. That means, `true` will become `false` and vice
  // versa.
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}  

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    const Todo = {
        deleted: true,
        ...todoItems[index]
    };

    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(Todo);
}

const form = document.querySelector(".js-form");

form.addEventListener('submit', event => {

    event.preventDefault();

    const input = document.querySelector('.js-todo-input');
    
    const text = input.value.trim();

    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

const list = document.querySelector('.js-todo-list');

list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
        todoItems = JSON.parse(ref);
        todoItems.forEach(t => {
            renderTodo(t);
        });
    }
});