<template>
    <v-container fluid>
        <v-layout column align-center>
            <h3 class="mb-3">{{msg}}</h3>
            <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
            <ul>
                <li><a href="http://tinyurl.com/ybhm9zq4"
                       target="_blank">Webpack</a></li>
                <li><a href="https://vuetifyjs.com/en/"
                       target="_blank">Vuetify</a></li>
                <li><a href="https://vuejs.org/"
                       target="_blank">Vue.js</a></li>
            </ul>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
