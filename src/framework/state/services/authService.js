import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import {
  loginFailure,
  loginSuccess,
  logoutSuccess,
  loginLoading,
  updateUserData,
} from '../slices/authSlice'
import { auth, db } from '../../../../firebaseConfig'
import { createUserPayload } from '../../models/authModel'
import dayjs from 'dayjs'

export const useAuthService = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
    //TODO, aca tendria que fetchear la base de datos para traer los datos del usuario
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
      console.error(error)
      dispatch(loginFailure(error.message))
    }
  }
  const createUser = async ({ email, password }) => {
    // Validación de parámetros
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    dispatch(loginLoading())

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      if (user) {
        const userPayload = createUserPayload(user)
        await saveUserToFirestore(userPayload, user.uid)
        dispatch(loginSuccess({ user: user.email, userData: userPayload }))
        return user
      } else {
        throw new Error('User creation failed')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      dispatch(loginFailure(error.message))
      throw error
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

  const updateUserToFirestore = async (userPayload, uid) => {
    try {
      const userDocRef = doc(db, 'users', uid)
      const parsedFields = {
        ...userPayload,
        updatedAt: dayjs().toISOString(),
      }
      dispatch(updateUserData(parsedFields))
      await updateDoc(userDocRef, parsedFields)
    } catch (e) {
      console.error('Error updating document to Firestore:', e)
    }
  }

  const logoutUser = async () => {
    try {
      await signOut(auth)
      dispatch(logoutSuccess())
    } catch (error) {
      //TODO logout failure
      console.error(error)
    }
  }
  return {
    loginUser,
    logoutUser,
    createUser,
    saveUserToFirestore,
    updateUserToFirestore,
  }
}
