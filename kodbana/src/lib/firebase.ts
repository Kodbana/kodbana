import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Din riktiga Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyC_LfOgi9olBu0vfsMKPYjZqPRDJCaITQQ",
  authDomain: "kodbana-6cd0e.firebaseapp.com",
  projectId: "kodbana-6cd0e",
  storageBucket: "kodbana-6cd0e.appspot.com", // 🔧 OBS: ändrat till korrekt domain
  messagingSenderId: "487234773270",
  appId: "1:487234773270:web:6cf26a03ce24edd1edb037",
};

// 🔁 Initiera Firebase-appen bara en gång
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

// ✅ Exportera auth & firestore som du använder i resten av appen
export const auth = getAuth();
export const db = getFirestore();
