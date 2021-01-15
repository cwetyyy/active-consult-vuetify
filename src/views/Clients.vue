<template>
  <div class="clients">
    <v-container class="my-5">
      <v-row>
        <v-col cols="6" md="10">
            <h2 v-if="$vuetify.breakpoint.mdAndUp" class="info--text">Clients</h2>
            <h4 v-if="$vuetify.breakpoint.smAndDown" class="info--text">Clients</h4>
        </v-col>
        <v-col cols="6" md="2" class="text-right">
          <CreateClient />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ClientsList />
        </v-col>
      </v-row>

    <v-container class="my-5">
      
      <v-layout row class="mb-3">



      </v-layout>
      <!-- <v-card class="px-3 py-0 rounded-0" v-for="client in clients" :key="client.companyName" @click.stop="details(client.id)">
        <v-layout row wrap :class="`pa-3 client ${client.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text pa-0">Company Name</div>
            <div class="subtitle-2">{{ client.client_info.companyName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">VAT</div>
            <div class="subtitle-2">{{ client.client_info.vat }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">BULSTAT</div>
            <div class="subtitle-2">{{ client.client_info.bulstat }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>           
            <div class="float-right">
              <div class="caption grey--text">Status</div>
              <v-chip small :class="`${client.client_info.status} white--text caption`"> {{ client.client_info.status }} </v-chip>
               
            </div>
          </v-flex>
        </v-layout>
      </v-card> -->

    </v-container>
        </v-container>
  </div>
</template>

<script>
import CreateClient from '../components/CreateClient'
import ClientsList from '../components/Clients/ClientsList'
// import db from '@/fb'
import router from '../router'

export default {
  
  components: { CreateClient, ClientsList },
  data: () => ({
  }),
  
  created() {
    
    // db.collection('users').onSnapshot(res => {
    //   const changes = res.docChanges();
    //   changes.forEach(change => {
    //       if (change.type === 'added'){
    //         this.clients.push({
    //           ...change.doc.data(),
    //           id: change.doc.id
    //           // id: change.getRef().getParent()
    //         });
    //       }
    //   })
    // })
    //   db.collectionGroup('client-info').onSnapshot(res => {
    //   const changes = res.docChanges();
    //   changes.forEach(change => {
    //       if (change.type === 'added'){
    //         this.clients.push({
    //           ...change.doc.data(),
    //           id: change.doc.id
    //         });
    //       }
    //   })
    // })
  },
  methods: {
    sortBy(prop){
      this.clients.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    details(client) {
      console.log('tring to push id:' + client);
      router.push({ name: 'ClientAccount', params: { id: client }})
    },
  },


};
</script>

<style scoped>
.client.true {
  border-left: 4px solid #3cd1c2;
}

.client.false {
  border-left: 4px solid tomato;
}

.v-chip {
  float: right;
}

.v-chip.true {
  background: #3cd1c2 !important;
}

.v-chip.false {
  background: tomato !important;
}
</style>