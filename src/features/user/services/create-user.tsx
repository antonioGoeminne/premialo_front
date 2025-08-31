import { db } from "@/config/firebase-config";
import { doc, setDoc } from "firebase/firestore";

export const createUser = async (uid: string) => {
    if (!uid) return;
    console.log('uid', uid)

    const userRef = doc(db, "users", uid);

    try {
        await setDoc(userRef, {
            uid: uid,
        }, { merge: true });
    } catch (error) {
        console.error("Error creating user in Firestore: ", error);
    }
}