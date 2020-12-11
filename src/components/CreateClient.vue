<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Create Client
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
                <!-- <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal first name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col> -->
              <v-col cols="12">
                  <v-text-field
                    label="Company Name*"
                    required
                    v-model="companyName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                    v-model="email"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    :rules="inputRules"
                    v-model="password"
                    prepend-icon="mdi-form-textbox-password"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="VAT*"
                    required
                    v-model="vat"
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
                    v-model="bulstat"
                  ></v-text-field>
                </v-col>
                              <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Registration Address"
                    v-model="regAddress"
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
                    v-model="corAddress"
                  ></v-text-field>
                </v-col>
              <!-- <v-col cols="12">
                  <v-text-field
                    label="Short Note"
                    type="password"
                  ></v-text-field>
                </v-col> -->
                <v-col cols="12">
                  <v-textarea
                    counter
                    label="Short Note"
                    rows="1"
                    :rules="rules"
                    auto-grow
                    v-model="shortNote"
                  ></v-textarea>
                </v-col>
                <v-switch
                  v-model="switch1"
                  :label="`Status: ${switch1.toString()}`"
                ></v-switch>
                <!-- <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col> -->
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
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import db from '@/fb';
import firebase from 'firebase';
require('firebase/auth');
export default {
    data: () => ({
      dialog: false,
      inputRules: [
        v => v.length >= 6 || 'Minimum lenght is 6 characters'
      ],
      rules: [v => v.length <= 200 || 'Max 200 characters'],
      switch1: true,
      companyName: '',  
      email: '',
      password: '',
      vat: '',
      bulstat: '',
      regAddress: '',
      corAddress: '',
      shortNote: '',
    }),
    methods: {
      submit(){
        if(this.$refs.form.validate()){
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred => {
                  return db.collection('users').doc(cred.user.uid).set({
                    companyName: this.companyName,
                    vat: this.vat,
                    bulstat: this.bulstat,
                    regAddress: this.regAddress,
                    corAddress: this.corAddress,
                    shortNote: this.shortNote,
                    status: this.switch1.toString(),
                    isAdmin: false,
                  })
                  
              })
              
              //  this.$refs.form.reset() 
        }
      },
    },
    watch: {
        dialog: function(val) {
          if(val) { 
          this.companyName= ''; 
          this.email= ''; 
          this.password= ''; 
          this.vat= ''; 
          this.bulstat= ''; 
          this.regAddress= '';  
          this.corAddress= ''; 
          this.shortNote= ''; 
          this.switch1= true;
          }
        }
    }
}
</script>