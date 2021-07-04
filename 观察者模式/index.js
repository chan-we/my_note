class PubHub{
    constructor(){
        //里面的元素也都是数组
        this.subscribers = [];
    }

    subscribe(topic,callback){
        let callbacks = this.subscribers[topic];
        if(!callbacks){
            this.subscribers[topic] = [callback];
        }else{
            callbacks.push(callback);
        }
    }

    publish(topic,...args){
        let callbacks = this.subscribers[topic] || [];
        callbacks.forEach(callback => {
            callback(...args);
        });
    }
}

let pubHub = new PubHub();
pubHub.subscribe('SMS',console.log);
pubHub.subscribe('SMS',console.log);
pubHub.publish('SMS','111');