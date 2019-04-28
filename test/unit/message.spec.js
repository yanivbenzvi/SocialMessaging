import {Message} from '../../module/Message'

const expect = require('chai').expect

describe('Message', () => {
    it('has the follow attribute', () => {
        const message      = new Message()
        const stub = Object.keys(message)
        const attribute = ['to', 'from', 'time', 'body', 'readed', 'mKey']

        expect(stub).to.be.eql(attribute)
    })
    describe('#Object', () => {
        let message = new Message();
        let input = {
            to: "b",
            from : "a",
            time : "00:00:00",
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
            "to": "b",
            "from" : "a",
            "time" : "00:00:00",
            "body": "this is a message"
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
        let terminal = Message._terminal();
        let input = ["b","a","00:00:00","this is a message"].join(terminal);        
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
})
