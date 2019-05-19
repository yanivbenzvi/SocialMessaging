import {TwitterAPI}     from './Twitter'
import {Message}        from './Message'
import {MessageFactory} from './MessageFactory'
import {array_remove}   from './utils/Utils'

export class ManageState {
    constructor(mailBox) {
        this.twitter        = TwitterAPI.get_client()
        this.mailBox        = mailBox
        this.currentState   = ManageState.states.ask_for_handshake
        this.messageFactory = new MessageFactory(this.mailBox)
    }

    static get states() {
        return {
            initial_state:                0,
            ask_for_handshake:            1,
            waiting_for_handshake:        2,
            ask_for_key:                  3,
            waiting_for_key:              4,
            ready_to_start_communication: 5,
        }
    }

    async handleState() {
        console.log('current state:', Object.keys(ManageState.states)[this.currentState], this.currentState)
        const to       = this.mailBox.ownerName === 'A' ? 'B' : 'A'
        //receive all message from twitter
        const messages = await this.getAllTwitterMessage()
        this.handleIncomingMessages(messages)
        //filter message and look for status code {ask_for_handshake} and send handshake

        switch (this.currentState) {
            case ManageState.states.initial_state:
                this.currentState = ManageState.states.ask_for_handshake
                break
            case ManageState.states.ask_for_handshake:
                //send message with status code {handshake} (asking for handshake)
                this.mailBox.sendMessageObject(this.messageFactory.post_handshake(to))
                this.currentState = ManageState.states.waiting_for_handshake
                break
            case ManageState.states.waiting_for_handshake:
                //filter message and look for message with status code {sending_handshake}
                //check if we success to decode message and get agreed message (something like test word)
                //if we not succeed to decode handshake message state will changed to has_no_key
                //else change state to {ready_to_start_communication}
                if (this.verifyHandshake(messages)) {
                    this.currentState = ManageState.states.ready_to_start_communication
                } else {
                    this.currentState = ManageState.states.ask_for_key
                }
                break
            case ManageState.states.ask_for_key:
                //send message with code {ask_for_key}
                this.currentState = ManageState.states.waiting_for_key
                break
            case ManageState.states.waiting_for_key:
                //filter message and look for message with status code {ask_for_key}
                //if we get new key go back to back to {ask_for_handshake}
                this.currentState = ManageState.states.ask_for_handshake
                break
            case ManageState.states.ready_to_start_communication:
                // receive and send message queue !!!!!!!
                break
        }
    }

    async getAllTwitterMessage() {
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

        //destroy
        relevent_messages.forEach(async message => {
            this.mailBox.received_messages.push(message)
            await this.twitter.destroy(message.twitterId)
        })

        return relevent_messages
    }

    verifyHandshake(messages) {
        let handshakes = this.getMessagesByStatusCode(messages, Message.StatusCodes.post_handshake)
        if (handshakes.length === 0) {
            return false
        }
        console.log('recived handshake succesfully')
        return true // should check if handshake actually succeded
    }

    getMessagesByStatusCode(messages, status) {
        return messages.filter(message => message.status === status)
    }


    handleIncomingMessages(messages) {
        messages.forEach((message) => {
            switch (message.status) {
                case Message.StatusCodes.ask_for_key:
                    this.mailBox.sendMessageObject(this.messageFactory.post_key(message.from))
                    break
                case Message.StatusCodes.ask_for_handshake:
                    this.mailBox.sendMessageObject(this.messageFactory.post_handshake(message.from))
                    break
            }
        })
    }


}