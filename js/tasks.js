//Init Id module
const id = Id;
const Tasks = (function () {
   let tasks = [];
   let instance;

   const getTasks = function () {
       return tasks;
   };
   const setTasks = async function (arrayTasks) {
       tasks = arrayTasks;
       return tasks;
   };
    const clearTasks = async function () {
        tasks = [];
        return tasks;
    };
   const addTask = async function (todo) {
        let task = {};
        task.id = id.generate();
        task.text = todo;
        await tasks.unshift(task);
        return task;
   };
   const removeTask = async function (id) {
        tasks = await tasks.filter(task => task.id !== id);
        return tasks;
   }
   const createInstance = function () {
       return{
           getTasks,
           setTasks,
           addTask,
           removeTask,
           clearTasks,
       }
   }
   return {
       getInstance : function () {
           return instance || (instance = createInstance());
       }
   }
}());