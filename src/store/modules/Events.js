import db from '../../fb'

const state = {
    events: []
}

const getters = {
    getEvents: state => state.events
}

const actions = {
 // Fetch Events
 fetchEvents({commit}) {
    let eventsArray = []
    db.collection("events")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            eventsArray.push({
              id: doc.id,
              name: doc.data().name,
              status: doc.data().status,
              deadline_date: doc.data().deadline_date,
              companyName: doc.data().companyName,
              user_id: doc.data().user_id,
              description: doc.data().description
            });
          });
          commit('setEvents', eventsArray)
        })
        .catch((error) => {
          commit("setToast", {message: error.message, color: "red", show: true})
        });
    },


 // Create Event
 createEvent({commit}, payload) {
    db.collection("events")
      .add(payload)
      .then(result => {
        payload.id = result.id
        commit('addEvent', payload)
        commit("setToast", {message: "Event Added Successfully.", color: "green", show: true})
      })
      .catch((error) => {
        commit("setToast", {message: error.message, color: "red", show: true})
      });
  },

  // Update Event Status
  updateEventStatus({commit}, payload) {
    db.collection("events")
    .doc(payload.id)
    .update({
      status: payload.status,
    })
    .then(() => {
        commit('updateEvents', payload)
        commit("setToast", {message: "Event Status Updated Successfully", color: "green", show: true})
    })
    .catch((error) => {
        commit("setToast", {message: error.message, color: "red", show: true})
    });
},
}

const mutations = {
    // Set Events
    setEvents: (state, payload) => state.events = payload,
    addEvent: (state, payload) => state.events.push(payload),
    updateEvents: (state, payload) => {
      state.events = state.events.map(doc => {
        if(doc.id == payload.id) {
            return Object.assign({}, doc, payload)
        }
        return doc
      })  
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}