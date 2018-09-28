let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let ul = document.querySelector('section ul.mainList');
let btnClearList = document.querySelector('button.clearList');
let addTodoForm = document.forms['addTodoItem'];
let inputTodoText = addTodoForm.elements.todoText;
let notification = document.querySelector('div.notification-alert');
/*
let body = document.body;
let taskWrap = document.querySelector('.task-wrap');
let container = document.querySelector('.container');
let listCard = document.querySelector('.list-card');
let cardBody = document.querySelector('.cardListBody');
let listGroup = document.querySelector('.list-group ');


//Всплытие это от дочернего к родительсткому
//Погружение это родительского к дочернему
listGroup.addEventListener('click', e =>{
    // оставнавливает всплытие
    //e.stopImmediatePropagation();
    console.log('list-group');
    // true если надо отлавливать погружение
},true);
cardBody.addEventListener('click', e =>{
    console.log('cardListBody');
},true);
listCard.addEventListener('click', e =>{
    console.log('list-card');
},true);
container.addEventListener('click', e =>{
    console.log('container');
},true);
taskWrap.addEventListener('click', e =>{
    console.log('task-wrap');
},true);
body.addEventListener('click', e =>{
    console.log('body');
},true);
/**/

let clearListListener = (e) => {
    e.preventDefault();
    console.log('click1');
}
// let clearListListenerTemp = (e) => {
//     e.preventDefault();
//     console.log('click2');
// }
btnClearList.addEventListener('click', clearListListener);
// btnClearList.addEventListener('click', clearListListenerTemp);
// btnClearList.removeEventListener('click', clearListListenerTemp);

generateList(tasks);
ul.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-item')) {
        deleteListItem(e.target.closest('li'));
    }
    if (e.target.classList.contains('edit-item')) {
        e.target.classList.toggle('fa-save');
        if (e.target.classList.contains('fa-save')) {
            editListItem(e.target.closest('li'));
        } else {
            updateListItem(e.target.closest('li'));
        }

    }
});
function message(setting) {
    notification.classList.add(setting.cssClass);
    notification.textContent = setting.text;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.classList.remove(setting.cssClass);
        notification.style.display = 'none';
    },setting.timeout);
}
function editListItem(TaskElement) {
    let span = TaskElement.querySelector('span');
    span.setAttribute('contenteditable', true);
    span.focus();
}
function updateListItem(TaskElement) {
    let id = TaskElement.getAttribute('data-id');
    let span = TaskElement.querySelector('span');
    span.setAttribute('contenteditable', false);
    span.blur();
    tasks = tasks.map( item => {
        if(String(item.id) === String(id)) {
            item.task = span.innerHTML;
        }
        return item;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    message({text:'Todo successfully updated',cssClass: 'alert-info', timeout:4000});
}

function deleteListItem(TaskElement) {
    let id = TaskElement.getAttribute('data-id');
    TaskElement.remove();
    tasks = tasks.filter( item => String(item.id) !== String(id) );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    message({text:'Todo successfully removed',cssClass: 'alert-danger', timeout:4000});
}

addTodoForm.addEventListener('submit', e => {
    e.preventDefault();
    if ( !inputTodoText.value ) {
        inputTodoText.classList.add('is-invalid');
    }else {
        inputTodoText.classList.remove('is-invalid');
        addToList({id: guid(), task: inputTodoText.value});
        addTodoForm.reset();
    }
});
inputTodoText.addEventListener('keyup', e =>{
    e.preventDefault();
    if ( !inputTodoText.value ) {
        inputTodoText.classList.add('is-invalid');
    }else {
        inputTodoText.classList.remove('is-invalid');
    }
});
function clearList() {
    ul.innerHTML = '';
}
function addToList(task) {
    tasks.unshift(task);
    ul.insertAdjacentElement('afterbegin',listTemplate(task));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    message({text:'Todo successfully added',cssClass: 'alert-success', timeout:4000});
}
function generateList(tasks) {
    clearList();
    tasks.forEach( value => {
        ul.appendChild(listTemplate(value));
    });
}
function listTemplate(task) {
    let li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center')

    li.setAttribute('data-id', task.id);
    let spanEdit = document.createElement('span');
    spanEdit.append(task.task);

    let iconDelete = document.createElement('i');
    iconDelete.classList.add('fas', 'fa-trash-alt', 'ml-auto', 'delete-item');
    let iconEdit = document.createElement('i');
    iconEdit.classList.add('fas', 'fa-edit', 'ml-4', 'edit-item');
    li.appendChild(spanEdit);
    li.appendChild(iconDelete);
    li.appendChild(iconEdit);
    return li;
}
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}