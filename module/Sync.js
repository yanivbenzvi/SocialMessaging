import {TwitterAPI}                             from './Twitter'
import {Message}                                from './Message'
import {IntervalLoop}                           from './IntervalLoop'
import {eventify, eventify_clear, array_remove} from './utils/Utils'
import {ManageState}                            from './ManageState'

export class Sync {

    constructor(mailBox, options = {}) {
        this.twitter = TwitterAPI.get_client()
        this.mailBox = mailBox
        this.MangeState = new ManageState()

        let {wait_interval} = options
        wait_interval       = !wait_interval ? 1000 : wait_interval
        this.loop           = new IntervalLoop({
            loop_function: async () => {
                this.MangeState.handleState()
                await this.receiveNewMessages()
                await this.retryFailedMessages()
            },
            wait_interval: wait_interval,
        })
    }

    start() {
        this.clear_sending()
        this.init_sending()
        this.loop.start()
    }

    stop() {
        this.loop.stop()
        this.clear_sending()
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

    async receiveNewMessages() {
        let messages = await this.twitter.pull_all()
        console.log(messages)

        let relevent_messages = messages.map(obj => {
            let {id, text}  = obj
            let cur_message = new Message()
            cur_message.from_JSON(text)
            cur_message.addAttributes({twitterId: id})
            return cur_message
        }).filter((message) => {
            return message.to === this.mailBox.ownerName
        })

        let key_messages = relevent_messages.filter((message)=>{
            return message.status==Message.StatusCodes.key;
        })
        handle_key_messages(key_messages);

         let handshake_messages = relevent_messages.filter((message)=>{
             return message.status==Message.StatusCodes.handShake;
         })
        handle_handshake_messages(handshake_messages)

        //destroy
        relevent_messages.forEach(async message => {
            this.mailBox.received_messages.push(message)
            await this.twitter.destroy(message.twitterId)
        })
    }

    async sendNewMessage(message) {
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

    async retryFailedMessages() {
        for (let message of this.mailBox.messages_queue) {
            await this.sendNewMessage(message)
        }
    }
}
