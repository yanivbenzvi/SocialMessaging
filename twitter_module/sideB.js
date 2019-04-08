//This is user B.
//B will read all the time from user A

// import {TwitterAPI} from "./twitter"
const TwitterAPI = require('./twitter').TwitterAPI

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function read_always() {

    let twitt = new TwitterAPI();

    console.log("posting");
    twitt.post("post B primary key", 0)
    .then(res=>{
        console.log("post " + (res?"posted":"failed"));
    });
    while (true) {
        console.log("pulling");
        let json = await twitt.pull_all()
        if (json.length != 0) { //a new message arrived
            console.log("There is a new message!\n");
            for (let i = 0; i < json.length; i++) {
                console.log("Message: " + json[i].message)
                twitt.destroy(json[i].id)
            }
        } else
            console.log("No new message\n");
        let time_in_minute = 0.2
        await sleep(time_in_minute * 60000); //0.5 minute sleep
    }
}

read_always()