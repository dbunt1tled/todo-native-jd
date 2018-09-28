const UI = (function () {
    const ul = document.querySelector('section ul.mainList');
    const emptyAlert = document.querySelector('.empty-alert');
    const listTemplate = function (task) {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center')

        li.setAttribute('data-id', task.id);
        let spanEdit = document.createElement('span');
        spanEdit.append(task.text);

        let iconDelete = document.createElement('i');
        iconDelete.classList.add('fas', 'fa-trash-alt', 'ml-auto', 'delete-item');
        let iconEdit = document.createElement('i');
        iconEdit.classList.add('fas', 'fa-edit', 'ml-4', 'edit-item');
        li.appendChild(spanEdit);
        li.appendChild(iconDelete);
        li.appendChild(iconEdit);
        return li;
    }
    const addTask = function (task) {
        ul.insertAdjacentElement('afterbegin',listTemplate(task));
    }
    const removeTask = function (id) {
        const li = ul.querySelector(`[data-id="${id}"]`);
        console.log(li);
        if(li) {
            li.remove();
        }
    }
    const clearList = function () {
        /*const li = ul.querySelectorAll(`li`);
        li.forEach(item => item.remove());/**/
        ui.innerHTML = '';
    }
    const checkList = function () {
        if(!ul.children.length){
            emptyAlert.style.display = 'block';
        }else{
            emptyAlert.style.display = 'none';
        }
    }
    return {
        addTask,
        removeTask,
        clearList,
        checkList,
    }
}());