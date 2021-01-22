import firebase from 'firebase'
import db from '../../fb'
import mixin from '../../mixins/global'
import router from '../../router/index'
import axios from 'axios'

const state = {
    users: []
}

const getters = {
    getUsers: state => state.users
}

const actions = {

  // CREATE USER
  async createUser({commit}, payload) {
    commit('setUserCreated', null)
    axios.post('https://us-central1-active-consult.cloudfunctions.net/createUser', payload).then(result => {
        if(result.data.success) {
            db.collection('users').doc(result.data.id).set(payload).then(() => {
              payload.id = result.data.id
              this.$store.commit('addUser', payload)
          })
        }
    }).catch(err => {
        commit("setToast", {message: err.message, show: true, color: "red"})
    })
  },

  // Login User
  loginUser({commit}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {
      firebase.auth().onAuthStateChanged(user => {
        db.collection("users").doc(user.uid).get().then(doc => {
          const data = doc.data()
          if(!data.isAdmin) {
            commit("setToast", {message: "Only Admin can Login.", color: "red", show: true})
          }
          else {
            mixin.methods.setLoggedUser(data)
            router.push('/')
          }
        }).catch(err => commit("setToast", {message: err.message, color: "red", show: true}));
      })
    }).catch(err => commit("setToast", {message: err.message, color: "red", show: true}));
  },

 // Fetch Users
 async fetchUsers({commit}) {
    let usersArray = []
    await db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            usersArray.push({
              id: doc.id,
              email: doc.data().email,
              // companyName: doc.data().client_info.companyName,
              isAdmin: doc.data().isAdmin,
              client_info: doc.data().client_info
              // bulstat: doc.data().client_info.bulstat,
              // vat: doc.data().client_info.vat,
              // regAddress: doc.data().client_info.regAddress,
              // corAddress: doc.data().client_info.corAddress,
              // shortNote: doc.data().client_info.shortNote,
              // status: doc.data().client_info.status,
            });
          });
          commit('setUsers', usersArray)
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
}

const mutations = {
    // Set Users
    setUsers: (state, payload) => state.users = payload,
    addUser: (state, payload) => state.users.push(payload),
    editUser: (state, payload) => {
      state.users = state.users.map(user => {
        if(user.id == payload.id) {
          return Object.assign({}, user, payload)
        }
        return user
      })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}