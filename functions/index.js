const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.fcmSend = functions.firestore
  .document('/tasks/{id}')
  .onCreate((snap, context) => {
    const task = snap.data();
    // const userId = context.params.userId;
    const payload = {
      notification: {
        title: task.title,
        body: 'From cloud function',
        icon: '',
      },
    };
    admin
      .firestore()
      .doc(`/fcmTokens/${task.userId}`)
      .get()
      .then((ref) => ref.data())
      .then((data) => {
        return admin.messaging().sendToDevice(data.token, payload);
      })
      .then((res) => console.log('Sent successfully!', res))
      .catch((error) => {
        console.log(error);
      });
  });
