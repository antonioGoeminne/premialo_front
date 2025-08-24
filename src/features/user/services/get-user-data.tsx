import { db } from '@/config/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';

export const getUserData = (uid: string, callback: (data: any) => void) => {
    if (!uid) {
        callback(null);
        return;
    };

    const userRef = doc(db, "users", uid);
    
    const unsubscribe = onSnapshot(userRef, (userSnap) => {
        if (userSnap.exists()) {
            callback(userSnap.data());
        } else {
            callback(null);
        }
    });

    return unsubscribe;
}