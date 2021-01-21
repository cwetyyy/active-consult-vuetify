<template>
  <div class="documents">
    <v-container class="my-5">
      <v-row>
        <v-col cols="12">
            <h2 v-if="$vuetify.breakpoint.mdAndUp" class="info--text">
              <span v-if="type == 'all'">All Documents</span>
              <span v-if="type != 'all'">Documents / <span v-if="type == 'monthly'">{{getMonth(month)}}</span></span>
              <span v-if="type == 'yearly'">{{year}}</span></h2>
            <h4 v-if="$vuetify.breakpoint.smAndDown" class="info--text">
              <span v-if="type == 'All'">All Documents</span>
              <span v-if="type != 'all'">Documents / <span v-if="type == 'monthly'">{{getMonth(month)}}</span>
              </span> <span v-if="type == 'yearly'">{{year}}</span></h4>
            <div class="d-flex">
              <p :class="type == 'all' ? 'active info--text pl-2 link' : 'info--text pl-2 link'" @click="type = 'all'">All Documents</p>
              <p :class="type == 'monthly' ? 'active info--text pl-2 link' : 'info--text pl-2 link'" @click="type = 'monthly'">Monthly Documents</p>
              <p :class="type == 'yearly' ? 'active info--text pl-2 link' : 'info--text pl-2 link'" @click="type = 'yearly'">Yearly Statements</p>
            </div>
        </v-col>
        <!-- <v-col cols="4" class="text-right" v-if="!loading">
            <v-btn depressed color="info" @click="addModal = !addModal">Upload Document</v-btn>
        </v-col> -->
      </v-row>

      <v-row v-if="loading" class="my-5">
        <v-col cols="12" class="text-center">
            <v-progress-circular
                indeterminate
                color="info"
                size="40"
            ></v-progress-circular>
            <p class="mt-3 subtitle-2">Loading Documents...</p>
        </v-col>
      </v-row>

      <div v-if="type != 'all' && !loading">
        <v-row v-if="!loading">
          <v-col cols="12" md="9">
            <v-text-field
                v-model.lazy="search"
                append-icon="mdi-magnify"
                label="Search"
                outlined
                dense
                class="cyan lighten-5"
                hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-menu
                v-if="type == 'monthly'"
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="month"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="month"
                    placeholder="Select Month"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    outlined
                    hide-details
                    dense
                    color="info"
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                    v-model="month"
                    type="month"
                    color="info"
                    no-title
                    scrollable
                >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(month)"
                >
                    OK
                </v-btn>
                </v-date-picker>
            </v-menu>
            <v-autocomplete outlined v-model="year" hide-details placeholder="Select Year" v-if="type == 'yearly'" dense :items="[2020, 2021]"></v-autocomplete>
          </v-col>
        </v-row>
        <v-row v-if="!loading && documents.length" class="my-3">
          <v-col cols="12" sm="6" md="3">
            <v-card flat color="info">
              <v-card-text>
                <v-row align="center" class="white--text">
                  <v-col cols="8">
                    <h1 class="mb-2">{{getAllDocuments}}</h1>
                    <span>Uploaded</span>
                  </v-col>
                  <v-col cols="4">
                    <v-icon size="50" color="info lighten-5">mdi-cloud-upload-outline</v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat color="info">
              <v-card-text>
                <v-row align="center" class="white--text">
                  <v-col cols="8">
                    <h1 class="mb-2">{{getAllProcessedDocuments}}</h1>
                    <span>Processed</span>
                  </v-col>
                  <v-col cols="4">
                    <v-icon size="50" color="info lighten-5">mdi-check-circle</v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat color="info">
              <v-card-text>
                <v-row align="center" class="white--text">
                  <v-col cols="8">
                    <h1 class="mb-2">{{getAllUnProcessedDocuments}}</h1>
                    <span>Un Processed</span>
                  </v-col>
                  <v-col cols="4">
                    <v-icon size="50" color="info lighten-5">mdi-close-circle</v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat color="info">
              <v-card-text>
                <v-row align="center" class="white--text">
                  <v-col cols="8">
                    <h1 class="mb-2">{{getAllIndividualClients}}</h1>
                    <span>Individual Clients</span>
                  </v-col>
                  <v-col cols="4">
                    <v-icon
                      size="50"
                      color="info lighten-5"
                    >
                      mdi-account-multiple
                    </v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-data-table
          v-if="!loading && documents.length"
          :headers="headers"
          :items="documents"
          item-key="id"
        >
          <template v-slot:item.client_name="{ item }">
            <span class="underline info--text link" @click="$router.push('/client/'+item.client_id+'/documents')"><strong>{{item.companyName}}</strong></span>
          </template>
          <template v-slot:item.total="{ item }">
            {{getTotalDocs(item.client_id)}}
          </template>
          <template v-slot:item.processed="{ item }">
            {{getProcessedDocs(item.client_id)}}
          </template>
          <template v-slot:item.unprocessed="{ item }">
            {{getUnProcessedDocs(item.client_id)}}
          </template>
        </v-data-table>
      </div>

      <div v-if="type == 'all' && !loading">
        <AllDocuments />
      </div>

      <v-row v-if="!loading && !documents.length" class="my-5">
        <v-col cols="12" class="text-center">
            <p class="mt-3 info--text">No Document Found</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'
