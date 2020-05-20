var btnAdd = document.getElementById('btnAdd');
var toDoStr = '';
var arrayToDo = [];
var divlist = document.querySelector('.todolist');
updateToDoList();
function AddToDoList()
{
    var todoThing = document.getElementById('txtThing').value;
    var num =arrayToDo.length;
    var data ={
        num:num,
        thing:todoThing,
        date: getDate()
    }
    arrayToDo.push(data);
    var toDostring = JSON.stringify(arrayToDo);
    localStorage.setItem("ToDo",toDostring);
    updateToDoList();
    document.getElementById('txtThing').value= '';
}
function updateToDoList() {
    var todoList = '';
    toDoStr = localStorage.getItem("ToDo");
    if (toDoStr !== null)
    {
        arrayToDo = JSON.parse(toDoStr); //string to array
        for (let i = 0; i < arrayToDo.length; i++) {
            todoList += '<div class="alert alert-info" role="alert">';
            todoList += '<i data-num="' + i + '"  class="fas fa-trash-alt mr-3 btn-delete"></i>';
            todoList += '<span class="mr-3">' + arrayToDo[i].date + '</span >';
            todoList += '<span>' + arrayToDo[i].thing + '</span >';
            todoList += '</div >';
        }
        divlist.innerHTML = todoList;
          
    }    
}
function RemoveToDoList(e) {
    var nodeName = e.target.nodeName;
    if (nodeName != 'I') { return }
    var index = e.target.dataset.num;
    arrayToDo.splice(index,1);
    var toDostring = JSON.stringify(arrayToDo);
    localStorage.setItem("ToDo", toDostring);
    updateToDoList();
}
btnAdd.addEventListener('click', AddToDoList);
divlist.addEventListener('click', RemoveToDoList);
function getDate()
{
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    var output = d.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day + ' ' + 
        (hour < 10 ? '0' : '') + hour + ':' + 
        (minute < 10 ? '0' : '') + minute + ':' + 
        (second < 10 ? '0' : '') + second;
    return output;
}
