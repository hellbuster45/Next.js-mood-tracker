'use client'
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { useContext, useState, useEffect } from "react"

const authContext = React.createContext()

export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)

    // AUTH HANDLERS
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signOut(){
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // set user to our local context change
                setLoading(true)
                setCurrentUser(user)

                if(!user)
                {
                    console.log("No user found!")
                    return
                }

                // if user exists, fetch data from firestore database
                console.log("Fetching user data...")
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}

                if(docSnap.exists()) {
                    console.log("Found user data !")
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
                }
                setUserDataObj(firebaseData)

            } catch(err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        signOut,
        login,
        loading
    }

    return(
        <authContext.Provider value={value}>
            { children }
        </authContext.Provider>
    )

}