import {Rsa} from '../../module/Rsa'
var expect = require('chai').expect

describe('Rsa',()=>{
    let stub = new Rsa()
    console.log('publickey',stub.RsaModule.exportKey('public'))
    console.log('privateKey',stub.RsaModule.exportKey())

    describe('Encrypt',()=>{
        it('encrypt data',()=>{
            expect(stub.decrypt(stub.encrypt('hello world'))).to.be.eql('hello world')
        })
    })
})