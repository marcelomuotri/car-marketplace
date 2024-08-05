import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged, updatePassword } from 'firebase/auth'
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
import { useSnackbar } from 'notistack'

export const useAuthService = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

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

  const signInWithGoogle = async (result) => {
    //TODO
    const isNewUser = result._tokenResponse.isNewUser
    if (isNewUser) {
      const userPayload = createUserPayload(result.user)
      saveUserToFirestore(userPayload, result.user.uid)
      //aca si tengo problemas puedo volver a ponerle el uid al userData para ver si se arregla
    }
  }

  const changePassword = async (oldPassword, newPassword) => {
    const user = auth.currentUser
    const email = user.email
    signInWithEmailAndPassword(auth, email, oldPassword)
      .then((userCredential) => {
        // El usuario ha iniciado sesión correctamente.
        const user = userCredential.user

        // Ahora puedes actualizar la contraseña del usuario
        updatePassword(user, newPassword)
          .then(() => {
            enqueueSnackbar('Contraseña actualizada correctamente.', {
              variant: 'success',
            })
          })
          .catch((error) => {
            console.error('Error al actualizar la contraseña:', error)
            enqueueSnackbar('Error al actualizar la contraseña.', {
              variant: 'error',
            })
          })
      })
      .catch((error) => {
        // Hubo un error al iniciar sesión.
        console.error('Error al iniciar sesión:', error)
        enqueueSnackbar('Error al actualizar la contraseña.', {
          variant: 'error',
        })
      })
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
    signInWithGoogle,
    saveUserToFirestore,
    updateUserToFirestore,
    changePassword,
  }
}
