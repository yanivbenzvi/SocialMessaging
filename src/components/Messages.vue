<template>
    <v-container fluid class="pb-0 scrollable-hidden">
        <v-layout column fill-height>

            <v-flex class="scrollable pl-1 pr-4">
                <template v-for="(message,index) in messages">
                    <v-layout :class="message.from===id ? 'justify-start' : 'justify-end '"
                              :key="message.mKey + '-' + index">
                        <v-flex xs6>
                            <v-card :class="message.from===id ? 'my-2 mx-12': 'my-2 mx-12 blue-grey lighten-1'"
                                    transition="scale-transition">
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
                                placeholder="your message..."
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
                        <v-btn flat @click="sync.start()">
                            continue loop
                            <v-icon left>refresh</v-icon>
                        </v-btn>
                        <v-btn flat @click="sync.clearTwitter()">
                            Clean Twitter
                            <v-icon left>refresh</v-icon>
                        </v-btn>
                        <v-btn flat disabled>
                            {{state}}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {MailBox}       from '../../module/MailBox'
    import {Sync}          from '../../module/Sync'
    import {timeConverter} from '../../module/utils/Utils'
    import {ManageState}   from '../../module/ManageState'

    export default {

        props: ['id'],

        name: 'messages',

        data() {
            return {
                plainTextMessage: '',
                mailBox:          null,
                sync:             null,
                state:            'none',
            }
        },

        created() {
            this.mailBox = new MailBox({ownerName: this.id})
            this.sync    = new Sync(this.mailBox, {wait_interval: 30000}) //30 sec
        },

        mounted() {
            //this.sync.start()
        },

        destroyed() {
            //this.sync.stop()
        },

        computed: {
            messages() {
                return this.mailBox.getAllMessages()
            },

            currentState() {
                return this.sync ? this.sync.MangeState.currentState : ManageState.states.initial_state
            },
        },

        watch: {
            ['currentState']() {
                this.state = Object.keys(ManageState.states)[this.currentState] + (this.sync.MangeState.ready_to_send?", and ready to send":"")
            },
        },

        methods: {
            appendMessage() {
                this.mailBox.sendMessage(this.id === 'A' ? 'B' : 'A', this.plainTextMessage)
                this.plainTextMessage = ''
            },
            timeConverter,
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