import { read } from "fs";
import { resolve } from "dns";

//This is user B.
//B will read all the time from user A


class BaseReader{

    constructor(twitterApi){
        this._client = twitterApi;
        this.wait_interval = 0;
        this._timeouts = {};
    }

    async _read() {
        return new Promise((resolve,reject)=>{
            this._client.pull_all().then((messages)=>{
                if (messages.length != 0) { //a new message arrived
                    if(this.on_new_messages){
                        this.on_new_messages(messages);
                    }
                } else {
                    if(this.on_no_new_messages){
                        this.on_no_new_messages();
                    }
                }
                this._timeouts.wait = setTimeout(()=>{
                    resolve();
                },this.wait_interval)
            })
        })
    }

    stop(){ 
        this.continue = false;
        clearTimeout(this._timeouts.loop);
        clearTimeout(this._timeouts.wait);
        if(this.on_stop) this.on_stop()
    }   

    start(){
        if(this.on_start) this.on_start();
        this.continue = true
        this._loop();
    }

    async _loop(){
        await this._read();
        if (this.continue) {
            this._timeouts.loop = setTimeout(() => this.start(), this.wait_interval);
        }
    }
}

class Reader{

    static _overrideables() {
        return ['on_new_messages','on_no_new_messages','wait_interval','on_stop',"on_start"]
    }

    static _default_handler() {
        return {
            on_new_messages: (messages) => {
                console.log("new messages:");
                messages.map(message => {
                    console.log("the message: " + message.text + " , id: " + message.id);
                })
            },
            on_no_new_messages: () => {
                console.log("no new messages");
            },
            wait_interval: 1000,
        }
    }

    constructor(reader, handler = Reader._default_handler()){        
        this.reader = reader;
        for(let attr of Reader._overrideables()){
            if(attr in handler)
                this.reader[attr] = handler[attr];
        }
    }

    stop(){
        this.reader.stop();
    }

    async start() {
        await this.reader.start();
    }
}

module.exports = { Reader , BaseReader };