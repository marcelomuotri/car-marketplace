// src/framework/api/productApi.js
import { useAddEntityMutation } from '../state/api'
import { enqueueSnackbar } from 'notistack'
import { SupportQueryUpload, SupportQuery } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

const base = 'support'

// Hook para agregar un producto
export const useAddSupport = () => {
  const [addSupport, { isLoading, error }] = useAddEntityMutation()
  const userData = useSelector((state: RootState) => state.auth.userData)

  const addNewSupport = async (supportData: SupportQueryUpload) => {
    const supportToUpload: SupportQuery = {
      ...supportData,
      createdAt: new Date().toISOString(),
      email: userData?.userEmail,
      name: userData?.name || null,
      uid: userData.uid,
      type: 'web',
    }
    try {
      const result = await addSupport({
        collectionPath: base,
        data: supportToUpload,
      })
      return result
    } catch (e) {
      console.error('Failed to add product:', e)
      enqueueSnackbar('La consulta no ha sido enviada', { variant: 'error' })
    }
  }

  return { addNewSupport, isLoading, error }
}
