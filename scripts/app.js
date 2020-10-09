var countTodos = 0;
var countCompleted = 0;

//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

const p = document.getElementById('msg'); 

//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);

function addTodo(event) {
    //prevents the form from submitting
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    if(todoInput.value === '') {
        alert('Input field is empty!');
    }
    else {
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add("complete-btn");
        todoDiv.appendChild(completedBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);

        //error prevention
        if(countTodos === 0) {
            countTodos++;
            p.style.display = 'none';
            updateCounters(countTodos, countCompleted);
        }
        else {
            countTodos++;
            updateCounters(countTodos, countCompleted);
        }
        //console.log(countTodos);

        //clearing the input field
        todoInput.value = '';
    }
}

function deleteAndCheck(event) {
    // console.log(event.target);
    const item = event.target;
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('removing');
        todo.addEventListener('animationend', () => {
            item.parentElement.remove();
        });
        //item.parentElement.remove();
        countTodos--;
        
        if(countTodos === 0) {
            // p.style.display = 'block';
            document.getElementById('all-todos').style.display = 'none';
            //let all = document.getElementById('all-todos');
            //all.style.display = 'none';
            document.getElementById('completed-todos').style.display = 'none';;
            //completes.style.display = 'none';
            p.style.display = 'block';
        }
        else {
            updateCounters(countTodos, countCompleted); 
        }
    }

    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        countCompleted++;
        updateCounters(countTodos, countCompleted);
    }
}

function updateCounters(countTodos, countCompleted) {
    msgAllTodos = "Total number of tasks: " + countTodos;
    document.getElementById('all-todos').innerHTML = msgAllTodos;
}