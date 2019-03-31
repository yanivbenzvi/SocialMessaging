import NodeRSA from 'node-rsa'


export class Rsa {

    constructor() {
        var signingSchemes = ['pkcs1', 'pss']
        var signHashAlgorithms = {
            'node': ['MD4', 'MD5', 'RIPEMD160', 'SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512'],
            'browser': ['MD5', 'RIPEMD160', 'SHA1', 'SHA256', 'SHA512']
        }
        this.RsaModule = new NodeRSA({b: 512, signingScheme: 'pkcs1-SHA512'})

        this.privateKey = this.RsaModule.exportKey()
        this.publicKey = this.RsaModule.exportKey('public')
    }

    encrypt(plainText) {
        return this.RsaModule.encrypt(plainText, 'base64')
    }

    decrypt(encryptText) {
        return this.RsaModule.decrypt(encryptText, 'utf8')
    }


}