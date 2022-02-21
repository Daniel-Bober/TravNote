// import { initializeApp } from 'firebase/app';
// import { getStorage, ref } from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: 'AIzaSyCC6sL4aH8CDtWFeqILDNyU5HqcuGiw9uU',
//     authDomain: 'travnote.firebaseapp.com',
//     projectId: 'travnote',
//     storageBucket: 'travnote.appspot.com',
//     messagingSenderId: '308708629550',
//     appId: '1:308708629550:web:b48cf513e43b80b17193bf',
// };

// const app = initializeApp(firebaseConfig);

// const firebaseStorage = getStorage();

// const storageRef = ref(firebaseStorage);

// export default class Storage {
//     static uploadFile(file, folder) {
//         const storageRef = firebaseStorage.storage().ref(folder);
//         const thisRef = storageRef.child(file.name);
//         thisRef.put(file).then((res) => {
//             console.log('file submit');
//         });
//     }

//     static downloadFile(file, folder) {
//         console.log('test');
//     }

//     static deleteFile(file, folder) {

//     }
// }

// // Your web app's Firebase configuration

// // Initialize Firebase
