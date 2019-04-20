import {Message} from 'module/Message'

/**this is the main mail box class*/
export class MailBox {

    /**
     *
     * @param MailAddress
     */
    constructor(mailBoxObj = {}) {
        /the constractor will get the name of the mail box to use as an address/
        this.ownerName           = mailBoxObj.ownerName
        this.received_messages   = []
        this.sent_messages       = []
        this.messages_queue      = []
        this.newMessagesArrIndex = []

    }

    /**
     * this function will get a mail box address and a text to send
     * and will push the message to the message queue
     */
    sendMessage(to, textMessage) {
        let messageObject = {
            to:          to,
            address:     this.address,
            timeStamp:   new Date(),
            textMessage: textMessage,
        }
        let message       = new Message(messageObject)

        this.sent_messages.push(message)
        this.messages_queue.push(message)
    }

    /**
     * This function will check if there are new messages.
     * @returns {Number}
     */
    checkForNewMessages() {
        return this.received_messages.filter(message => message === false).length
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
                    .sort((message1, message2) => {
                        return message1.timeStamp < message2.timeStamp
                    })
    }
}
