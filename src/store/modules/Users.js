import db from '../../fb'


const state = {
    users: []
}

const getters = {
    getUsers: state => state.users
}

const actions = {

 // Fetch Users
 fetchUsers({commit}) {
    let usersArray = []
    db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            usersArray.push({
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              age: doc.data().age,
              gender: doc.data().gender
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
    setUsers: (state, payload) => state.users = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}