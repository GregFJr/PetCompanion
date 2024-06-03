import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: 'AIzaSyCK9D2y6nHnNCdcsu5FcV5bQKIVuc78W9I',
    projectId: 'petcompanion-ebf37',
    storageBucket: "nam5 (us-central)",
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);


export { auth, database, browserSessionPersistence, storage };