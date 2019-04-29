//This is user B.
//B will read all the time from user A

// import {TwitterAPI} from "./twitter"
import {TwitterAPI} from '../module/twitter'

async function ask_for_input() {
    let twitt = new TwitterAPI()
    var stdin = process.openStdin()
    console.log('awating input: ')
    stdin.addListener('data', (input) => {
        console.log('posting')
        if (input != '') {
            twitt.post(input).then((id) => {
                input = input + ''
                console.log('the message \'' + input.substr(0, input.length - 1) + '\' was ' + (id ? 'posted' : 'not posted'))
                console.log('awating input: ')
            })
        }
    })
}

ask_for_input()