<template>
  <div class="clients">
    <h1 class="subtitle-1 grey--text">Clients</h1>
    <v-container class="my-5">
      <CreateClient /> 
      <v-layout row class="mb-3">
        <v-btn small text @click="sortBy('companyName')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">By Client name</span>
        </v-btn>
        <v-btn small text @click="sortBy('vat')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">By VAT</span>
        </v-btn>
      </v-layout>
      <v-card class="px-3 py-0 rounded-0" v-for="client in clients" :key="client.companytName">
        <v-layout row wrap :class="`pa-3 client ${client.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text pa-0">Company Name</div>
            <div class="subtitle-2">{{ client.companyName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">VAT</div>
            <div class="subtitle-2">{{ client.vat }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">BULSTAT</div>
            <div class="subtitle-2">{{ client.bulstat }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <!-- <div class="caption grey--text">Status</div>
            <div class="subtitle-2">{{ client.status }}</div> -->
            <div class="right">
              <v-chip small :class="`${client.status} white--text caption`"> {{ client.status }} </v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import CreateClient from '../components/CreateClient'
import db from '@/fb'

export default {
  components: { CreateClient },
  data: () => ({
    clients: []
  }),
  methods: {
    sortBy(prop){
      this.clients.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
  },
      created() {
      db.collection('users').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
           if (change.type === 'added'){
             this.clients.push({
               ...change.doc.data(),
               id: change.doc.id
             });
           }
        })
      })
    }
};
</script>

<style scoped>
  .client.true {
    border-left: 4px solid #3cd1c2;
  }

  .client.false {
    border-left: 4px solid tomato;
  }

  .v-chip{
    float: right;
  }

  .v-chip.true {
    background: #3cd1c2 !important;
  }

  .v-chip.false {
    background: tomato !important;
  }
</style>