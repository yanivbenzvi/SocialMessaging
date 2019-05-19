import {Message} from './Message.js'

export class MessageFactory {
    constructor(mailBox) {
        this.mailBox = mailBox
    }

    get_handshake(to) {
        return this._basic_message(to, Message.StatusCodes.ask_for_handshake, '')
    }

    post_handshake(to) {
        return this._basic_message(to, Message.StatusCodes.post_handshake, 'this is handshake')
    }

    get_key(to) {
        return this._basic_message(to, Message.StatusCodes.ask_for_key, '')
    }

    post_key(to) {
        return this._basic_message(to, Message.StatusCodes.post_key, 'this is my key, take it')
    }

    message(to, body) {
        // need to add encryption to this body, access encryption methods through this.mailBox
        return this._basic_message(to, Message.StatusCodes.message, body)
    }

    _basic_message(to, status, body) {
        return new Message({
            to:     to,
            from:   this.mailBox.ownerName,
            status: status,
            time:   new Date(),
            body:   body,
        })
    }
}
