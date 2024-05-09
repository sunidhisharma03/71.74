import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyBeMyr5JKwJYGv2rWnIR0tgtqQj1FMLQ7w",
        authDomain: "ecothon-11b92.firebaseapp.com",
        databaseURL: "https://ecothon-11b92-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "ecothon-11b92",
        storageBucket: "ecothon-11b92.appspot.com",
        messagingSenderId: "882497002031",
        appId: "1:882497002031:web:dd139ca8062885f17544da"
      };
      
      
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);
}

export default StartFirebase;
