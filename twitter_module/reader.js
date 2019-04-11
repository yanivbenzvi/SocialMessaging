//This is user B.
//B will read all the time from user A
const utils = require('./utils');
const TwitterAPI = require('./twitter').TwitterAPI;

class Reader{

    constructor(twitter = new TwitterAPI()){
        this._client = twitter;
        this.wait_interval = 0;
        this._timeouts = {};
    }

    async _read() {
        return new Promise((resolve, reject) => {
            this._client.pull_all().then((messages) => {
                if (messages.length != 0) { //a new message arrived
                    if (this.on_new_messages) {
                        this.on_new_messages(messages);
                    }
                } else {
                    if (this.on_no_new_messages) {
                        this.on_no_new_messages();
                    }
                }
                if (this.continue) {
                    this._timeouts.wait = setTimeout(() => { resolve(); }, this.wait_interval);
                }
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
        if(this.on_loop) this.on_loop();
        if (this.continue) {
            this._timeouts.loop = setTimeout(() => this.start(), this.wait_interval);
        }
    }

    ///////////////////////////////////////////////////////// observe

    static _overrideables() {
        return ['on_new_messages','on_no_new_messages','wait_interval','on_stop',"on_start","on_loop"]
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

    handle(handler = Reader._default_handler()){
        for (let attr of Reader._overrideables()) {
            if (attr in handler) {
                if (attr in this && utils.is_function(this[attr]) && utils.is_function(handler[attr])) {
                    this[attr] = utils.concat_functions(this[attr], handler[attr])
                }
                else
                    this[attr] = handler[attr];
            }
        }
    }
}


module.exports = { Reader };