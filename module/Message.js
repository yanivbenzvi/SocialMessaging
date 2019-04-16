export class Message {

    /**
     * Message constructor.
     * @param {Object} message
     */
    constructor(message = {}) {
        const {to, from, timeStamp, textMessage} = message

        this.to          = to
        this.from        = from
        this.timeStamp   = timeStamp
        this.textMessage = textMessage
        this.readed      = false
        this.mKey        = to + from + timeStamp
        //this.mKey        = this.mKey.replace(/ /g, '')/**this is the key of the message*/
    }
}
