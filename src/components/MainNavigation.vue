<template>
    <!-- <nav> -->
        <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        app
        >
        <v-list-item class="px-2">
            <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-title>John Leider</v-list-item-title>
            <!-- <v-btn
            icon
            @click.stop="mini = !mini"
            >
            <v-icon>mdi-chevron-left</v-icon>
            </v-btn> -->
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            router
            :to="item.route"
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-btn
            icon
            @click.stop="mini = !mini"
            >
            <v-icon >mdi-chevron-left</v-icon>
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <br>
        <button @click="signOut">Sign Out</button>
        </v-navigation-drawer>
    <!-- </nav> -->
</template>

<script>
import firebase from 'firebase';
import router from '../router';
require('firebase/auth');
export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', route: '/' },
          { title: 'Clients', icon: 'mdi-account-group-outline', route: '/clients' },
        //   { title: 'Users', icon: 'mdi-account-group-outline', route: '/' },
        ],
        // mini: true,
        mini: false,
      }
    },
    methods: {
        async signOut(){
            try {
                const data = await firebase.auth().signOut();
                console.log(data);
                // router.push('/secret')
                router.push('/login')
            } catch(err){
                console.log(err);
            }
        }
  }
}
</script>