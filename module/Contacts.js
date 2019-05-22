export class Contacts{

    constructor(contacts = {}){
        Object.assign(this,contacts);
    }

    update_contact(contact_name,contact_key){
        this[contact_name]=contact_key;
    }

    get_contact_key(contact_name){
        return (this[contact_name] ? this[contact_name] : "");
    }

}