<template>
  <div class="archived-documents">
    <v-container class="my-5">
      <v-row>
        <v-col cols="8">
            <h2 v-if="$vuetify.breakpoint.mdAndUp" class="info--text">Archived Documents</h2>
            <h4 v-if="$vuetify.breakpoint.smAndDown" class="info--text">Archived Documents</h4>
        </v-col>
      </v-row>

      <v-row v-if="loading" class="my-5">
        <v-col cols="12" class="text-center">
            <v-progress-circular
                indeterminate
                color="info"
                size="40"
            ></v-progress-circular>
            <p class="mt-3 subtitle-2">Loading Archived Documents...</p>
        </v-col>
      </v-row>

      <v-row v-if="!loading && !documents.length" class="my-5">
        <v-col cols="12" class="text-center">
            <p class="mt-3 info--text">No Document Found</p>
        </v-col>
      </v-row>

      <v-row v-if="!loading && documents.length">
        <v-col cols="12">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              outlined
              dense
              class="cyan lighten-5"
              single-line
              hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="d-flex" v-if="selected.length">
          <v-btn color="info" text :disabled="isStatusUpdating" @click="archiveDocuments()"><v-icon>mdi-arrow-down</v-icon>Remove From Archive</v-btn>
          <download-excel
            class="btn btn-default"
            :data="selected"
            :fields="json_fields"
            worksheet="Documents Worksheet"
            name="Documents.xls"
          >
            <v-btn color="info" text :disabled="isStatusUpdating">Export</v-btn>
          </download-excel>
        </v-col>
      </v-row>

      <v-data-table
        v-if="!loading && documents.length"
        v-model="selected"
        :headers="headers"
        :items="documents"
        :search="search"
        :single-select="singleSelect"
        item-key="id"
        show-select
      >
        <template v-slot:item.file_name="{ item }">
            <a :href="item.file_path" target="_blank"><strong>{{item.file_name}}</strong></a>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "ArchivedDocuments",
  computed: {
    ...mapGetters(["getDocuments", "getToast"])
  },
  methods: {
    ...mapActions(['fetchDocuments', 'updateArchive']),
    

    async archiveDocuments() {
      // console.log(this.selected)
      Promise.all(
        this.selected.map(async doc => {
            this.isStatusUpdating = true
            doc.isArchived = false
            await this.updateArchive(doc)
        })
      )
    }
  },
  created() {
    if(!this.getDocuments.length) {
      this.loading = true
      this.fetchDocuments()
    }
    else {
      this.documents = this.getDocuments.filter(doc => doc.isArchived)
      // Sorting in Ascending Order
        this.documents = this.documents.sort((a,b) => new Date(a.month) - new Date(b.month))
    }
  },
  watch: {
    getDocuments(val) {
      if(val) {
        this.loading = false
        this.documents = val.filter(doc => doc.isArchived)
        // Sorting in Ascending Order
        this.documents = this.documents.sort((a,b) => new Date(a.month) - new Date(b.month))
      }
    },
    getToast(val) {
      if(val) {
        this.loading = false
        this.isStatusUpdating = false
      }
    }
  },
  data() {
    return {
      search: null,
      singleSelect: false,
      selected: [],
      loading: false,
      isStatusUpdating: false,
      headers: [
        { text: 'File Name', sortable: true, value: 'file_name'},
        { text: 'Client', value: 'client_name', sortable: true },
        { text: 'Category', value: 'category', sortable: true },
        { text: 'Month', value: 'month', sortable: true },
        { text: 'Status', value: 'status', sortable: true },
      ],

      documents: [],
      json_fields: {
        "File Name": "file_name",
        "File Path": "file_path",
        "Client Name": "client_name",
        "Category": "category",
        "Month": "month",
        "Status": "status"
      }
    }
  }
};
</script>
