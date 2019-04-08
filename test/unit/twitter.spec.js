import { TwitterAPI } from '../../twitter_module/twitter'
var expect = require('chai').expect

describe('twitter', () => {
    // describe('#connect',()=>{
    //     let twitt = new TwitterAPI();
    //     twitt.lookup().then(console.log)
    // })
    describe('#is_logged_in', async () => {
        it("should say looged in", async () => {
            let good_client = new TwitterAPI();
            return expect(await good_client.is_logged_in()).to.be.eql(true);
        });
        it("should say not logged in", async ()=>{
            let bad_client = new TwitterAPI("asadsa");
            return expect(await bad_client.is_logged_in()).to.be.eql(false);
        })
    })

    describe('#verify message sent', async () => {
        var message = "im a tester";
        let twitt = new TwitterAPI();
        it("should verify the message sent and recived are the same", async () => {
            let posted_id = await twitt.post(message);
            let posted_message = await twitt.pull(posted_id);
            await twitt.destroy(posted_id); //teardown
            return expect(posted_message).to.eql(message);
        })
    })
})