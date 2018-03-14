/**
 * The database object is used for getting data, updating data, and handling events.
 */
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCSvNud-MaaOO8QcJvtGwyGQW9Bd-jJZIo',
  authDomain: 'vietnam-ff78a.firebaseapp.com',
  databaseURL: 'https://vietnam-ff78a.firebaseio.com',
  projectId: 'vietnam-ff78a',
  storageBucket: '',
  messagingSenderId: '704749189837',
}

firebase.initializeApp(config)
const database = firebase.database()

module.exports = { database }
