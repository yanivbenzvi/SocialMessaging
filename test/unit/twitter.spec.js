import { TwitterAPI } from '../../module/Twitter'

const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const sinon = require("sinon");

describe("TwitterAPI", () => {
    describe("#is_logged_in", () => {
        it("should say good login info", async () => {
            let good_twitter = new TwitterAPI();
            let is_logged_in = await good_twitter.is_logged_in()
            expect(is_logged_in).to.be.equal(true);
        })
        it("should say bad login info", async () => {
            let login_options = {
                consumer_key: '',
                consumer_secret: '',
                access_token_key: '',
                access_token_secret: '',
            };
            let bad_twitter = new TwitterAPI(login_options);
            let is_logged_in = await bad_twitter.is_logged_in()
            expect(is_logged_in).to.be.equal(false);
        })
    })

    describe("#post AND #pull", () => {
        it("should send a message and pull the same message by it's id", async () => {
            let twitter = TwitterAPI.get_client();
            let message = "asdafasfsa"
            let id = await twitter.post(message);
            let pulled_message = await twitter.pull(id);
            expect(await twitter.destroy(id)).to.not.throw;
            expect(pulled_message).to.be.equal(message);
        })

        it("should not be able to delete random message", (done) => {
            let twitter = TwitterAPI.get_client();
            twitter.destroy("1120260090194477057").catch(()=>{done()});
        })
    })

    describe("#get_client", () => {
        it("should return the same client when used multipule times", () => {
            let first_twitter_client = TwitterAPI.get_client();
            let second_twitter_client = TwitterAPI.get_client();
            expect(first_twitter_client).to.deep.equal(second_twitter_client);
        })
    });
})