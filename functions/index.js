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
      .collection('fcmTokens')
      .doc(task.userId)
      .get()
      .then((token) => {
        console.log(token);
        return token.token;
      })
      .then((token) => {
        return admin.messaging().sendToDevice(token, payload);
      })
      .then((res) => {
        console.log('Sent successfully', res);
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  });
