//This is user B.
//B will read all the time from user A

// import {TwitterAPI} from "./twitter"
const TwitterAPI = require('./twitter').TwitterAPI

function set_options(context, options) {
    for (let attr in options) {
        context[attr] = options[attr];
    }
}

class Reader{
    
    constructor(options){
        set_options(this,options);
        this._client = TwitterAPI.get_client();
        if(!this.wait_interval){
            this.wait_interval = 1000;
        }
        this._loop;
    }

    read(...args){
        start(...args);
    }

    start(message_handler) {
        this._loop = setInterval(async ()=>{
            let messages = await this._client.pull_all();
            message_handler(messages);
        },this.wait_interval)
    }

    stop(){ 
        clearTimeout(this._loop);
    }   
}


module.exports = { Reader };

// let x = new Reader();
// x.start((messages)=>{
//     console.log(messages)
// });
// setTimeout(()=>{x.stop();console.log("stopped")},7500)
