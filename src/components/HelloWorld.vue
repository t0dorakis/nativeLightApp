<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Hello world">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
        </ActionBar>

        <StackLayout class="hello-world">
            <Label class="body" textWrap=true text="This is a hello world component, tap the button if you dare"/>

            <Button class="btn btn-primary" @tap="searchBridges()" text="Add Bridge"/>
            <Button class="btn btn-primary" @tap="addUser()" text="Add User"/>
            <Button class="btn btn-primary" @tap="getLights()" text="get Lights"/>
            <!--<Button class="btn btn-primary" @tap="test()" text="tester"/>-->
            <ListView for="(light, index) in $store.state.hueApi.lights" >
                <v-template @tap="console.log('hi')">
                    <!-- Shows the list item label in the default color and style. -->
                    <Label :text="light.name" @tap="switchPower(index)"/>
                </v-template>
            </ListView>
            <!--<Image v-if="surprise" src="~/images/NativeScript-Vue.png"/>-->

        </StackLayout>

    </Page>
</template>

<script>
    import axios from 'axios';
    import { mapState } from 'vuex'

    export default {
        data () {
            return {
                surprise: false,
            };
        },
        methods: {
            test: function (thing) {
                console.log(thing)
            },
            searchBridges: function () {
                this.$store.dispatch('getBridges')
            },
            addUser: function () {
                this.$store.dispatch('newUser')
            },
            getLights: function () {
                this.$store.dispatch('getLights')
            },
            switchPower: function (index) {
                this.$store.dispatch('switchPower', index)
            }
        },
        computed:
            mapState(
            // map this.count to store.state.lights
                { lights: 'hueApi.lights' }
        ),
    };
</script>

<style scoped>
    .hello-world {
        margin: 20;
    }

    Label {
        color: red;
    }
</style>
