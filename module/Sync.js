import { TwitterAPI } from './Twitter'
import { Message } from './Message'
import { IntervalLoop } from './IntervalLoop'
import { eventify, eventify_clear, array_remove } from './utils/Utils'
import { ManageState } from './ManageState'
import { MessageFactory } from './MessageFactory';

export class Sync {

    constructor(mailBox, options = {}) {
        this.twitter = TwitterAPI.get_client()
        this.mailBox = mailBox
        this.MangeState = new ManageState(mailBox)
        console.log('current state:', Object.keys(ManageState.states)[this.MangeState.currentState], this.MangeState.currentState)

        let { wait_interval } = options
        wait_interval = !wait_interval ? 1000 : wait_interval
        this._loop = async () => {
            await this.MangeState.handle()
            // await this.receiveNewMessages()
            // await this.sendQueueMessages()
        }
        this.loop = new IntervalLoop({
            loop_function: this._loop,
            wait_interval: wait_interval,
        })
        // this.clear_sending()
        this.init_sending()
    }

    start() {
        // this.loop.start()
        this._loop();
    }

    stop() {
        // this.loop.stop() 
        this.clear_sending() /////////////////////////////////////////////////////////////////////////
    }

    init_sending() {
        eventify(this.mailBox.messages_queue, 'push', (message) => {
            this.sendNewMessage(message)
        })
    }

    clear_sending() {
        eventify_clear(this.mailBox.messages_queue)
    }


    async sendNewMessage(message) {
        if (message.status === Message.StatusCodes.message) {
            return await this.sendNormalMessage(message);
        }
        else {
            return await this.sendMessage(message);
        }
    }

    async sendNormalMessage(message) {
        if (this.MangeState.ready_to_send) {
            let public_key = this.mailBox.contacts.get_contact_key(message.to)

            /////cand add ask for key here///////////////////////////////////////////////////////////
            if(!public_key){
                console.log("i dont have a public key of destination, error");
                return;
            }
            console.log("the key i'll encrypt message with is :", public_key)

            //encryption 
            let encrypt_message = await new MessageFactory(this.mailBox).encrypted_message(message.to, message.body)

            let id = await this.twitter.post(encrypt_message.to_JSON())
            message.addAttributes({ twitterId: id })
            console.log('sent a new encrypted message: ', message)
            array_remove(this.mailBox.messages_queue, message)
            this.mailBox.sent_messages.push(message)
        } else {
            console.log('not ready to send yet.')
        }
    }

    async sendMessage(message) {
        try {
            let id = await this.twitter.post(message.to_JSON())
            message.addAttributes({ twitterId: id })
            console.log('sent a new message: ', message)
            array_remove(this.mailBox.messages_queue, message)
            this.mailBox.sent_messages.push(message)
        } catch (err) {
            console.log('failed sending, will do again later', err)
        }
    }

    async sendQueueMessages() {
        for (let message of this.mailBox.messages_queue) {
            await this.sendNewMessage(message)
        }
    }

    async clearTwitter() {
        console.log('clean all Twitter messages')
        let messages = await this.twitter.pull_all()
        messages.forEach(async (item) => {
            await this.twitter.destroy(item.id)
        })
    }
}
