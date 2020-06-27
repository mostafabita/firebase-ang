const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.fcmSend = functions.firestore
  .document('/courses/{id}')
  .onCreate((event) => {
    const message = event.data();
    const userId = 'ic2wP5qC7CY8JTW7Y7iE5FsJLgf2';
    // const userId = event.params.userId;
    const payload = {
      notification: {
        title: message.title,
        body: 'From cloud function',
        icon: '',
      },
    };
    admin
      .messaging()
      .sendToDevice(
        'dish7CE2Z_adnNFlir0Lz8:APA91bHgzp0EWAfwvmUrEVlv1vlRgunVh2pbFdRRsY2u_Hr_kIHCBguXp7-z6MNsyyCejqqxHjEuoEt-ATDin_HMOc21TWZBI549GjrQRDqmWSD2HmGapfve-E8nYDL_ECwXqmMONJvj',
        payload
      );
    // admin.firestore
    //   .document(`/fcmTokens/${userId}`)
    //   .once('token')
    //   .then((token) => {
    //     console.log(token);
    //     return token;
    //   })
    //   .then((token) => {
    //     return admin.messaging().sendToDevice(token, payload);
    //   })
    //   .then((res) => {
    //     console.log('Sent successfully', res);
    //     return res;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  });
