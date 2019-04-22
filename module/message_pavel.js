
const TwitterAPI = require('./twitter');

class Message{
    constructor(){
        this.message = {}
    }

    from_object(obj){
        for(let attr in obj){
            if(Message._order().includes(attr)){
                this.message[attr] = obj[attr];
            }
        }      
        return true;
    }

    to_object(){
        return this.message;
    }

    from_JSON(message){
        message = JSON.parse(message);
        return this.from_object(message);
    }

    to_JSON(){
        return JSON.stringify(this.to_object());
    }

    static _order(){
        return ["from","to","body"];
    }

    static _terminal(){
        return "/~;"
    }

    from_string(str){
        let keys = Message._order();
        let values = str.split(Message._terminal());
        let message = {}
        if(keys.length != values.length) 
            return false;
        for(let i=0;i<keys.length;i++){
            message[keys[i]] = values[i];
        }
        return this.from_object(message);
    }
    
    is_valid(){
        for(let attr of Message._order()){
            if(!(attr in this.message))
                return false;
        }
        return true;
    }

    to_string(){
        if(!this.is_valid()) return null;
        let str_arr = []
        for(let attr of Message._order()){
            str_arr.push(this.message[attr])
        }
        return str_arr.join(Message._terminal());
    }
}

module.exports = { Message }