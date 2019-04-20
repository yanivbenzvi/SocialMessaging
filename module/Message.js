import md5 from 'md5'
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
        this.mKey        = md5(to + from + timeStamp)
    }
}
