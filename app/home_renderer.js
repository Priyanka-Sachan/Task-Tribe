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

    const titleWidget = document.createElement('span');
    titleWidget.classList.add(['title']);
    titleWidget.innerHTML = toDo.title;
    toDoWidget.appendChild(titleWidget);

    const editWidget = document.createElement('img');
    editWidget.classList.add(['edit-icon']);
    editWidget.src = '../assets/icons/edit.svg';
    editWidget.addEventListener('click', () => {
        console.log(`Edit ${toDo.id}: ${toDo.title}`);
    });
    toDoWidget.appendChild(editWidget);

    toDoWidget.addEventListener('mouseover', (e) => {
        editWidget.style.display = 'inline';
    })

    toDoWidget.addEventListener('mouseout', (e) => {
        editWidget.style.display = 'none';
    })

    toDoListWidget.appendChild(toDoWidget);
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