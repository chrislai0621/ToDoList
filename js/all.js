var app = new Vue({
    el: '#main',//綁哪個div
    data:
    {
        toDoThing:'',
        arrayToDo: JSON.parse(localStorage.getItem("ToDo")) || [],
        visibility: 'todo'
     },
    methods: {
        addToDoList: function (toDoThing) {           
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
            var milliSecond = d.getMilliseconds();

            var output =parseInt(d.getFullYear() +
                (month < 10 ? '0' : '') + month  +
                (day < 10 ? '0' : '') + day +
                (hour < 10 ? '0' : '') + hour +
                (minute < 10 ? '0' : '') + minute + 
                (second < 10 ? '0' : '') + second +
                (milliSecond < 100 ? '0' : '') + milliSecond);
            return output;
        },
        getShowCompleted:function () {
            return this.arrayToDo.filter(e => e.completed == true).length > 0;
        }
        ,
        getShowToDo: function () {
            return this.arrayToDo.filter(e => e.completed == false).length > 0;
        }

    },
    computed:{
        filterData:function()
        {
            switch (this.visibility)
            {
                case 'all':
                    return this.arrayToDo;
                case 'todo':
                    return this.arrayToDo.filter(element =>
                        element.completed ==false );
                case 'finish':
                    return this.arrayToDo.filter(element =>
                        element.completed == true);
            }
        }
    },
    updated:function () {
            localStorage.setItem("ToDo", JSON.stringify(this.arrayToDo));
    }
    

});
