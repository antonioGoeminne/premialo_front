import { db } from "@/config/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const createUser = async (uid: string) => {
    if (!uid) return;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        try {
            await setDoc(userRef, {
                uid: uid,
                createdAt: new Date(),
            }, { merge: true });
        } catch (error) {
            console.error("Error creating user in Firestore: ", error);
        }
    }
}