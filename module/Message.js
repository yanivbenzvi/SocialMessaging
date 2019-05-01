import { MessageData } from './MessageData';
import md5 from 'md5';

export class Message extends MessageData {

    constructor(messageObject) {
        super(messageObject);
        let { twitterId } = messageObject;
        this.twitterId = twitterId;
        this.readed = false;
        this.mKey = new md5(this.to + this.from + this.time);
    }
}
