import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import {
  loginFailure,
  loginSuccess,
  logoutSuccess,
  loginLoading,
} from '../slices/authSlice'
import { auth, db } from '../../../../firebaseConfig'

export const useAuthService = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('firebaseUser', firebaseUser)
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        const payload = {
          userData: docSnap.data(),
          user: firebaseUser.email,
        }
        dispatch(loginSuccess(payload))
      } else {
        dispatch(loginFailure())
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const loginUser = async ({ email, password }) => {
    dispatch(loginLoading())
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      if (user) {
        //modelo para guardar datos
        const payload = {
          user: user.email,
        }
        dispatch(loginSuccess(payload))
      }
      return user
    } catch (error) {
      console.log(error)
      dispatch(loginFailure(error.message))
    }
  }
  const createUser = async ({ email, password, name, surname }) => {
    dispatch(loginLoading())
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      if (user) {
        //modelo para guardar datos
        //TODO: crear un modelo para crear un usuario
        const payload = {
          user: user.email,
          userData: {
            name,
            surname,
            email,
          },
        }
        dispatch(loginSuccess(payload))

        // Intentar almacenar información adicional en Firestore
        // TODO: crear un modelo para userPayload
        const userPayload = {
          email: user.email,
          name,
          surname,
        }

        await saveUserToFirestore(userPayload, user.uid)
        return user
      }
    } catch (error) {
      console.error('Error creating user:', error)
      dispatch(loginFailure(error.message))
    }
  }

  const saveUserToFirestore = async (userPayload, uid) => {
    try {
      const userDocRef = doc(db, 'users', uid)
      await setDoc(userDocRef, userPayload)
    } catch (e) {
      console.error('Error adding document to Firestore:', e)
    }
  }

  const logoutUser = async () => {
    try {
      await signOut(auth)
      dispatch(logoutSuccess())
    } catch (error) {
      //TODO logout failure
      console.log(error)
    }
  }
  return { loginUser, logoutUser, createUser }
}
