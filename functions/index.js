const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

  // Create a New User
  exports.createUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
      const user = request.body
      admin
      .auth()
      .createUser({
        email: user.email,
        password: user.password,
      })
      .then(user => {
        // See the UserRecord reference doc for the contents of userRecord.
        response.status(200).json({
          success: true,
          message: "User Created Successfully.",
          id: user.uid
        })
      })
      .catch((error) => {
        response.status(500).json({
          error: true,
          message: error.message
        })
      });
    })
  })

