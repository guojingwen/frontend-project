class EventEmmitter {
    events = {}
    on(name, fn) {
        const events = this.events[name] ??= [];
        events.push(fn);
    }
    emit(name, data) {
        const events = this.events[name] ??= [];
        events.forEach(fn => fn(data));
    }
    off(name, fn) {
        const events = this.events[name] ??= [];
        if(!fn) {
            this.events[name].length = 0;
        } else {
            this.events[name] = events.filter(
                item => ![item, item.cb].includes(fn)
            )
        }
    }
    once(name, fn) {
        const once = (arg) => {
            fn(arg);
            this.off(name, once);
        }
        once.cb = fn;
        this.on(name, once)
    }
}

const event = new EventEmmitter();
event.once('my-event', function(data) {
    console.log('my-event exec', data);
});
event.emit('my-event', 'hello');
event.emit('my-event', 'how are you');