import {Rsa} from '../../module/Rsa'

var expect = require('chai').expect

describe('Rsa', () => {
    let stub = new Rsa()
    let mock = {
        encryptedText: 'aDyCzy5ENJ25Q6cNd4Vwknj6jX3XRoo9svJFUVjQSm3s4OodWeC4YZjnn2fC4CfjBbl/xVmkngT/ZiTInvORRw==',
        publicKey: '-----BEGIN PUBLIC KEY-----\n' +
            'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIffKN4V9itTyYuy4DS0NozWH9uttN4V\n' +
            '8MUVC+G3GlzmFAouzMHq7hih1EIUTuvC4wJyRd84VxJdAOnFy58kgb8CAwEAAQ==\n' +
            '-----END PUBLIC KEY-----',
        privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
            'MIIBOQIBAAJBAIffKN4V9itTyYuy4DS0NozWH9uttN4V8MUVC+G3GlzmFAouzMHq\n' +
            '7hih1EIUTuvC4wJyRd84VxJdAOnFy58kgb8CAwEAAQJAOKTmasAJIsMJkT3/jrla\n' +
            'zJgwK+tdLgFDoUZG79DgIr4EP8n7l3RU8N+7czIX+r8qXe48Wt56f1SZrARt+3cT\n' +
            'gQIhANB8+ySNoLk3YQPvq2RJJMbCsUn/7ENP0ltRlYBUwROhAiEAptXL3WkxL4cg\n' +
            '9B/WFOwfMjhdZk1YqEWmw/JX4//jmV8CID35OMon02PbI1qBLshTubvfecXOblOf\n' +
            '8Z61hKQuDWqhAiBvXNLCLo9YbFjA2+do+9wvB5TAzuxZFnUk4sVsOcjQ/QIgayek\n' +
            'QvzMG7DXaxLxE9s1TkAFaxnaEpWUZZv6ZR7ipww=\n' +
            '-----END RSA PRIVATE KEY-----'
    }

    describe('#encrypt', () => {
        it('encrypt data', () => {
            const encrypte = stub.encrypt('hello world')
            expect(encrypte).to.be.not.eql('hello world')
        })
    })

    describe('#encrypt3dKey',()=>{
        stub.externalPublicKey = mock.publicKey
    })

    describe('#decrypt', () => {
        it('decrypt data', () => {
            const encrypted = stub.encrypt('hello world')
            expect(stub.decrypt(encrypted)).to.be.eql('hello world')
        })
    })

    describe('#decrypt3dKey',()=>{
    })

    describe('#importPublicKey', () => {
        it('import public key', async () => {
            let stub = new Rsa()
            expect(stub.exportPublicKey()).to.be.not.eql(mock.publicKey)
            await stub.importPublicKey(mock.publicKey)
            expect(stub.exportPublicKey()).to.be.eql(mock.publicKey)
        })
    })

    describe('#importPrivateKey', () => {
        it('import Private Key', async () => {
            let stub = new Rsa()
            await stub.importPrivateKey(mock.privateKey)
            expect(stub.decrypt(mock.encryptedText)).to.be.eql('hello world')
        })
    })

    describe('encrypt and decrypt message between 2 object', () => {
        let a = new Rsa()
        let b = new Rsa()


    })

    describe('#maxMessageSize',()=>{
        it('max message size',()=>{
            expect(stub.maxMessageSize()).to.be.eql(0)
        })
    })
})