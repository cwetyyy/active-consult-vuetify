<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="info"
          depressed
          dark
          v-bind="attrs"
          v-on="on"
        >
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="headline">Client Profile</span>
          </v-card-title>
        
          <v-card-text>
            <v-container>
              <v-row>
              <v-col cols="12">
                  <v-text-field
                    label="Company Name*"
                    required
                    v-model="client.companyName"
                  ><p>kokokok</p></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    v-model="userEmail"
                    prepend-icon="mdi-email"
                    disabled
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    :rules="inputRules"
                    v-model="password"
                    prepend-icon="mdi-form-textbox-password"
                  ></v-text-field>
                </v-col> -->
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="VAT*"
                    required
                    v-model="client.vat"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="BULSTAT*"
                    requierd
                    hint="example of helper text only on focus"
                    v-model="client.bulstat"
                  ></v-text-field>
                </v-col>
                              <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Registration Address"
                    v-model="client.regAddress"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Correnspondance Address"
                    hint="example of helper text only on focus"
                    v-model="client.corAddress"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    counter
                    label="Short Note"
                    rows="1"
                    :rules="rules"
                    auto-grow
                    v-model="client.shortNote"
                  ></v-textarea>
                </v-col>
                <v-switch
                  v-model="client.status"
                  :label="`Status: ${client.status}`"
                ></v-switch>
              </v-row>
            
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false ; submit()"
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import db from '@/fb';
// import firebase from 'firebase';
// require('firebase/auth');
export default {
    data: () => ({
      dialog: false,
      inputRules: [
        v => v.length >= 6 || 'Minimum lenght is 6 characters'
      ],
      rules: [v => v.length <= 200 || 'Max 200 characters'],
    //   switch1: true,
      client: [],
      userEmail: '',
    //   key: this.$route.params.id,
      companyName: '',  
    //   email: '',
    //   password: '',
    //   vat: '',
    //   bulstat: '',
    //   regAddress: '',
    //   corAddress: '',
    //   shortNote: '',
    }),
    created () {
        console.log('tuka sme' + this.$route.params.id );
        const ref = db.collection('users').doc(this.$route.params.id).collection('client-info').doc(this.$route.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.key = doc.id;
                this.client = doc.data();
                console.log('Company Name: ' + this.client.companyName);
            } else {
                alert("No such document!");
            }
        }).then( () => {
            return db.collection('users').doc(this.$route.params.id).get().then((userDoc) =>{
            this.userEmail = userDoc.data().email
            })
        })
    },
    methods: {
      submit(){
        let payload = {
          client_info: {
            companyName: this.client.companyName,
            vat: this.client.vat,
            bulstat: this.client.bulstat,
            regAddress: this.client.regAddress,
            corAddress: this.client.corAddress,
            shortNote: this.client.shortNote,
            status: this.client.status
          }
        }
        db.collection('users').doc(this.$route.params.id).update(payload).then(() => {
          payload.id = this.$route.params.id
          this.$store.commit('editUser', payload)
        }).catch(err => console.log(err.message))
      },
    },
    watch: {
        // dialog: function(val) {
        //   if(val) { 
        //   this.companyName= ''; 
        //   this.email= ''; 
        //   this.password= ''; 
        //   this.vat= ''; 
        //   this.bulstat= ''; 
        //   this.regAddress= '';  
        //   this.corAddress= ''; 
        //   this.shortNote= ''; 
        //   this.switch1= true;
        //   }
        // }
    }
}
</script>