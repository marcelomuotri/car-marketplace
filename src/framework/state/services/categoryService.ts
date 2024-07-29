import { useState, useCallback } from 'react'
import { db } from '../../../../firebaseConfig'
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'
import { CategoryData } from '../../types'

// Define la interfaz para la estructura de los datos de categorías

export const useCategoryService = () => {
  // Ajusta el tipo de estado `data` para reflejar el formato correcto
  const [data, setData] = useState<{ [key: string]: CategoryData }>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const getCategories = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const collectionRef = collection(db, 'categories')
      const querySnapshot = await getDocs(collectionRef)
      const categories: { [key: string]: CategoryData } = {}

      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const docData = doc.data()
        categories[doc.id] = {
          subCategories: docData.subCategories || [],
          brands: docData.brands || {},
          condition: docData.condition || [],
          year: docData.year || '',
          size: docData.size || [],
          homologation: docData.homologation || [],
          competition: docData.competition || [],
        }
      })

      setData(categories)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError(err as Error)
      setLoading(false)
    }
  }, [])

  return { data, loading, error, getCategories }
}
