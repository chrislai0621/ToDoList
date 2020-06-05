var app = new Vue({
    el: '#main',//綁哪個div
    data:
    {
        toDoThing:'',
        arrayToDo: JSON.parse(localStorage.getItem("ToDo")) || [],
    },
    methods: {
        AddToDoList: function (toDoThing) {
            var num = this.arrayToDo.length;
            var data = {
                thing: toDoThing,
                date: this.getDate(),
                completed:false
            }
            this.arrayToDo.push(data);
            localStorage.setItem("ToDo", JSON.stringify(this.arrayToDo));
            this.toDoThing='';
            document.getElementById('txtThing').focus();
        },
        UpdateToDoList: function (todo) {
            let index = this.arrayToDo.indexOf(todo);
            this.arrayToDo[index] = todo;
            this.arrayToDo[index].completed = !(todo.completed);
            localStorage.setItem("ToDo", JSON.stringify(this.arrayToDo));
        },
        RemoveToDoList:function (todo) {
            this.arrayToDo.splice(this.arrayToDo.indexOf(todo), 1);
            localStorage.setItem("ToDo", JSON.stringify(this.arrayToDo));
         },
        getDate :function(){
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

    }
});
