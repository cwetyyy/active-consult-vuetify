<template>
    <!-- <nav> -->
        <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        
        color="info"
        dark
        app
        >
        <v-list-item class="px-2">
            <v-list-item-avatar class="avatar-placeholder">
            <!-- <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img> -->
            <p> {{ userName.charAt(0)}} </p>
            </v-list-item-avatar>

            <v-list-item-title class="d-flex user-title">
                <p class="pt-2">{{ userName }}</p>
                <!-- <v-btn
                    class="ml-auto"
                    icon
                    @click.stop="mini = !mini"
                >
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-btn> -->
            </v-list-item-title>
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
            <v-list-item @click="signOut">
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-btn
            icon
           v-on:click="replace(); mini = !mini;"
            class="collaps"
            
            >
            <!-- <v-icon class="left" style="display:none">mdi-chevron-left</v-icon>
            <v-icon class="right" style="display:block">mdi-chevron-right</v-icon> -->
            <div id = "div1" style="display:block" ><v-icon class="left" >mdi-chevron-left</v-icon></div>
            <div id = "div2" style="display:none"><v-icon class="right">mdi-chevron-right</v-icon></div>
        </v-btn>
        <!-- <div @click="signOut" class="logout">
                <v-icon class="icon">mdi-logout</v-icon>
                <p>Logout</p>
        </div> -->
        <!-- <button @click="signOut">Sign Out</button> -->
        </v-navigation-drawer>
        
    <!-- </nav> -->
</template>

<script>
import firebase from 'firebase';
import router from '../router';
require('firebase/auth');
import db from '@/fb';

export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
          { title: 'Clients', icon: 'mdi-account-group', route: '/clients' },
          { title: 'Accounting Calendar', icon: 'mdi-calendar-text', route: '/accounting-calendar' },
          { title: 'Documents', icon: 'mdi-file-document', route: '/documents' },
          { title: 'Archived Documents', icon: 'mdi-archive', route: '/archived-documents' },
        //   { title: 'Users', icon: 'mdi-account-group-outline', route: '/' },
        ],
        // mini: true,
        mini: false,
        userName: ''
      }
    },
    created () {
        console.log('logged in user' + firebase.auth().currentUser.uid)
        const userId = firebase.auth().currentUser.uid;
        console.log('mamuu' + db.collection('users').doc(userId))

        db.collection('users').doc(userId).get().then(doc => {
            this.userName = doc.data().userName
        })

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
        },

         replace() {
        document.getElementById("div1").style.display="none";
        document.getElementById("div2").style.display="block";
    }
  }
}
</script>

<style>
    .avatar-placeholder{
        background-color: azure;
    }
    .avatar-placeholder p{
        color: #3d3d3d;
        margin: 0 auto;
    }
    .user-title p{
        margin: 0;
    }
    .collaps{
        margin-top: 20px;
        float: right;
    }
   
</style>