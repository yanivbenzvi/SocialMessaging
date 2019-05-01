//This is user B.
//B will read all the time from user A

// import {TwitterAPI} from "./twitter"
import {TwitterAPI} from './Twitter'
import {Message} from './Message'

export class Sync {

    constructor(mailBox, options) {
        for (let attr in options) {
            this[attr] = options[attr]
        }
        if (!this.wait_interval) {
            this.wait_interval = 1000; //1 sec
        }
        this.twitter = TwitterAPI.get_client();
        this.mailBox = mailBox;
        this.contacts = {};
        this._stop = false;
        this._loop;
    }

    async refresh(){
        await this.sendAndReceive();
    }

    start() {
        this._stop = false;
        let loop   = async () => {
            await this.refresh();
            if (!this._stop) {
                this._loop = setTimeout(loop, this.wait_interval);
            }
        }
        loop();
    }

    stop() {
        clearTimeout(this._loop);
        this._stop = true;
    }

    async sendAndReceive() {
        await this.receiveNewMessage();
        await this.sendNewMessage();
    }

    async receiveNewMessage() {
        let messages = await this.twitter.pull_all();
        console.log(messages);
        messages.map(obj => {
            let {id, text} = obj;
            let cur_message   = new Message();
            cur_message.from_JSON(text);
            cur_message.twitterId = id;
            console.log(cur_message);
            return cur_message;
        }).filter((message) => {
            return message.to === this.mailBox.ownerName;
        }).forEach(async message => {
            this.mailBox.received_messages.push(message);
            await this.twitter.destroy(message.twitterId);
        })
    }

    sendNewMessage() {
        this.mailBox.messages_queue.forEach(async message => {
            let id = await this.twitter.post(message.to_JSON());
            console.log('sent a new message: ',id);
        })
        this.mailBox.sent_messages  = this.mailBox.sent_messages.concat(this.mailBox.messages_queue);
        this.mailBox.messages_queue = [];
    }

    sendContactInfo(to){
        let key_message = new Message({
            to: to,
            from: this.mailBox.ownerName,
            time: new Date(),
            body: this.mailBox.own_key(),
        });
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
