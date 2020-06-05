var app = new Vue({
    el: '#main',//綁哪個div
    data:
    {
        toDoThing:'',
        arrayToDo: JSON.parse(localStorage.getItem("ToDo")) || []
     },
    methods: {
        addToDoList: function (toDoThing) {
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
        updateToDoList: function (todo) {
            //為什麼抓到的todo不是勾選後的資料，有onchange事件嗎?
            let index = this.arrayToDo.indexOf(todo);
            this.arrayToDo[index] = todo;
            this.arrayToDo[index].completed = !(todo.completed);
            localStorage.setItem("ToDo", JSON.stringify(this.arrayToDo));
            
        },
        removeToDoList:function (todo) {
            this.arrayToDo.splice(this.arrayToDo.indexOf(todo), 1);
            localStorage.setItem("ToDo", JSON.stringify(this.arrayToDo));
         },
        removeCompletedData:function()
        {
            this.arrayToDo = this.arrayToDo.filter(e => e.completed != true);
            localStorage.setItem("ToDo", JSON.stringify(this.arrayToDo));
        },
        completToDo:function () {
            for (let i = 0; i < this.arrayToDo.length ; i++)
            {
                this.arrayToDo[i].completed =true;
            }
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
        },
        getShowCompleted:function () {
            return this.arrayToDo.filter(e => e.completed == true).length > 0;
        }
        ,
        getShowToDo: function () {
            return this.arrayToDo.filter(e => e.completed == false).length > 0;
        }

    }
});
