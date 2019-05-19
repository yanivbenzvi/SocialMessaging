export class MessageData {
    /**
     * Message constructor.
     * @param {Object} message
     */
    constructor(message = {}) {
        this.from_object(message)
    }

    static get StatusCodes() {
        return {
            message:   0,
            post_key:  1,
            get_Key:   2,
            handShake: 3,
        }
    }


    from_object(obj) {
        const {to, from, status, time, body} = obj
        this.to                              = to
        this.from                            = from
        this.status                          = status
        this.time                            = time
        this.body                            = body
        return this
    }

    to_object() {
        return {
            'to':     this.to,
            'from':   this.from,
            'status': this.status,
            'time':   this.time,
            'body':   this.body,
        }
    }

    from_JSON(message) {
        message = JSON.parse(message)
        return this.from_object(message)
    }

    to_JSON() {
        return JSON.stringify(this.to_object())
    }

    static _attributes_order() {
        return ['to', 'from', 'status', 'time', 'body']
    }

    static _terminal() {
        return '/~?'
    }

    from_string(str) {
        let keys    = MessageData._attributes_order()
        let values  = str.split(MessageData._terminal())
        let message = {}
        if (keys.length != values.length) {
            return false
        }
        for (let i = 0; i < keys.length; i++) {
            message[keys[i]] = values[i]
        }
        return this.from_object(message)
    }

    is_valid() {
        for (let attr of MessageData._attributes_order()) {
            if (!(attr in this)) {
                return false
            }
        }
        return true
    }

    to_string() {
        if (!this.is_valid()) {
            return null
        }
        let str_arr = []
        for (let attr of MessageData._attributes_order()) {
            str_arr.push(this[attr])
        }
        return str_arr.join(MessageData._terminal())
    }
}
