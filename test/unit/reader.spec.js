import { TwitterAPI } from '../../twitter_module/twitter'
import { BaseReader, Reader } from '../../twitter_module/reader'

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const should = chai.should;

// #TODO add more proper tests
describe('Reader', () => {
    describe('#read_always', () => {
        it("should stop reading after a single pull", ()=>{
            let reader = new Reader({wait_interval:0});
            let stop_after_one_message_read = (m)=>{console.log("stopped");reader.stop()}
            reader.start(stop_after_one_message_read);
        });
    }); 
});