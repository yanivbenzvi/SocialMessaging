import { TwitterAPI } from '../../twitter_module/twitter'
import { BaseReader, Reader } from '../../twitter_module/reader'

const expect = require('chai').expect

describe.only('Reader', () => {
    describe('#read_always', () => {
        it("should stop reading after a single pull", ()=>{
            let base_reader = new BaseReader(new TwitterAPI());
            let handler = {
                counter: 1,
                on_new_messages: (messages) => {
                    console.log(handler.counter);
                    if(handler.counter>1) handler.counter--;
                    else base_reader.stop();
                },
                on_no_new_messages: () => {
                    console.log(handler.counter);
                    if(handler.counter>1) handler.counter--;
                    else base_reader.stop();
                },
                on_stop: () => {
                    console.log("was stopped");
                },
                wait_interval: 0,
            };
            let reader = new Reader(base_reader,handler);
            reader.start();
        });
    });
});