
const Twitter = require('twitter');


export class TwitterAPI{

    // should be private
    static options() {
        return {
            consumer_key: 'vzplcQiyq9HHXlOz6GYg5w7Hx',
            consumer_secret: 'XMpiuos8MeKYNDFSGa1vAnj46Z6fFCFUo0JizH0ymx7RC9jkdV',
            access_token_key: '1109786317821489157-nolUSmcxSVutxFiVtgvmEAe8yGghKk',
            access_token_secret: 'nox2Y0ETWK3IjQgk80x6Y0uW0nvmFjzoPJtZg9DXmAO5N'
        }
    }

    constructor(access_token_key = null,access_token_secret = null) {
        //setup of login settings
        let options = TwitterAPI.options();
        if (access_token_key != null) options.access_token_key = access_token_key;
        if (access_token_secret != null) options.access_token_secret = access_token_secret;


        this.client = new Twitter(options)
    }

    async is_logged_in(){
        try{
            await this.client.pull('statuses/show/a',{});
        }
        catch (err){   
            return (err[0].code == '34');
        }
    }

    /**
     * async, posts message as client logged in to twitter, for the corresponding app;
     * returns the id of the message posted and stores all messages in a dictionary 
     * 
     * @param {String} message
     * @returns {PromiseLike<string>} 
     */
    async post(message) {
        try{
            let json = await this.client.post('statuses/update', {status: message});
            await this.client.post('favorites/create/', {id:json.id_str});
            return json.id_str;
        }
        catch (err){
            console.log(err);
        }
    }
    
    /**
     * async, pulls message using message id;
     * returns the message text
     * 
     * @param {String} id
     * @returns {PromiseLike<string>} 
     */
    async pull(id) {
        try{
            let stat = 'statuses/show/' + id;
            let json = await this.client.get(stat,{});
            return json.text;
        }
        catch (err){
            console.log(err);
        }
    }
    
    async pull_all(){
        try{
            let json = await this.client.get("favorites/list",{});
            return json.map(el=>{return {id: el.id_str, message: el.text}});
        }
        catch (err){
            console.log(err);
        }
    }
    /**
     * async, destroys message using message id;
     * returns boolean
     * 
     * @param {String} id
     * @returns {PromiseLike<boolean>} 
     */
    async destroy(id) {
        try{
            let stat = 'statuses/destroy/' + id;
            console.log(stat);
            let json = await this.client.post(stat,{});
            console.log("the message '"+json.text+"' deleted");
            return true;
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
}

function test(){
    const fs = require('fs');
    var message = "im a test";
    twitt = new TwitterAPI(); 
    twitt.post(message).then(id=>{
        fs.writeFile("./message.txt", id,(err)=>{
            if(err) {
                console.log(err)
            }
            else {
                console.log("written to file")
            }
        });
        twitt.pull(id).then(text=>{
            if (text == message){
                console.log("the message '" + message +"' was infact posted, with id: " + id);
            }
            twitt.destroy(id)
        })
    }).catch(console.log);
}