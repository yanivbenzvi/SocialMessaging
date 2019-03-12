<template>
    <v-app dark>
        <v-toolbar app dark color="primary">
            <v-icon>{{app_icon}}</v-icon>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
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