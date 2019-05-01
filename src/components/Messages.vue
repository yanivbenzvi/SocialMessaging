<template>
    <v-container fluid class="pb-0 scrollable-hidden">
        <v-layout column fill-height>

            <v-flex class="scrollable pl-1 pr-4">
                <template v-for="message in messages">
                    <v-layout :class="message.from===id ? 'justify-start' : 'justify-end '" :key="message.mKey">
                        <v-flex xs3>
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
                                append-icon="send"
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
                            start sync
                            <v-icon left>refresh</v-icon>
                        </v-btn>
                        <v-btn flat @click="sync.stop()">
                            stop sync
                            <v-icon left>refresh</v-icon>
                        </v-btn>

                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { MailBox }    from '../../module/MailBox'
    import { Sync }     from '../../module/Sync'
    import { timeConverter } from '../../module/utils/Utils'
    export default {

        props: ['id'],

        name: 'messages',

        data() {
            return {
                plainTextMessage: '',
                mailBox: null,
                sync: null,
            }
        },

        created() {
            this.mailBox = new MailBox({ownerName: this.id});
            this.sync = new Sync(this.mailBox,{wait_interval:10000}); //10 sec
            // this.sync.receiveNewMessage();
        },

        mounted() {
            this.sync.start()
        },

        destroyed(){
            this.sync.stop();
        },

        computed: {
            messages() {
                return this.mailBox.getAllMessages();
            },
        },

        methods: {
            appendMessage() {
                this.mailBox.sendMessage(this.id === 'A' ? 'B' : 'A', this.plainTextMessage);
                this.plainTextMessage = '';
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