import {TwitterAPI}                             from './Twitter'
import {Message}                                from './Message'
import {IntervalLoop}                           from './IntervalLoop'
import {eventify, eventify_clear, array_remove} from './utils/Utils'
import {ManageState}                            from './ManageState'
import { MessageFactory } from './MessageFactory';

export class Sync {

    constructor(mailBox, options = {}) {
        this.twitter    = TwitterAPI.get_client()
        this.mailBox    = mailBox
        this.MangeState = new ManageState(mailBox)
        console.log('current state:', Object.keys(ManageState.states)[this.MangeState.currentState], this.MangeState.currentState)

        let {wait_interval} = options
        wait_interval       = !wait_interval ? 1000 : wait_interval
        this._loop = async () => {
            await this.MangeState.handle()
            // await this.receiveNewMessages()
            await this.sendQueueMessages()
        }
        this.loop           = new IntervalLoop({
            loop_function: this._loop,
            wait_interval: wait_interval,
        })
    }

    start() {
        //this.clear_sending()
        // this.init_sending()  /////////////////////////////////////////////////////////////////////
        // this.loop.start()
        this._loop();
    }

    stop() {
        // this.loop.stop() 
        // this.clear_sending() /////////////////////////////////////////////////////////////////////////
    }

    init_sending() {
        eventify(this.mailBox.messages_queue, 'push', (message) => {
            console.log('new task been created: sending new message.')
            this.sendNewMessage(message)
        })
    }

    clear_sending() {
        eventify_clear(this.mailBox.messages_queue)
    }

    
    async sendNewMessage(message) {
        if(message.status === Message.StatusCodes.message){
            return await this.sendNormalMessage(message);
        }
        else{
            return await this.sendMessage(message);
        }
    }

    async sendNormalMessage(message){
        if (this.MangeState.currentState === ManageState.states.ready_to_start_communication) {
            let public_key = this.mailBox.contacts.get_contact_key(message.to)
            console.log("the key i'll encrypt message with is :", public_key)

            //encryption 
            let encrypt_text = await this.mailBox.rsa.encrypt3dKey(message.body, this.mailBox.contacts.get_contact_key(message.to))
            let encrypt_message = new MessageFactory(this.mailBox).plain_message(message.to,encrypt_text)

            let id = await this.twitter.post(encrypt_message.to_JSON())
            message.addAttributes({twitterId: id})
            console.log('sent a new encrypted message: ', message)
            array_remove(this.mailBox.messages_queue, message)
            this.mailBox.sent_messages.push(message)
        } else {
            console.log('not ready to send yet.')
        }
    }

    async sendMessage(message){
        try {
            let id = await this.twitter.post(message.to_JSON())
            message.addAttributes({twitterId: id})
            console.log('sent a new message: ', message)
            array_remove(this.mailBox.messages_queue, message)
            this.mailBox.sent_messages.push(message)
        } catch (err) {
            console.log('failed sending, will do again later', err)
        }
    }

    async sendQueueMessages() {
        console.log("sending messages in queue: ", this.mailBox.messages_queue);
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
