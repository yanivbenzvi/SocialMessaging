import {Message} from './Message.js'

export class MessageFactory {

    static get handshake_text() {
        return 'this is handshake'
    }

    static verify_handshake_message(txt) {
        return txt === MessageFactory.handshake_text
    }

    constructor(mailBox) {
        this.mailBox = mailBox
    }

    ask_for_handshake(to) {
        return this._basic_message(to, Message.StatusCodes.ask_for_handshake, '')
    }

    async post_handshake(to) {
        console.log('##################### handshake ########################')
        console.log('MessageFactory.handshake_text: ', MessageFactory.handshake_text)
        console.log('this.mailBox.contacts.get_contact_key(to): ', this.mailBox.contacts.get_contact_key(to))
        const encrypt_handshake = await this.mailBox.rsa.encrypt3dKey(MessageFactory.handshake_text, this.mailBox.contacts.get_contact_key(to))
        console.log('to: ', to)
        console.log('encrypt_handshake: ', encrypt_handshake)
        return this._basic_message(to, Message.StatusCodes.post_handshake, encrypt_handshake)
    }

    ask_for_key(to) {
        return this._basic_message(to, Message.StatusCodes.ask_for_key, '')
    }

    post_key(to) {
        return this._basic_message(to, Message.StatusCodes.post_key, this.mailBox.rsa.exportPublicKey())
    }

    async message(to, body) {
        // need to add encryption to this body, access encryption methods through this.mailBox
        const encrypt_message = await this.mailBox.rsa.encrypt3dKey(body, this.mailBox.contacts.get_contact_key(to))
        return this._basic_message(to, Message.StatusCodes.message, encrypt_message)
    }

    plain_message(to, body) {
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
