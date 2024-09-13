import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
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
import {
  convertIsoStringToTimestamp,
  convertTimestampToIsoString,
} from '../api'

export const useAuthService = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.emailVerified) {
        //aca tengo que ver si el email esta verificado antes de loguearlo
        const docRef = doc(db, 'users', firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        const payload = {
          userData: docSnap.data(),
          user: firebaseUser.email,
        }
        const parsePayloadData = {
          userData: convertTimestampToIsoString(payload.userData),
          user: firebaseUser.email,
        }

        dispatch(loginSuccess(parsePayloadData))
      } else {
        console.log('holis')
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
        if (user.emailVerified) {
          //modelo para guardar datos
          const payload = {
            user: user.email,
          }
          dispatch(loginSuccess(payload))
          return user
        } else if (!user.emailVerified) {
          await auth.signOut()
          dispatch(loginFailure('notVerified'))
          return user
        }
      }
    } catch (error) {
      console.error(error)
      dispatch(loginFailure('incorrectPassword'))
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
        await sendEmailVerification(user)
        const userPayload = createUserPayload(user)
        const parsePayloadForFirebase = convertIsoStringToTimestamp(userPayload)
        await saveUserToFirestore(parsePayloadForFirebase, user.uid)
        await auth.signOut()

        return user
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
      const userPayloadForFirebase = convertIsoStringToTimestamp(userPayload)
      saveUserToFirestore(userPayloadForFirebase, result.user.uid)
      //aca si tengo problemas puedo volver a ponerle el uid al userData para ver si se arregla
    }
  }

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        enqueueSnackbar('Correo de recuperación enviado', {
          variant: 'success',
        })
        // Mostrar alguna notificación al usuario o redirigir
      })
      .catch(() => {
        enqueueSnackbar('Error al enviar el correo de recuperación', {
          variant: 'success',
        })
        // Manejar errores (como formatos de correo no válidos, problemas de red, etc.)
      })
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
      const userPayloadForFirebase = convertIsoStringToTimestamp(userPayload)
      dispatch(updateUserData(parsedFields))
      await updateDoc(userDocRef, userPayloadForFirebase)
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

  const searchUserByDNI = async (dni) => {
    try {
      // Referencia a la colección de usuarios
      const usersCollectionRef = collection(db, 'users')

      // Crea una consulta para buscar el DNI en la colección
      const q = query(usersCollectionRef, where('dni', '==', dni))

      // Ejecuta la consulta
      const querySnapshot = await getDocs(q)

      // Verifica si hay documentos que coinciden con el DNI
      if (!querySnapshot.empty) {
        return true // El DNI ya está registrado
      } else {
        return false // El DNI no está registrado
      }
    } catch (error) {
      console.error('Error buscando el DNI:', error)
      throw new Error('Error buscando el DNI')
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
    resetPassword,
    searchUserByDNI,
  }
}
