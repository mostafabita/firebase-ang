importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyD76MI15yxje6heFlbgVD6RpltWlwlf4gw',
  authDomain: 'my-test-firebase-project-3eb77.firebaseapp.com',
  databaseURL: 'https://my-test-firebase-project-3eb77.firebaseio.com',
  projectId: 'my-test-firebase-project-3eb77',
  storageBucket: 'my-test-firebase-project-3eb77.appspot.com',
  messagingSenderId: '679811419548',
  appId: '1:679811419548:web:89a589ea042d00d1de8c59',
  measurementId: 'G-DVK6HN5TPW',
});

const messaging = firebase.messaging();
