<template>
    <v-container fluid class="pb-0 scrollable-hidden">
        <v-layout column fill-height>

            <v-flex class="scrollable pl-1 pr-4">
                <template v-for="(message,index) in messages">
                    <v-layout :class="message.from===id ? 'justify-start' : 'justify-end'">
                        <v-flex xs3>
                            <v-card class="my-2 mx-12" transition="scale-transition">
                                <v-card-text>{{message.body}}</v-card-text>
                                <v-card-actions>{{dateConverting(message.time)}}</v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </template>
            </v-flex>

            <v-flex shrink>
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
                <v-btn icon flat @click="checkForMessage">
                    <v-icon>refresh</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {MailBox}    from '../../module/MailBox'
    import {Message}    from '../../module/Message'
    import {TwitterAPI} from '../../module/twitter'

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
            this.mailBox.received_messages.push(new Message({
                    to:   'A',
                    from: 'B',
                    body: 'bla bla bla',
                }),
                new Message({
                        to:   'b',
                        from: 'A',
                        body: 'bla bla bla',
                    },
                ),
                new Message({
                    to:   'A',
                    from: 'B',
                    body: 'bla bla bla',
                }),
                new Message({
                        to:   'b',
                        from: 'A',
                        body: 'bla bla bla',
                    },
                ),
                new Message({
                    to:   'A',
                    from: 'B',
                    body: 'bla bla bla',
                }),
                new Message({
                        to:   'b',
                        from: 'A',
                        body: 'bla bla bla',
                    },
                ),
            )
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

            checkForMessage() {
                console.log('check for new message...')
                let twitter = TwitterAPI.get_client()

                this.mailBox.messages_queue.forEach(async message => {
                    let id = await twitter.post(message.body)
                    console.log('message id', id)
                })
            },
            dateConverting(timestamp){
                let datetime = require('node-datetime')
                let dt = timestamp
                return dt.format('m/d/Y H:m:S')
            }
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