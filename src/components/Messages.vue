<template>
    <v-container fluid class="fill-height fill-height pa-3 align-content-center">
        <v-layout column class="">
            <v-flex class="hide-overflow scrollable fill-height">
                <template v-for="(message,index) in messages">
                    <v-layout :class="message.from===id ? 'justify-start' : 'justify-end'">
                        <v-flex xs3>
                            <v-card class="my-2 mx-12" transition="scale-transition">
                                <v-card-text>{{message.content}}</v-card-text>
                                <v-card-actions>{{timeConverter(message.timestamp)}}</v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
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
        created() {
            let i = 0
            for (i = 0; i <= 5; i++)
                this.messages.push({
                    to:        i % 2 === 0 ? 'B' : 'A',
                    from:      i % 2 === 0 ? 'A' : 'B',
                    content:   'some message',
                    timestamp: Date.now(),
                })
        },
        methods: {
            appendMessage() {
                console.log('new message')
                const to   = this.$props.id == 'A' ? 'B' : 'A'
                const from = this.$props.id
                if (this.content) {
                    this.messages.push({to, from, content: this.content,timestamp: new Date()})
                }
                this.content = ''
            },
            randomDate(date1, date2){
                function getRandomArbitrary(min, max) {
                    return Math.random() * (max - min) + min;
                }
                var date1 = date1 || '01-01-1970'
                var date2 = date2 || new Date().toLocaleDateString()
                date1 = new Date(date1).getTime()
                date2 = new Date(date2).getTime()
                if( date1>date2){
                    return new Date(getRandomArbitrary(date2,date1)).toLocaleDateString()
                } else{
                    return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString()

                }
            },
            timeConverter(UNIX_timestamp){
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                return time;
            },
        },
    }
</script>

<style scoped>
    .scrollable {
        overflow-y: scroll
    }

</style>