let toDoList = [];

const toDoListWidget = document.getElementById('to-do-list');
const toDoInput = document.getElementById('to-do-input');
const addToDo = document.getElementById('add-to-do');

function getToDos() {
    toDoList = JSON.parse(localStorage.getItem('to-dos')) || [];
    toDoList.forEach((toDo) => {
        addToDoToList(toDo);
    });
}

function saveToDos() {
    localStorage.setItem('to-dos', JSON.stringify(toDoList));
}

function addToDoToList(toDo) {
    const toDoWidget = document.createElement('div');
    toDoWidget.id = toDo.id;
    toDoWidget.classList.add(['to-do']);

    const statusWidget = document.createElement('img');
    statusWidget.classList.add(['status']);
    statusWidget.src = `../assets/icons/circle-${toDo.status}.svg`;
    statusWidget.addEventListener('click', (e) => {
        const id = toDo.id;
        const index = toDoList.findIndex((td) => td.id == id);
        if (index != -1) {
            const updatedStatus = (toDoList[index].status + 1) % 7;
            if (index != -1) {
                toDoList[index].status = updatedStatus;
                statusWidget.src = `../assets/icons/circle-${updatedStatus}.svg`;
                saveToDos();
            }
        }
    });
    toDoWidget.appendChild(statusWidget);

    const titleWidget = document.createElement('textarea');
    titleWidget.classList.add(['title']);
    titleWidget.setAttribute('type', 'text')
    titleWidget.setAttribute('disabled', 'true')
    titleWidget.value = toDo.title;
    titleWidget.addEventListener('keypress', (e, key) => {
        const target = e.target;
        if (e.which == 13) {
            const id = toDo.id;
            const index = toDoList.findIndex((td) => td.id == id);
            if (index != -1) {
                toDoList[index].title = target.value;
                target.setAttribute('disabled', 'true')
                saveToDos();
            }
        }
    });
    toDoWidget.appendChild(titleWidget);

    toDoWidget.addEventListener('mouseover', (e) => {
        const id = toDo.id;
        document.querySelector(`#to-do-list [id='${id}'] .title`).removeAttribute('disabled')
    })

    toDoWidget.addEventListener('mouseout', (e) => {
        const id = toDo.id;
        document.querySelector(`#to-do-list [id='${id}'] .title`).setAttribute('disabled', 'true')
    })

    toDoListWidget.appendChild(toDoWidget);
    autosize(document.querySelectorAll('textarea'));
    autosize.update(document.querySelectorAll('textarea'));
}

addToDo.addEventListener('click', (e) => {
    if (toDoInput.value) {
        const toDo = {
            'id': Date.now(),
            'status': 0,
            'title': toDoInput.value
        }
        toDoList.push(toDo);
        addToDoToList(toDo);
        toDoInput.value = '';
        saveToDos();
    }
});

getToDos();
autosize(document.querySelectorAll('textarea'));
autosize.update(document.querySelectorAll('textarea'));