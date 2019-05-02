import { MessageData } from '../../module/MessageData'

const expect = require('chai').expect

describe('MessageData', () => {
    let normal_code = MessageData.StatusCodes.status;
    it('has the follow attribute', () => {
        const message = new MessageData();
        const stub = Object.keys(message);
        const attribute = ['to', 'from', 'status', 'time', 'body'];

        expect(stub).to.be.eql(attribute)
    })
    describe('#Object', () => {
        let message = new MessageData();
        let input = {
            to: "b",
            from: "a",
            status: normal_code,
            time: "00:00:00",
            body: "this is a message",
        };
        let res = message.from_object(input);
        describe('#from_object', () => {
            it("should be valid message", () => {
                expect(message.is_valid()).to.be.equal(true);
            });
        });
        describe("#to_object", () => {
            it("message.to_object() should mean the same as the input object", () => {
                let object_export = message.to_object();
                expect(object_export).to.be.deep.equal(input);
            })
        })
    });
    describe('#JSON', () => {
        let message = new MessageData();
        let input = `{
            "to": "b",
            "from" : "a",
            "status": "${normal_code}",
            "time" : "00:00:00",
            "body": "this is a message"
        }`;
        let res = message.from_JSON(input);
        describe('#from_JSON', () => {
            it("should be valid message", () => {
                expect(message.is_valid()).to.be.equal(true);
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
        let message = new MessageData();
        let terminal = MessageData._terminal();
        let input = ["b", "a", normal_code, "00:00:00", "this is a message"].join(terminal);
        let res = message.from_string(input);
        describe('#from_string', () => {
            it("should be valid message", () => {
                expect(message.is_valid()).to.be.equal(true);
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
