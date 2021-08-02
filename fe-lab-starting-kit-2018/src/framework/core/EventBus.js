class EventBus {
    constructor() {
        this.eventCallbacksPairs = [];
    }

    subscribe(eventType, callback) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);
        if (eventCallbacksPair) {
            eventCallbacksPair.callbacks.push(callback);
        } else {
            this.eventCallbacksPairs.push(new EventCallbacksPairs(eventType, callback));
        }
    }

    publish(eventType, args) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);

        if (!eventCallbacksPair) {
            console.log("no subscribers for event" + eventType);
            return;
        }
        EventCallbacksPairs.callbacks.forEach(callback => callback(args));
    }

    findEventCallbacksPair(eventType) {
        return this.eventCallbacksPairs.find(eventObject => eventObject.eventType === eventType);
    }
}

class EventCallbacksPairs {
    constructor(eventType, callback) {
        this.eventType = eventType;
        this.callbacks = [callback];
    }
}

export const eventBus = new EventBus();