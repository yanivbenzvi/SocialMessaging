import {TwitterAPI}                             from './Twitter'
import {Message}                                from './Message'
import {IntervalLoop}                           from './IntervalLoop'
import {eventify, eventify_clear, array_remove} from './utils/Utils'
import {ManageState}                            from './ManageState'

export class Sync {

    constructor(mailBox, options = {}) {
        this.twitter    = TwitterAPI.get_client()
        this.mailBox    = mailBox
        this.MangeState = new ManageState(mailBox)

        let {wait_interval} = options
        wait_interval       = !wait_interval ? 1000 : wait_interval
        this.loop           = new IntervalLoop({
            loop_function: async () => {
                await this.MangeState.handleState()
                // await this.receiveNewMessages()
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

    // async receiveNewMessages() {
    //     let messages = await this.twitter.pull_all()
    //     console.log(messages)
    //
    //     let relevent_messages = messages.map(obj => {
    //         let {id, text}  = obj
    //         let cur_message = new Message()
    //         cur_message.from_JSON(text)
    //         cur_message.addAttributes({twitterId: id})
    //         return cur_message
    //     }).filter((message) => {
    //         return message.to === this.mailBox.ownerName
    //     })
    //
    //     //destroy
    //     relevent_messages.forEach(async message => {
    //         this.mailBox.received_messages.push(message)
    //         await this.twitter.destroy(message.twitterId)
    //     })
    // }

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

    async clearTwitter() {
        console.log('clean all Twitter messages')
        let messages = await this.twitter.pull_all()
        messages.forEach(async (item)=>{
            await this.twitter.destroy(item.id);
        })
    }
}
