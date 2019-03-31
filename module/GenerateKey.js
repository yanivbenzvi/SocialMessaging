import keypair from 'keypair'

export class GenerateKey {

    constructor() {
        let pair = keypair()
        this.privateKey = pair.private
        this.publicKey = pair.public
    }
}