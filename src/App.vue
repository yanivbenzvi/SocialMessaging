<template>
    <v-app dark>
        <v-toolbar color="grey darken-1" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-spacer></v-spacer>

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
            <HelloWorld v-bind:msg="body_message"/>
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
    import {appData} from "./main";

    export default {
        name: 'App',
        data: () => {
            return appData
        }
    };
</script>