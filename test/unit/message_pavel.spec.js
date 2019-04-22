import { Message } from '../../module/message_pavel';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should;


describe('message_pavel', () => {
    describe('#Object', () => {
        let message = new Message();
        let input = {
            from : "a",
            to: "b",
            body: "this is a message",
        };
        let res = message.from_object(input);
        describe('#from_object', () => {
            it("should say succeded in operation", () => {
                expect(res).to.be.equal(true);
            });
        });
        describe("#to_object", () => {
            it("message.to_JSON() should mean the same as the input JSON", () => {
                let object_export = message.to_object();
                expect(object_export).to.be.deep.equal(input);
            })
        })
    });
    describe('#JSON', () => {
        let message = new Message();
        let input = `{
            "from" : "a",
            "to": "b",
            "body"   : "this is a message"
        }`;
        let res = message.from_JSON(input);
        describe('#from_JSON', () => {
            it("should say succeded in operation", () => {
                expect(res).to.be.equal(true);
            });
        });
        describe("#to_JSON", () => {
            it("message.to_JSON() should mean the same as the input JSON", () => {
                let json_export = message.to_JSON();
                expect(JSON.parse(json_export)).to.be.deep.equal(JSON.parse(input));
            })
        })
    });

    describe('#String', () => {
        let message = new Message();
        let input = `a/~;b/~;this is a message`
        let res = message.from_string(input);
        describe('#from_string', () => {
            it("should say succeded in operation", () => {
                expect(res).to.be.equal(true);
            });
        });
        describe("#to_string", () => {
            it("message.to_string() should mean the same as the input string", () => {
                let string_export = message.to_string();
                expect(string_export).to.be.deep.equal(input);
            })
        })
    });
});
