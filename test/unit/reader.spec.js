import { TwitterAPI } from '../../twitter_module/twitter'
import { BaseReader, Reader } from '../../twitter_module/reader'

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const should = chai.should;


function async_expect(done,expectation){
    setTimeout(()=>{
        try{
            expectation();
            done()
        }
        catch(err){
            done(err);
        }
    },0)
}

// #TODO add proper tests
describe.only('Reader', () => {
    describe('#read_always', () => {
        it("should stop reading after a single pull", (done)=>{
            let base_reader = new BaseReader(new TwitterAPI());
            let handler = {
                counter: 1,
                on_new_messages: (messages) => {
                    if(handler.counter>1) handler.counter--;
                    else base_reader.stop();
                },
                on_no_new_messages: () => {
                    if(handler.counter>1) handler.counter--;
                    else base_reader.stop();
                },
                on_start: () => {},
                on_loop: () => {console.log("called loop");},
                on_stop: () => {},
                wait_interval: 0,
            };
            let spy = chai.spy.on(handler,'on_loop')
            handler.on_stop = () => {
                async_expect(done,()=>{expect(spy).to.not.be.called()})
            }
            let reader = new Reader(base_reader,handler);
            reader.start();
        });
    });   
});