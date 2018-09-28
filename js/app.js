const tasks = Tasks.getInstance();
const ui = UI;
const lStorage = LocalStorage;
const notify = Notification;

const addTaskObserver = new TaskObserver();
addTaskObserver.subscribe(lStorage.update);
addTaskObserver.subscribe(notify.show);
addTaskObserver.subscribe(ui.checkList);

const delTaskObserver = new TaskObserver();
delTaskObserver.subscribe(lStorage.update);
delTaskObserver.subscribe(notify.show);
delTaskObserver.subscribe(ui.checkList);

const clearTaskObserver = new TaskObserver();
clearTaskObserver.subscribe(lStorage.update);
clearTaskObserver.subscribe(notify.show);
clearTaskObserver.subscribe(ui.checkList);

// Init Elements
const form = document.forms['addTodoItem'];
const inputTodoText = form.elements.todoText;
const ul = document.querySelector('section ul.mainList');
const clearList = document.querySelector('.clearList');

window.addEventListener('load', function (e) {
    let ls = lStorage.getTasks();
    if(ls && ls.length) {
        tasks.setTasks(ls)
            .then(() => {
                ls.forEach(task => ui.addTask(task));
            })
            .then(() => ui.checkList());
    }else{
        ui.checkList();
    }

});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ( !inputTodoText.value ) {
        inputTodoText.classList.add('is-invalid');
    }else {
        inputTodoText.classList.remove('is-invalid');
        tasks.addTask(inputTodoText.value)
            .then(task => ui.addTask(task))
            .then(() => addTaskObserver.fire({text:'Todo successfully added',cssClass: 'alert-success', timeout:4000}));
        form.reset();
    }
});
ul.addEventListener('click', (e) => {
    let id = e.target.closest('li').getAttribute('data-id');;
    if (e.target.classList.contains('delete-item')) {
        tasks.removeTask(id)
            .then(() => ui.removeTask(id))
            .then(() => dellTaskObserver.fire({text:'Todo successfully deleted',cssClass: 'alert-danger', timeout:4000}));
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
clearList.addEventListener('click', (e) => {
    e.preventDefault();
    tasks.clearTasks()
        .then(() => ui.clearList())
        .then(() => clearTaskObserver.fire({text:"Todo's successfully clear",cssClass: 'alert-warning', timeout:4000}));
});