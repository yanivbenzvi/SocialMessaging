<template>
    <v-app dark>
        <v-toolbar color="blue darken-4" dark>
            <v-avatar size="45" tile>
                <v-img class="elevation-6"
                       src="http://www.ncworkforce.com/img/OWS%20Web%20page%20icons/Send%20Message.png">
                </v-img>
            </v-avatar>
            <v-toolbar-title class="ma-3 append-icon-cb align-center">
                <span class="title">Secure Messaging</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="/">
                <v-icon>home</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>favorite</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <transition>
                    <router-view></router-view>
            </transition>
        </v-content>
        <v-footer app>
            <v-spacer></v-spacer>
            <span class="surface--text">
                some text
            </span>
            <v-spacer></v-spacer>
        </v-footer>
    </v-app>
</template>

<script>
    import {appData} from './main'

    export default {
        name: 'App',
        data: () => {
            return appData
        },
    }
</script>