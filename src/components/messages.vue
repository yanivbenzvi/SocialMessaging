<template>
    <v-container fluid class="fill-height fill-height  align-content-center">
        <v-layout column class="">
            <v-flex xs12>
                <template v-for="message in messages">
                    <v-flex xs3>
                        <v-card class="my-2 mx-12">
                            <v-card-text>{{message.content}}</v-card-text>
                        </v-card>
                    </v-flex>
                </template>
            </v-flex>
            <v-flex>
                <v-text-field
                        v-model="content"
                        height="65"
                        append-icon="send"
                        placeholder="you're message..."
                        @keydown.enter="appendMessage"
                        @keydown.esc="appendMessage"
                        @click:append="appendMessage"
                        solo dark flat clearable hide-details>
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props:   ['id'],
        name:    'messages',
        data() {
            return {
                content:  '',
                messages: [],
            }
        },
        methods: {
            appendMessage() {
                console.log('new message')
                const to   = this.$props.id == 'A' ? 'B' : 'A'
                const from = this.$props.id
                this.messages.push({to, from, content: this.content})
                this.content = ''
            },
        },
    }
</script>

<style scoped>

</style>