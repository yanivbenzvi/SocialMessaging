import { TwitterAPI } from '../../module/twitter'
import { BaseReader, Reader } from '../../module/reader'

const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const sinon = require("sinon");

async function sleep(time) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve() }, time) })
}

describe('Reader', () => {
    describe('#read_always', () => {
        it("should stop reading after 10 reads", async () => {
            let reader = new Reader({ wait_interval: 1 });
            let get_messages_spy = sinon.stub(reader, "get_messages").callsFake(async () => {
                return await new Promise((resolve, reject) => {
                    setTimeout(() => { resolve([]) }, 0)
                })
            });
            var counter = 10
            let stop_after_10_message_read = (m) => {
                counter--;
                if (counter == 0) {
                    reader.stop()
                }
            }
            expect(get_messages_spy.called).to.be.false;
            reader.start(stop_after_10_message_read);
            await sleep(100)
            expect(get_messages_spy.callCount).to.be.equal(10);
        });
    });
});