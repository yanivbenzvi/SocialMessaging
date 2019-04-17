//This is user B.
//B will read all the time from user A

// import {TwitterAPI} from "./twitter"
const TwitterAPI = require('./twitter').TwitterAPI

class Reader{
    
    constructor(){
        this._client = TwitterAPI.get_client();
        this.wait_interval = 5000;
        this._loop;
    }

    read(message_handler) {
        this._loop = setInterval(async ()=>{
            let messages = await this._client.pull_all();
            message_handler(messages);
        },this.wait_interval)
    }

    stop(){ 
        clearTimeout(this._loop);
    }   
}


// module.exports = { Reader };

// let x = new Reader();
// x.read((messages)=>{
//     console.log(messages)
// });
// setTimeout(()=>{x.stop();console.log("stopped")},7500)
