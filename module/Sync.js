//This is user B.
//B will read all the time from user A

import { TwitterAPI } from './Twitter'
import { Message } from './Message'
import { IntervalLoop } from './IntervalLoop';
import { eventify, eventify_clear, array_remove } from './utils/Utils';
export class Sync {

    constructor(mailBox, options) {
        this.twitter = TwitterAPI.get_client();
        this.mailBox = mailBox;

        let { wait_interval } = options;
        if (typeof wait_interval === 'undefined') { wait_interval = 1000 }
        this._refresh = async () => { 
            this.receiveNewMessages();
            this.retryFailedMessages 
        };
        this.loop = new IntervalLoop({
            loop_function: this._refresh,
            wait_interval: wait_interval
        })
    }

    start() {
        this.clear_sending();
        this.init_sending()
        this.loop.start();
    }

    stop() {
        this.loop.stop();
        this.clear_sending();
    }

    init_sending() {
        eventify(this.mailBox.messages_queue, "push", (message) => {
            console.log("executing instant event");
            this.sendNewMessage(message);
        })
        console.log("created events in queue : ", this.mailBox.messages_queue);

    }

    clear_sending() {
        eventify_clear(this.mailBox.messages_queue)
    }

    async receiveNewMessages() {
        let messages = await this.twitter.pull_all();
        console.log(messages);
        messages.map(obj => {
            let { id, text } = obj;
            let cur_message = new Message();
            cur_message.from_JSON(text);
            cur_message.addAttributes({ twitterId: id })
            return cur_message;
        }).filter((message) => {
            return message.to === this.mailBox.ownerName;
        }).forEach(async message => {
            this.mailBox.received_messages.push(message);
            await this.twitter.destroy(message.twitterId);
        })
    }

    async sendNewMessage(message) {
        try {
            let id = await this.twitter.post(message.to_JSON());
            message.addAttributes({ twitterId: id });
            console.log('sent a new message: ', message);
            array_remove(this.mailBox.messages_queue, message);
            this.mailBox.sent_messages.push(message);
        }
        catch (err) {
            console.log("failed sending, will do again later", err);
        }
    }
    
    async retryFailedMessages() {
        this.messages_queue.forEach(this.sendNewMessage);
    }
}
