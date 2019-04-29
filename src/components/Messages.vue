<template>
    <v-container fluid class="pb-0 scrollable-hidden">
        <v-layout column fill-height>

            <v-flex class="scrollable pl-1 pr-4">
                <template v-for="(message,index) in messages">
                    <v-layout :class="message.from===id ? 'justify-start' : 'justify-end'">
                        <v-flex xs3>
                            <v-card class="my-2 mx-12" transition="scale-transition">
                                <v-card-text>{{message.body}}</v-card-text>
                                <v-card-actions>{{timeConverter(message.time)}}</v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </template>
            </v-flex>

            <v-flex shrink>
                <v-layout column>
                    <v-flex>

                        <v-text-field
                                v-model="plainTextMessage"
                                height="65"
                                append-icon="send"
                                placeholder="you're message..."
                                @keydown.enter="appendMessage"
                                @keydown.esc="appendMessage"
                                @click:append="appendMessage"
                                solo dark flat clearable hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex>
                        <span></span>
                        <v-btn flat>
                            Current User: {{id}}
                        </v-btn>
                        <v-btn flat @click="sentNewMessage">
                            send messages
                            <v-icon left>refresh</v-icon>
                        </v-btn>
                        <v-btn flat @click="ReceiveNewMessage">
                            receive messages
                            <v-icon left>refresh</v-icon>
                        </v-btn>

                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {MailBox}    from '../../module/MailBox'
    import {Message}    from '../../module/Message'
    import {TwitterAPI} from '../../module/twitter'
    import {Reader}     from '../../module/reader'

    export default {

        props: ['id'],

        name: 'messages',

        data() {
            return {
                plainTextMessage: '',
                mailBox:          null,
            }
        },

        created() {
            this.mailBox = new MailBox({ownerName: this.id})
            this.ReceiveNewMessage()
        },

        computed: {
            messages() {
                console.log(this.mailBox.getAllMessages())
                return this.mailBox.getAllMessages()
            },

        },

        methods: {
            appendMessage() {
                this.mailBox.sendMessage(this.id === 'A' ? 'B' : 'A', this.plainTextMessage)
                this.plainTextMessage = ''
            },

            async ReceiveNewMessage(){
                let twitter = TwitterAPI.get_client();

                let reader   = new Reader()

                let messages = await twitter.pull_all()

                messages.map(obj => {
                    let {id, message} = obj
                    let cur_message   = new Message()
                    cur_message.from_JSON(message)
                    cur_message.twitterId = id
                    return cur_message

                }).filter((message) => {
                    return message.to === this.id
                }).forEach(async message => {
                    this.mailBox.received_messages.push(message)
                    console.log(message.twitterId)
                    await twitter.destroy(message.twitterId)
                })
            },

            sentNewMessage() {
                console.log('check for new message...')
                let twitter = TwitterAPI.get_client()

                this.mailBox.messages_queue.forEach(async message => {
                    let id = await twitter.post(message.to_JSON())
                    console.log('message id', id)
                })
                this.mailBox.sent_messages = this.mailBox.sent_messages.concat(this.mailBox.messages_queue)
                this.mailBox.messages_queue = []
            },

            timeConverter(UNIX_timestamp) {
                var a      = new Date(UNIX_timestamp * 1000)
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                var year   = a.getFullYear()
                var month  = months[a.getMonth()]
                var date   = a.getDate()
                var hour   = a.getHours()
                var min    = a.getMinutes()
                var sec    = a.getSeconds()
                var time   = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
                return time
            },
        },
    }
</script>

<style scoped>
    .scrollable {
        overflow-y: scroll
    }

    .scrollable-hidden {
        overflow-y: hidden
    }
</style>