import md5 from 'md5'
export class Message {
    /**
     * Message constructor.
     * @param {Object} message
     */
    constructor(message = {}) {
        const { to, from, time, body } = message

        this.to = to
        this.from = from
        this.time = time
        this.body = body
        this.readed = false
        this.mKey = md5(to + from + time)
    }

    from_object(obj) {
        const { to, from, time, body } = obj;
        this.to = to;
        this.from = from;
        this.time = time;
        this.body = body;
        this.readed = false;
        this.mKey = md5(to + from + body + time);
        return true;
    }

    to_object() {
        return {
            'to': this.to,
            'from': this.from,
            'time': this.time,
            'body': this.body,
        };
    }

    from_JSON(message) {
        message = JSON.parse(message);
        return this.from_object(message);
    }

    to_JSON() {
        return JSON.stringify(this.to_object());
    }

    static _attributes_order() {
        return ['to', 'from', 'time', 'body']
    }

    static _terminal() {
        return "/~?"
    }

    from_string(str) {
        let keys = Message._attributes_order();
        let values = str.split(Message._terminal());
        let message = {}
        if (keys.length != values.length)
            return false;
        for (let i = 0; i < keys.length; i++) {
            message[keys[i]] = values[i];
        }
        return this.from_object(message);
    }

    is_valid() {
        for (let attr of Message._attributes_order()) {
            if (!(attr in this))
                return false;
        }
        return true;
    }

    to_string() {
        if (!this.is_valid()) return null;
        let str_arr = []
        for (let attr of Message._attributes_order()) {
            str_arr.push(this[attr])
        }
        return str_arr.join(Message._terminal());
    }
}
