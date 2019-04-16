import {Message} from '../../module/Message'

const expect = require('chai').expect

describe('Message', () => {
    it('has the follow attribute', () => {
        const stub = new Message()
        const attribute = Object.keys(stub)

        expect(attribute).to.be.eql(['to', 'from', 'timeStamp'])
    })
})