/* Part 1
For this assignment you will be combining your knowledge of DOM access and events to build a todo app!
As a user, you should be able to:
Add a new todo (by submitting a form)
Mark a todo as completed (cross out the text of the todo)
Remove a todo
Part 2
Now that you have a functioning todo app, save your todos in localStorage! Make sure that when the page refreshes, the todos on the page remain there.
 */

// code for backgroundColor Change
document.addEventListener("mousemove", colorChange);
function colorChange(e){
    const g = Math.floor(e.pageX * 256 / window.innerWidth);
    const b = Math.floor(e.pageY * 256 / window.innerHeight);
    
    document.body.style.backgroundColor = `rgb(0,${g}, ${b})`   
};

// Part 1

const form = document.querySelector('#add-todolist'); //My todo-list app form
const input = document.querySelector('#addTodos') // Add a new todo (by submitting a form)
const todoList = document.querySelector('#myTodoList') // ul

// remove & strikethroug event delegation
todoList.addEventListener('click', function(e) { 
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    } else if (e.target.tagName === 'INPUT') {
        const listItem = e.target.parentElement;
        listItem.classList.toggle('strikethrough'); // Toggle the 'strikethrough' class and linked to CSS
    }
});

const mytodolist = form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newList = document.createElement('li');
    const removeBtns = document.createElement('button');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    removeBtns.innerText = 'Remove';
    newList.innerText = input.value;
    newList.appendChild(checkBox);
    newList.appendChild(removeBtns);
    todoList.appendChild(newList);
    input.value = '';
});

// pt.2 
// Now that you have a functioning todo app, save your todos in localStorage! 
// Make sure that when the page refreshes, the todos on the page remain there.