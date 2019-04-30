import { Sync } from '../../module/Sync'
import { MailBox} from '../../module/MailBox'

const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const sinon = require("sinon");

async function sleep(time) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve() }, time) })
}

describe.only('Sync', () => {
    describe('#read_always', () => {
        it("should stop reading after 10 reads", async () => {
            let sync = new Sync(new MailBox(),{ wait_interval: 1 });

            var counter = 10
            let stop_after_10_message_read = () => {
                counter--;
                if (counter == 0) {
                    sync.stop();
                }
            }

            let get_messages_spy = sinon.stub(sync, "refresh").callsFake(async () => {
                await sleep(0);
                stop_after_10_message_read();
            });

            expect(get_messages_spy.called).to.be.false;
            sync.start();
            await sleep(500);
            expect(get_messages_spy.callCount).to.be.equal(10);
        });
    });
});