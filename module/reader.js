//This is user B.
//B will read all the time from user A

// import {TwitterAPI} from "./twitter"
import {TwitterAPI} from '../module/twitter'

function set_options(context, options) {
    for (let attr in options) {
        context[attr] = options[attr]
    }
}

export class Reader {

    constructor(options) {
        set_options(this, options)
        this._client = TwitterAPI.get_client()
        if (!this.wait_interval) {
            this.wait_interval = 1000
        }
        this._stop = false
        this._loop = []
    }

    async get_messages() {
        return await this._client.pull_all()
    }

    read(...args) {
        start(...args)
    }

    start(message_handler) {
        this._stop = false
        let loop   = async () => {
            let messages = await this.get_messages()
            message_handler(messages)
            if (!this._stop) {
                this._loop = setTimeout(loop, this.wait_interval)
            }
        }
        loop()
    }

    stop() {
        clearTimeout(this._loop)
        this._stop = true
    }
}

// function test() {
//     let x = new Reader({ wait_interval: 10 });

//     var counter = 10
//     let stop_after_10_message_read = (m) => {
//         console.log(counter);

//         counter--;
//         if (counter == 0) {
//             console.log("stopping");
//             x.stop()
//         }
//     }
//     x.start(stop_after_10_message_read);
//     setTimeout(() => {
//         x.stop(); console.log("stopped")
//         setTimeout(() => {
//             console.log("done")
//         }, 3000)
//     }, 7000)
// }
