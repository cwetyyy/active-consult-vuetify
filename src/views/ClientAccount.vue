<template>
<v-container fluid class="my-5" >
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">ClientAccount</h1>
      <v-card
    class="mx-auto"
    max-width="600"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{client.companyName}}
        </div>
        <div class="mb-6">
            <v-list-item-title class="heading 6 mb-1">
            User email:
            </v-list-item-title>
            <v-list-item-subtitle>{{userEmail}}</v-list-item-subtitle>
        </div>
         <div class="mb-6">
            <v-list-item-title class="heading 6 mb-1">
            VAT:
            </v-list-item-title>
            <v-list-item-subtitle>{{client.vat}}</v-list-item-subtitle>
        </div>
        <div class="mb-6">
            <v-list-item-title class="heading 6 mb-1">
            BULSTAT:
            </v-list-item-title>
            <v-list-item-subtitle>{{client.bulstat}}</v-list-item-subtitle>
        </div>
        <div class="mb-6">
            <v-list-item-title class="heading 6 mb-1">
            Registration Address:
            </v-list-item-title>
            <v-list-item-subtitle>{{client.regAddress}}</v-list-item-subtitle>
        </div>
        <div class="mb-6">
            <v-list-item-title class="heading 6 mb-1">
            Short Note:
            </v-list-item-title>
            <v-list-item-subtitle>{{client.corAddress}}</v-list-item-subtitle>
        </div>
        <div class="mb-6">
            <v-list-item-title class="heading 6 mb-1">
            Status:
            </v-list-item-title>
            <v-list-item-subtitle>{{client.status}}</v-list-item-subtitle>
        </div>
        <div>
            <EditClient /> 
            <!-- <butt on @click.stop="deleteboard(key)">Delete</button> -->
        </div>

      </v-list-item-content>
    </v-list-item>
  </v-card>
  <div>
    <h1>Contacts</h1>
    <v-btn class="float-right">Create contact</v-btn>
  </div>
  <v-expansion-panels accordion>
    <v-card style="width: 100%;" class="mb-2">
      <div slot="header">header</div>
      <v-card-text>
        <div>Create new contact</div>
      </v-card-text>
      <div class="px-5 pb-5">
        <v-layout row wrap>
          <v-flex xs12 md6 class="px-15 mb-0">
            <v-text-field
                  placeholder="Name"
                  v-model="contact.name"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 class="px-15  mb-0">
            <v-text-field
                placeholder="Email"
                v-model="contact.email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 class="px-15">
            <v-text-field
                placeholder="Phone Number"
                v-model="contact.phone"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 class="px-15">
            <v-text-field
                placeholder="Address"
                v-model="contact.address"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 class="px-15">
            <v-text-field
                placeholder="Position"
                v-model="contact.position"
            ></v-text-field>
          </v-flex>
          <v-btn @click="submit()" class="mx-15">Save</v-btn>
        </v-layout>
      </div>
    </v-card>

    <v-expansion-panel
      v-for="contact in clientContacts"
      :key="contact.name"
    >
      <v-expansion-panel-header>{{ contact.name }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-layout row wrap class="pa-3">
          <v-flex xs12 md6 class="mb-5">
            <div class="caption grey--text pa-0">Email</div>
            <div class="subtitle-2">{{ contact.email }}</div>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text pa-0">Phone</div>
            <div class="subtitle-2">{{ contact.phone }}</div>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text pa-0">Address</div>
            <div class="subtitle-2">{{ contact.address }}</div>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text pa-0">Position</div>
            <div class="subtitle-2">{{ contact.position }}</div>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </div>
  </v-container>
</template>

<script>
import db from '@/fb'
import EditClient from '../components/EditClient'

// import router from '../router'

export default {
  components: { EditClient },
  data: () => ({
    key: '',
    client: [],
    clientContacts: [],
    contact: [],
    userEmail: '',
  }),
  created () {
      console.log('again calling the params' + this.$route.params.id );
      const ref = db.collection('users').doc(this.$route.params.id).collection('client-info').doc(this.$route.params.id);
      console.log(ref);
        ref.onSnapshot((doc) => {
          if (doc.exists) {
              this.key = doc.id;
              this.client = doc.data();
              console.log(this.client);
          } else {
              alert("No such document!");
          }
        })
            db.collection('users').doc(this.$route.params.id).onSnapshot((userDoc) =>{
          this.userEmail = userDoc.data().email
          })
      // ref.get().then((doc) => {
      //     if (doc.exists) {
      //         this.key = doc.id;
      //         this.client = doc.data();
      //         console.log(this.client);
      //     } else {
      //         alert("No such document!");
      //     }
      // }).then( () => {
      //     return db.collection('users').doc(this.$route.params.id).get().then((userDoc) =>{
      //     this.userEmail = userDoc.data().email
      //     })
      // })
     db.collection('users').doc(this.$route.params.id).collection('client-contacts').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
            if (change.type === 'added'){
              this.clientContacts.push({
                ...change.doc.data(),
                id: change.doc.id
              });
            }
        })
      })
    },
  methods:{
    submit(){
    db.collection('users').doc(this.$route.params.id).collection('client-contacts').doc().set({
            name: this.contact.name,
            email: this.contact.email,
            phone: this.contact.phone,
            address: this.contact.address,
            position: this.contact.position,
      })   
  },
  }
}
</script>