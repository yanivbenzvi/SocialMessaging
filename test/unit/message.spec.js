import {Message} from '../../module/Message'

const expect = require('chai').expect

describe('Message', () => {
    it('has the follow attribute', () => {
        const message      = new Message()
        const stub = Object.keys(message)
        const attribute = ['to', 'from', 'timeStamp', 'textMessage', 'readed', 'mKey']

        expect(stub).to.be.eql(attribute)
    })
})
