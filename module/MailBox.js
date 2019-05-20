import {Message}          from './Message'
import { Contacts }       from './Contacts';
import { MessageFactory } from './MessageFactory';
import {Rsa}              from './Rsa'

/**this is the main mail box class*/
export class MailBox {

    /**
     *
     * @param MailAddress
     */
    constructor(mailBoxObj = {}) {
        this.ownerName         = mailBoxObj.ownerName
        this.received_messages = []
        this.sent_messages     = []
        this.messages_queue    = []
        this.contacts = new Contacts()
        this.rsa = new Rsa();
    }

    /**
     * This function will get a mail box address and a text to send
     * and will push the message to the message queue.
     */
    sendMessage(to, textMessage) {
        let messageObject = new MessageFactory(this).plain_message(to,textMessage)
        let message = new Message(messageObject)
        this.sendMessageObject(message)
    }

    sendMessageObject(messageObject) {
        this.messages_queue.push(messageObject)
    }

    /**
     * This function will check if there are new messages.
     * @returns {Number}
     */
    checkForNewMessages() {
        return this.received_messages.filter(message => message.readed === false).length
    }

    /**
     * this function will print the message
     * to console and mark the message as readed
     */
    readMessege(Index) {
        this.received_messages[Index].read()
    }

    /**
     * Add both received and sent messages to a new array
     * and will sort the array by date.
     * @returns {Array<Message>}
     */
    getAllMessages() {        
        return Array.from(this.received_messages)
                    .concat(this.sent_messages)
                    .concat(this.messages_queue)
                    .filter(message => message.status == Message.StatusCodes.message)
                    .sort((message1, message2) => {
                        return message1.time > message2.time
                    })
    }
}
