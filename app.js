//selectors
const ToDOInput = document.querySelector('.ToDo-input');
const ToDOButton = document.querySelector('.ToDo-button');
const ToDOList = document.querySelector('.ToDo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos)
ToDOButton.addEventListener('click', addToDo);
ToDOList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addToDo(Event){
    //prevent form from submitting
    Event.preventDefault();
    //todo div
    const ToDoDiv = document.createElement("div");
    ToDoDiv.classList.add("ToDo");
    //create LI
    const newToDo = document.createElement("li")
    newToDo.innerText = ToDOInput.value;
    newToDo.classList.add('ToDo-item');
    ToDoDiv.appendChild(newToDo);
    //add toto to local storage
    savaLocalTodos(ToDOInput.value)
    //check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("completeButton");
    ToDoDiv.appendChild(completeButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trashButton");
    ToDoDiv.appendChild(trashButton);

    //appent to list
    ToDOList.appendChild(ToDoDiv);

    //clear todo input value
    ToDOInput.value = '';
}

function deleteCheck(Event){
   const item =Event.target;
   //delete todo
   if (item.classList[0] === 'trashButton'){
        const ToDO = item.parentElement;
        //animation
        ToDO.classList.add('fall')
        removeLocalTodos(ToDO)
        ToDO.addEventListener('transitionend', function (){
            ToDO.remove()  
        })
        
    }

    //checkmark

    if (item.classList[0] === 'completeButton'){
        const ToDO = item.parentElement;
        ToDO.classList.toggle("completed");  
    }

}

function filterTodo(e){
    const ToDos = ToDOList.childNodes;
    ToDos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                }else {
                    todo.style.display = 'flex';
                }
                break;
        }
    })
    console.log(ToDos);
}

function savaLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
        const ToDoDiv = document.createElement("div");
        ToDoDiv.classList.add("ToDo");
        //create LI
        const newToDo = document.createElement("li")
        newToDo.innerText = todo;
        newToDo.classList.add('ToDo-item');
        ToDoDiv.appendChild(newToDo);
        //check mark button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("completeButton");
        ToDoDiv.appendChild(completeButton);
    
        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trashButton");
        ToDoDiv.appendChild(trashButton);
    
        //appent to list
        ToDOList.appendChild(ToDoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos));
}