import firebase from 'firebase'
import db from '../../fb'

const state = {
    documents: [],
}

const getters = {
    getDocuments: state => state.documents
}

const actions = {
    // Create Document
    async createDocument({commit}, payload) {
        return new Promise(function () {
            const dateTime = new Date().getMilliseconds()
            var storageRef = firebase.storage().ref("/documents/"+dateTime+"-"+payload.file.file_name);

            let uploadTask = storageRef.put(payload.file.file);

            uploadTask.on('state_changed', () => {
            }, function(err){
                commit("setToast", {message: err.message, color: "red", show: true})
            }, async function() {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    payload.file.file = downloadURL
                    db.collection("documents")
                    .add(payload)
                    .then(result => {
                        payload.id = result.id
                        payload.file_name = payload.file.file_name
                        payload.file_path = payload.file.file
                        delete payload.file
                        commit('addDocument', payload)
                        commit("setToast", {message: "Document Added Successfully.", color: "green", show: true})
                    })
                    .catch((error) => {
                        commit("setToast", {message: error.message, color: "red", show: true})
                    });
                }).catch(err => {
                    commit("setToast", {message: err.message, color: "red", show: true})
                })
            })
        });
    },
    // Fetch Documents
    fetchDocuments({commit}) {
        let documentsArray = []
        db.collection("documents")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            documentsArray.push({
                id: doc.id,
                client_name: doc.data().client_name,
                client_id: doc.data().client_id,
                status: doc.data().status,
                category: doc.data().category,
                month: doc.data().month,
                file_name: doc.data().file.file_name,
                file_path: doc.data().file.file,
                isArchived: doc.data().isArchived
            });
            });
            commit('setDocuments', documentsArray)
        })
        .catch((error) => {
            commit("setToast", {message: error.message, color: "red", show: true})
        });
    },

    // Update Document Status
    updateDocumentStatus({commit}, payload) {
        db.collection("documents")
        .doc(payload.id)
        .update({
          status: payload.status,
        })
        .then(() => {
            commit('updateDocuments', payload)
            commit("setToast", {message: "Document Status Updated Successfully", color: "green", show: true})
        })
        .catch((error) => {
            commit("setToast", {message: error.message, color: "red", show: true})
        });
    },

    // Update Archive
    updateArchive({commit}, payload) {
        db.collection("documents")
        .doc(payload.id)
        .update({
          isArchived: payload.isArchived,
        })
        .then(() => {
            commit('updateDocuments', payload)
            commit("setToast", {message: "Document Archived Successfully", color: "green", show: true})
        })
        .catch((error) => {
            commit("setToast", {message: error.message, color: "red", show: true})
        });
    }

}

const mutations = {
    // Set Documents
    setDocuments: (state, payload) => state.documents = payload,
    addDocument: (state, payload) => state.documents.push(payload),
    updateDocuments: (state, payload) => {
      state.documents = state.documents.map(doc => {
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