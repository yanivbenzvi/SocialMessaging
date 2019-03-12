<template>
    <v-container fluid class="align-content-center">
        <v-layout align-center class="text-md-center pa-4">
            <v-spacer></v-spacer>
            <template v-for="item in ['A','B']">
                <v-flex xs3 pa-3 style="cursor: pointer;">
                    <v-hover>
                        <v-card slot-scope="{ hover }" :to="`/user/${item}`"
                                :class="`gray pa-4 elevation-${hover ? 12 : 2}` "
                                style="border-radius: 10px;">
                            <v-layout column>
                                <v-flex>
                                    <v-avatar size="100">
                                        <img class="elevation-6"
                                             src="@/assets/profile.svg"/>
                                    </v-avatar>
                                </v-flex>

                                <v-flex class="pt-4">
                                    <span class="display-1">Person {{item}}</span>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-hover>
                </v-flex>
            </template>
            <v-spacer></v-spacer>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'home',
    }
</script>

<style scoped>

</style>