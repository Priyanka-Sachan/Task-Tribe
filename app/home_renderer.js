let toDoList = [{
        'id': 1233,
        'status': 0,
        'title': 'Buy choclolate'
    },
    {
        'id': 1283,
        'status': 2,
        'title': 'Buy milk'
    },
    {
        'id': 1237,
        'status': 1,
        'title': 'Study load'
    },
    {
        'id': 1288,
        'status': 0,
        'title': 'Buy toffee'
    },
    {
        'id': 1265,
        'status': 3,
        'title': 'Buy 000'
    },
];

const toDoListWidget = document.getElementById('to-do-list');

function addToDoToList(toDo) {
    const toDoWidget = document.createElement('div');
    toDoWidget.classList.add(['to-do']);

    const statusWidget = document.createElement('span');
    statusWidget.classList.add(['status']);
    statusWidget.innerHTML = toDo.status;
    statusWidget.addEventListener('click', (e) => {
        e.target.innerHTML = (parseInt(e.target.innerHTML) + 1) % 5;
    });
    toDoWidget.appendChild(statusWidget);

    const titleWidget = document.createElement('span');
    titleWidget.classList.add(['title']);
    titleWidget.innerHTML = toDo.title;
    toDoWidget.appendChild(titleWidget);

    toDoListWidget.appendChild(toDoWidget);
}

toDoList.forEach((toDo) => {
    addToDoToList(toDo);
});

const toDoInput = document.getElementById('to-do-input');
const addToDo = document.getElementById('add-to-do');

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
    }
});