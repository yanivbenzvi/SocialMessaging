import { TwitterAPI } from '../../module/twitter'
var expect = require('chai').expect

describe('twitter', () => {
    // describe('#connect',()=>{
    //     let twitt = new TwitterAPI();
    //     twitt.lookup().then(console.log)
    // })
    describe('#connect', async () => {
        let twitt = new TwitterAPI();
        expect(await twitt.is_logged_in()).to.be.eql(true)
    })

    describe('#verify message sent', async () => {
        var message = "im a tester";
        let twitt = new TwitterAPI(); 
        let posted_id = await twitt.post(message);
        let posted_message = await twitt.pull(posted_id);
        await twitt.destroy(posted_id);
        expect(posted_message).to.eql(message);
    })
})