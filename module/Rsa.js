import NodeRSA from 'node-rsa'

/**
 *
 */
export class Rsa {

    constructor() {
        let signingSchemes = ['pkcs1', 'pss']
        let signHashAlgorithms = {
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

    /**
     *
     * @param plainText
     */
    encrypt3dKey(plainText) {
    }

    /**
     *
     * @param plainText
     * @return {*}
     */
    encrypt(plainText) {
        return this.RsaModule.encrypt(plainText, 'base64')
    }

    decrypt3dKey(encryptText, key) {
    }

    /**
     *
     * @param encryptText
     * @return {*}
     */
    decrypt(encryptText) {
        return this.RsaModule.decrypt(encryptText, 'utf8')
    }

    /**
     * Import external Rsa public key.
     * @param {String} RsaPublicKey
     */
    async importPublicKey(RsaPublicKey) {
        await this.RsaModule.importKey(RsaPublicKey)
    }

    /**
     *
     * @param RsaPrivateKey
     * @return {Promise<void>}
     */
    async importPrivateKey(RsaPrivateKey) {
        await this.RsaModule.importKey(RsaPrivateKey, 'pkcs1')
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

}