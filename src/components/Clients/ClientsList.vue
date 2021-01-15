<template>
    <div class="all-events mt-5">
        <v-row v-if="loading" class="my-5">
            <v-col cols="12" class="text-center">
                <v-progress-circular
                    indeterminate
                    color="info"
                    size="40"
                ></v-progress-circular>
                <p class="mt-3 subtitle-2">Loading Clients...</p>
            </v-col>
        </v-row>
        <v-row v-if="!loading">
            <v-col cols="12">
                <v-text-field
                    v-model.lazy="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    outlined
                    dense
                    class="cyan lighten-5"
                    single-line
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-4" v-if="!loading && getClients.length">
                <v-card class="px-3 py-0 rounded-0" v-for="client in getClients" :key="client.companyName" @click.stop="$router.push('/client-account/'+client.id)">
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
                            <v-chip small :color="client.client_info.status ? 'green lighten-3' : 'grey'" dark> {{ client.client_info.status }} </v-chip>
                            <!-- <button size="sm" @click.stop="details(client.id)">Details</button> -->
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
                <!-- <v-data-table
                    :headers="headers"
                    :items="clients"
                    :search="search"
                >
                <template v-slot:item.documents="{ item }">
                    <v-btn small color="info" link :to="'/client/'+item.id+'/documents'" depressed>Documents</v-btn>
                </template>
                <template v-slot:item.events="{ item }">
                    <v-btn small color="info" link :to="'/client/'+item.id+'/events'" depressed>Events</v-btn>
                </template>
                </v-data-table> -->
            </v-col>
        </v-row>
        <v-row v-if="!loading && !getClients.length" class="my-5">
            <v-col cols="12" class="text-center">
                <p class="mt-3 info--text">No Client Found</p>
            </v-col>
      </v-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "ClientsList",
    computed: {
        ...mapGetters(['getUsers']),
        getClients() {
            if(this.search) {
                const results = this.clients.filter(client => client.client_info.companyName.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
                return results
            }
            return this.clients
        },
    },
    data() {
        return {
            search: null,
            loading: false,
            headers: [
                { text: 'Company Name', sortable: true, value: 'client_info.companyName'},
                { text: 'Email', sortable: true, value: 'email'},
                { text: 'Bulstat', value: 'client_info.bulstat', sortable: true },
                { text: 'VAT', value: 'client_info.vat', sortable: true },
                { text: 'Documents', value: 'documents' },
                { text: 'Events', value: 'events' },
            ],
            clients: [],
        }
    },

    async created() {
        if(!this.getUsers.length) {
            this.loading = true
            await this.fetchUsers()
            this.loading = false
        }
        else {
            this.clients = this.getUsers
        }
    },
    watch: {
        getToast() {
            this.loading = false
        },
        getUsers(val) {
            if(val && val.length) {
                this.clients = val
                console.log(this.clients)
            }
        },
        getEvents(val) {
            if(val) {
                this.loading = false
                this.clients = val
            }
        }
    },

    methods: {
        ...mapActions(['fetchUsers']),
        
    }
}
</script>