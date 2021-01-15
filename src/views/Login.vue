<template>
    <v-card 
    max-width="500"
    class="mx-auto pa-10 my-16"
    >
        <form ref="form">
            <v-text-field
            v-model="email"
            label="E-mail"
            type="email"
            required
            :rules="rulesEmail"
            ></v-text-field>
            <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            :rules="rulesPassword"
            ></v-text-field>
            <v-btn
            class="mr-4"
            @click="pressed"
            >
            Log in
            </v-btn>
        </form>
        <div v-if="error">{{error.message}}</div>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Login",
    computed: {
        ...mapGetters(["getToast"])
    },
    data(){
        return{
            loading: false,
            email: '',
            password: '',
            error: '',
            rulesEmail: [
             v => v.length > 0 || 'Please enter your email to Log in'
            ],
            rulesPassword: [
             v => v.length > 0 || 'Please enter your password to Log in'
            ]
        }
    },
    watch: {
        getToast(val) {
            if(val) {
                this.loading = false
            }
        }
    },
    created() {
        if(this.getLoggedUser()) {
            this.$router.push('/')
        }
    },
    methods: {
        async pressed() {
            const payload = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('loginUser', payload)
        }
    }
}
</script>

<style scoped>

</style>