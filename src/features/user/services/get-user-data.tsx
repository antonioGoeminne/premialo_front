import { db } from '@/config/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { User } from '../types';

export const getUserData = (uid: string, callback: (data: User | null) => void) => {
    if (!uid) {
        callback(null);
        return;
    };

    const userRef = doc(db, "users", uid);
    
    const unsubscribe = onSnapshot(userRef, (userSnap) => {
        if (userSnap.exists()) {
            callback(userSnap.data() as User);
        } else {
            callback(null);
        }
    });

    return unsubscribe;
}