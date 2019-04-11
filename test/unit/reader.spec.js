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

// #TODO add more proper tests
describe('Reader', () => {
    describe('#read_always', () => {
        it("should stop reading after a single pull", (done)=>{
            let reader = new Reader();
            let handler = {
                counter: 1,
                on_new_messages: (messages) => {
                    if(handler.counter>1) handler.counter--;
                    else reader.stop();
                },
                on_no_new_messages: () => {
                    if(handler.counter>1) handler.counter--;
                    else reader.stop();
                },
                on_start: () => {},
                on_loop: () => {},
                on_stop: () => {},
                wait_interval: 0,
            };
            let spy = chai.spy.on(handler,'on_loop')
            handler.on_stop = () => {
                async_expect(done,()=>{expect(spy).to.not.be.called()})
            }
            reader.handle(handler)
            reader.start();
        });
    }); 
    
    // describe("test", () => {
    //     it("should be funny", async () => {
    //         let r = new Reader();
    //         r.handle({on_start:()=>{console.log("r1");}})
    //         r.handle({on_start:()=>{console.log("r2");}})
    //         r.start();
    //         await new Promise((resolve,reject)=>{
    //             setTimeout(()=>{resolve()} , 500);
    //         })
    //         r.stop();
    //     })
    // })
});