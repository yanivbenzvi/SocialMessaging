import NodeRSA from 'node-rsa'


export class Rsa {
    constructor() {
        this.RsaModule  = new NodeRSA({b: 512})
        const text      = 'Hello RSA!'
        const encrypted = this.RsaModule.encrypt(text, 'base64')
        console.log('encrypted: ', encrypted)
        const decrypted = this.RsaModule.decrypt(encrypted, 'utf8')
        console.log('decrypted: ', decrypted)
    }
    static encrypt(){
        return NodeRSA.encrypt(text, 'base64')
    }

}