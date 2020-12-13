<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">ClientAccount</h1>
    <v-container class="my-5">
        
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
        </div>
      </v-list-item-content>
    </v-list-item>

  </v-card>
    </v-container>
  </div>
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
    userEmail: '',
  }),
    created () {
        console.log('again calling the params' + this.$route.params.id );
        const ref = db.collection('users').doc(this.$route.params.id).collection('client-info').doc(this.$route.params.id);
        console.log(ref);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.key = doc.id;
                this.client = doc.data();
                console.log(this.client);
            } else {
                alert("No such document!");
            }
        }).then( () => {
            return db.collection('users').doc(this.$route.params.id).get().then((userDoc) =>{
            this.userEmail = userDoc.data().email
            })
        })
    },
}
</script>