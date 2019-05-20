import {Message} from './Message.js'

export class MessageFactory {

    static get handshake_text(){
        return "this is handshake"
    }
    static verify_handshake_message(decrypted_handshake_message){
        return decrypted_handshake_message.body === MessageFactory.handshake_text
    }

    constructor(mailBox) {
        this.mailBox = mailBox
    }

    ask_for_handshake(to) {
        return this._basic_message(to, Message.StatusCodes.ask_for_handshake, '')
    }

    post_handshake(to) {
        const encrypt_handshake = this.mailBox.rsa.encrypt3dKey(MessageFactory.handshake_text,this.mailBox.contacts.get_contact_key(to))
        return this._basic_message(to, Message.StatusCodes.post_handshake, encrypt_handshake)
    }

    ask_for_key(to) {
        return this._basic_message(to, Message.StatusCodes.ask_for_key, '')
    }

    post_key(to) {
        return this._basic_message(to, Message.StatusCodes.post_key, this.mailBox.rsa.exportPublicKey().replace(/\n/g, ''))
    }

    message(to, body) {
        // need to add encryption to this body, access encryption methods through this.mailBox
        const encrypt_message = this.mailBox.rsa.encrypt3dKey(body,this.mailBox.contacts.get_contact_key(to))
        return this._basic_message(to, Message.StatusCodes.message, encrypt_message)
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
