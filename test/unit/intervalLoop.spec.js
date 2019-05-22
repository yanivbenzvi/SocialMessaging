import { IntervalLoop } from '../../module/IntervalLoop'

const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const sinon = require("sinon");

async function sleep(time) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve() }, time) })
}

describe('IntervalLoop', () => {
    describe('#start && #stop', () => {
        it("should stop looping after 10 loops", async () => {
            let loop = new IntervalLoop({ wait_interval: 1 });

            var counter = 10
            let stop_after_10_message_read = async () => {
                counter--;
                if (counter == 0) {
                    loop.stop();
                }
            }
            loop.loop_function = stop_after_10_message_read;
            let spy = sinon.spy(loop,"loop_function")

            expect(spy.called).to.be.false;
            loop.start();
            await sleep(500);
            expect(spy.callCount).to.be.equal(10);
        });
    });
});