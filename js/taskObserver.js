class TaskObserver {
    constructor() {
        this.observers = [];
    }
    subscribe(fn) {
        this.observers.push(fn);
    }
    unSubscribe(fn) {
        this.observers = this.observers.filter(f => {
            if(f !== fn) {
                return f;
            }
        });
    }
    fire(args) {
        this.observers.forEach(fn =>{
            fn.call(null,args);
        });
    }
}