import AllDocuments from '@/components/Documents/AllDocuments'
export default {
  name: "Documents",
  components: {
    AllDocuments
  },
  computed: {
    ...mapGetters(["getUsers", "getDocuments", "getToast"]),
    getAllDocuments() {
      return this.clientDocs.length
    },
    getAllProcessedDocuments() {
      const docs = this.clientDocs.filter(doc => doc.status == 'Processed')
      return docs.length
    },
    getAllUnProcessedDocuments() {
      const docs = this.clientDocs.filter(doc => doc.status == 'Unprocessed')
      return docs.length
    },
    getAllIndividualClients() {
      return this.documents.length
    }
  },
  methods: {
    ...mapActions(['createDocument', 'fetchUsers', 'fetchDocuments', 'updateDocumentStatus', 'updateArchive']),
    async setClientDocuments() {
      const currentMonth = this.month.split('-')[1]
      const currentYear = this.year
      this.clientDocs = []
      if(this.type == 'all') {
        this.documents = this.getDocuments
        this.clientDocs = this.getDocuments

        return
      }
      await this.getDocuments.forEach(item => {
        let itemMonth = item.month.split('-')[1]
        let itemYear = item.month.split('-')[0]
        if(this.type == 'monthly') {
          if((itemMonth == currentMonth) && !item.isArchived) {
            this.clientDocs.push(item)
          }
        }
        if(this.type == 'yearly') {
          if((itemYear == currentYear) && !item.isArchived) {
            this.clientDocs.push(item)
          }
        }
        
      })
      this.documents = []
      if(this.clientDocs.length) {
        await this.clientDocs.forEach(item => {
          let doc = this.documents.find(cd => cd.client_id == item.client_id)
          if(!doc) {
            this.documents.push(item)
          }
        })
      }

      this.allDocs = this.documents
    },
    getTotalDocs(id) {
      const total = this.clientDocs.filter(doc => doc.client_id == id)
      return total.length
    },
    getProcessedDocs(id) {
      const processed = this.clientDocs.filter(doc => doc.client_id == id && doc.status == 'Processed')
      return processed.length
    },
    getUnProcessedDocs(id) {
      const unprocessed = this.clientDocs.filter(doc => doc.client_id == id && doc.status == 'Unprocessed')
      return unprocessed.length
    },
  },
  created() {
    if(!this.getUsers.length) {
      this.fetchUsers()
    }
    if(!this.getDocuments.length) {
      this.loading = true
      this.fetchDocuments()
    }
    else {
      this.setClientDocuments()
    }
  },
  watch: {
    getDocuments(val) {
      if(val) {
        this.loading = false
        this.setClientDocuments()
      }
    },
    getToast(val) {
      if(val) {
        this.loading = false
      }
    },
    search(val) {
      if(val) {
        console.log(val)
        this.documents = this.allDocs.filter(doc => doc.companyName.toLowerCase().indexOf(val.toLowerCase()) >= 0)
      }
      else {
        this.documents = this.allDocs
      }
    },
    month() {
      this.setClientDocuments()
    },
    year() {
      this.setClientDocuments()
    }
  },
  data() {
    return {
      menu: false,
      type: 'all',
      month: new Date().getFullYear()+"-"+new Date().getMonth()+1,
      year: new Date().getFullYear(),
      addModal: false,
      search: null,
      loading: false,
      headers: [
        { text: 'Client', sortable: true, value: 'client_name'},
        { text: 'Total', value: 'total', sortable: true },
        { text: 'Processed', value: 'processed', sortable: true },
        { text: 'Unprocessed', value: 'unprocessed', sortable: true }
      ],
      documents: [],
      clientDocs: [],
      allDocs: []
    }
  }
};
</script>

<style scoped>
.active {
  padding-bottom: 2px;
  border-bottom: 2px solid skyblue;
}
.link:hover {
  cursor: pointer;
}
.underline {
  text-decoration: underline;
}
</style>
