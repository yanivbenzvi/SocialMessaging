import NodeRSA from 'node-rsa'


export class Rsa {

    constructor() {
        var signingSchemes = ['pkcs1', 'pss']
        var signHashAlgorithms = {
            'node': ['MD4', 'MD5', 'RIPEMD160', 'SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512'],
            'browser': ['MD5', 'RIPEMD160', 'SHA1', 'SHA256', 'SHA512']
        }
        this.RsaModule = new NodeRSA({b: 512, signingScheme: 'pkcs1-SHA512'})

        this.externalPublicKey = null

        //should be remove
        this.privateKey = this.RsaModule.exportKey()
        this.publicKey = this.RsaModule.exportKey('public')
        //should be remove
    }

    encrypt3dKey(plainText) {
    }

    encrypt(plainText) {
        return this.RsaModule.encrypt(plainText, 'base64')
    }

    decrypt3dKey(encryptText, key) {
    }

    decrypt(encryptText) {
        return this.RsaModule.decrypt(encryptText, 'utf8')
    }

    /**
     * Import external Rsa public key.
     * @param {String} RsaPublicKey
     */
    importPublicKey(RsaPublicKey) {
        this.RsaModule.importKey(RsaPublicKey)
    }

    importPrivateKey(RsaPrivateKey) {
        this.RsaModule.importKey(RsaPrivateKey, 'pkcs1')
    }

    /**
     * Retrieve Rsa public key.
     * @returns {String}
     */
    exportPublicKey() {
        return this.RsaModule.exportKey('public')
    }

    /**
     * Calculate max message size in bytes.
     * @returns {Number}
     */
    maxMessageSize() {
        return this.RsaModule.getMaxMessageSize()
    }

    maxKeySize() {
        return this.RsaModule.getKeySize()
    }

    getByteLen(normal_val) {
        // Force string type
        normal_val = String(normal_val);

        var byteLen = 0;
        for (var i = 0; i < normal_val.length; i++) {
            var c = normal_val.charCodeAt(i);
            byteLen += c < (1 <<  7) ? 1 :
                c < (1 << 11) ? 2 :
                    c < (1 << 16) ? 3 :
                        c < (1 << 21) ? 4 :
                            c < (1 << 26) ? 5 :
                                c < (1 << 31) ? 6 : Number.NaN;
        }
        return byteLen;
    }


}
