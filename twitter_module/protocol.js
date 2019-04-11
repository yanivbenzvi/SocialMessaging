const Reader = require('./reader').Reader;
const destroy_all = require('./reader').destroy_all;

class Protocol{
    constructor(reader = new Reader()){
        this.reader = reader;
        this.key_message;
    }

    set_key_message(message){
        this.key_message = message;
    }

    async request_public_key(){
        let sent_message = "give me a public key";
        let sent_message_id = await this.reader._client.post(sent_message);
        if(!sent_message_id){
            console.log("failed to send message");
            return "failed to send";
        }
        let counter = 10;
        let handler = {
            on_new_messages: (messages)=>{
                if (messages.length > 1){
                    console.log("maybe got key");
                    for(message of messages){
                        if(message.id != sent_message_id){
                            console.log("got key :" + message.text);
                            this.reader.stop();
                            set_key_message(message);
                            this.reader._client.destroy_all(messages.map(message=>message.id));
                        }
                    }
                }
                else{
                    handler.on_no_new_messages();
                }
            },
            on_no_new_messages: () => {
                console.log("no new messages");
                if (counter > 0) { 
                    counter--; 
                }
                else {
                    console.log("stopping");
                    this.reader.stop();
                    this.reader._client.destroy(sent_message_id);
                }
            },
            wait_interval:1000,
        }
        console.log("starting");
        this.reader.handle(handler)
        this.reader.start();
    }
}

function test(){
    let prot = new Protocol();
    prot.request_public_key()
}

// destroy_all();
test();