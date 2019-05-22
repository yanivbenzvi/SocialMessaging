import { eventify, eventify_clear, array_remove } from '../../../module/utils/Utils'

const chai = require('chai')
const expect = chai.expect;
const sinon = require('sinon')

describe("Utils", () => {
    describe("#eventify", () => {
        it("it works", () => {
            let arr = [];
            let callback_a = sinon.spy()
            let callback_b = sinon.spy();

            eventify(arr, "push", callback_a)

            arr.push(1);

            eventify(arr, "push", callback_b)

            arr.push(2);

            eventify_clear(arr);

            arr.push(3);

            expect(callback_a.callCount).to.be.equal(2);
            expect(callback_b.callCount).to.be.equal(1);
            expect(arr).to.be.eql([1, 2, 3]);

        });
    });

    describe("#array_remove", () => {
        it("it works", () => {
            let arr = [];
            arr.push(5);
            arr.push(6);

            array_remove(arr,5);
            expect(arr.includes(5)).to.be.false;
            expect(arr.includes(6)).to.be.true;
        })
    })
});
