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
import firebase from 'firebase';
require('firebase/auth');
import router from '../router/index';

export default {
    data(){
        return{
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
    methods: {
        async pressed() {
            try{
                const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                console.log('loggedin user: ' + val);
                router.push('/');
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>

</style>