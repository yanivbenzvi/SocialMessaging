export class ManageState {
    constructor() {
        this.currentState = ManageState.states.ask_for_handshake
    }

    static get states() {
        return {
            initial_state:                0,
            ask_for_handshake:            1,
            waiting_for_handshake:        2,
            ask_for_key:                  3,
            waiting_for_key:              4,
            ready_to_start_communication: 5,
        }
    }

    handleState() {
        //receive all message from twitter
        //filter message and look for status code {ask_for_handshake} and send handshake
        switch (this.currentState) {
            case ManageState.states.initial_state:
                this.currentState = ManageState.states.ask_for_handshake
                break
            case ManageState.states.ask_for_handshake:
                //send message with status code {handshake} (asking for handshake)
                this.currentState = ManageState.states.waiting_for_handshake
                break
            case ManageState.states.waiting_for_handshake:
                //filter message and look for message with status code {sending_handshake}
                //check if we success to decode message and get agreed message (something like test word)
                //if we not succeed to decode handshake message state will changed to has_no_key
                //else change state to {ready_to_start_communication}
                break
            case ManageState.states.ask_for_key:
                //send message with code {ask_for_key}
                this.currentState = ManageState.states.waiting_for_key
                break
            case ManageState.states.waiting_for_key:
                //filter message and look for message with status code {get_key}
                //if we get new key go back to back to {ask_for_handshake}
                this.currentState = ManageState.states.ask_for_handshake
                break
            case ManageState.states.ready_to_start_communication:
                // receive and send message queue !!!!!!!
                break
        }
        console.log('current state:', Object.keys(ManageState.states)[this.currentState], this.currentState)
    }


}