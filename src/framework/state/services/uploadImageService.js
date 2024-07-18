// src/framework/state/services/uploadImageService.js
import { useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../firebaseConfig'

export const useUploadImage = () => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const uploadImage = async (file) => {
    setUploading(true)
    setError(null)

    try {
      const storageRef = ref(storage, `images/${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setUploading(false)
      return url
    } catch (err) {
      setError(err)
      setUploading(false)
      return null
    }
  }

  return { uploadImage, uploading, error }
}
