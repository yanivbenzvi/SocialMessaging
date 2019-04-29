export class MailBoxManger {

    static noKey       = 1
    static sendKey     = 2
    static sentMessage = 3


    constructor(){
        this.mailbox
    }

    /**
     * this function will manage and handel every state in our software.
     */
    static mainManger(){
        if(!mailbox.hasTheExternalKey()) // state 1: A/B have not receive external key.
            askForKey()
        else if(this.mailBox.messages_queue.length > 0) //state 2: there is a message to sent.
            MailBoxManger.sentNewMessage()
        //if() // state 3: receive new messages

    }

    static askForKey(){
        new warper({code: this.noKey})

    }

    static async ReceiveNewMessage(){
        let twitter = TwitterAPI.get_client();
        let messages = await twitter.pull_all()

        messages.map(obj => {
            let {id, message} = obj
            let cur_message   = new Message()
            cur_message.from_JSON(message)
            cur_message.twitterId = id
            return cur_message

        }).filter((message) => {
            return message.to === this.id
        }).forEach(async message => {
            this.mailBox.received_messages.push(message)
            await twitter.destroy(message.twitterId)
        })
    }

    static sentNewMessage() {
        console.log('check for new message...')
        let twitter = TwitterAPI.get_client()

        this.mailBox.messages_queue.forEach(async message => {
            let id = await twitter.post(message.to_JSON())
        })
        this.mailBox.sent_messages = this.mailBox.sent_messages.concat(this.mailBox.messages_queue)
        this.mailBox.messages_queue = []
    }
}