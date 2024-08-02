import { useState, useCallback } from 'react'
import { db } from '../../../../firebaseConfig'
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  addDoc,
  where,
  query,
} from 'firebase/firestore'
import { Product, ProductUpload } from '../../types'
import { parseProduct } from '../../validators/parseProduct'

// Define la interfaz para la estructura de los datos de categorías

export const useProductService = () => {
  // Ajusta el tipo de estado `data` para reflejar el formato correcto
  const [data, setData] = useState<{ [key: string]: any }>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const getProducts = useCallback(async (userId: string) => {
    setLoading(true)
    setError(null)
    if (!userId) {
      setLoading(false)
    }

    try {
      const collectionRef = collection(db, 'products')
      const q = query(collectionRef, where('uid', '==', userId))
      const querySnapshot = await getDocs(q)
      const products: Product[] = []

      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        try {
          const product = parseProduct(doc)
          products.push(product)
        } catch (validationError) {
          console.error('Product validation failed:', validationError)
        }
      })

      setData(products)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setError(err as Error)
      setLoading(false)
    }
  }, [])

  const createProduct = useCallback(async (product: ProductUpload) => {
    setLoading(true)
    setError(null)

    try {
      const collectionRef = collection(db, 'products')
      await addDoc(collectionRef, {
        ...product,
        visitors: 0,
        contacts: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      setLoading(false)
    } catch (err) {
      console.error('Error creating product:', err)
      setError(err as Error)
      setLoading(false)
    }
  }, [])

  return { data, loading, error, getProducts, createProduct }
}
