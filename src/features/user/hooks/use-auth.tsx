import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { useUser } from "@/providers/user-provider";
import { useEffect } from "react";
import { getUserData } from "../services/get-user-data";
import { signInAnonymous, auth } from "@/config/firebase-config";
import { createUser } from "../services/create-user";
import { User } from "../types";


export const useAuth = (initData?: User) => {
    const uid = useUser((state) => state.user.uid)
    const setUser = useUser((state) => state.setUser)

    useEffect(() => {
        if(!initData) return
        setUser({ ...initData })
    }, [initData])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
            if (user) {
                getUserData(user.uid, (data) => {
                    if (data) {
                        setUser({
                            ...data,
                            uid: user.uid
                        })
                    }
                })
            } else {
                const userCredential = signInAnonymous()
                const idTokenPromise = userCredential.then((res) => res.user.getIdToken())
                idTokenPromise.then((idToken) => {
                    fetch('/api/auth/session', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idToken }),
                    });
                });
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (uid) {
            createUser(uid)
        }
    }, [uid])
}