import { createApi } from '@reduxjs/toolkit/query/react'
import { db } from '../../../firebaseConfig'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDoc,
  Timestamp,
  increment,
} from 'firebase/firestore'

export const convertIsoStringToTimestamp = (data) => {
  const convertedData = {}

  const isoStringRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]

      // Verifica si el valor es un ISOString válido
      if (typeof value === 'string' && isoStringRegex.test(value)) {
        // Convierte el ISOString a Firebase Timestamp
        convertedData[key] = Timestamp.fromDate(new Date(value))
      } else {
        convertedData[key] = value
      }
    }
  }

  return convertedData
}

export const convertTimestampToIsoString = (data) => {
  const convertedData = {}

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]

      // Verifica si el valor es un Firebase Timestamp
      if (value instanceof Timestamp) {
        // Convierte el Firebase Timestamp a ISOString
        convertedData[key] = value.toDate().toISOString()
      } else {
        convertedData[key] = value
      }
    }
  }

  return convertedData
}

// Crear un baseQuery personalizado para Firebase
const firebaseBaseQuery = async ({
  method,
  path,
  data,
  filters,
  populate = [],
  incrementField,
}) => {
  const collectionRef = collection(db, path)
  try {
    switch (method) {
      case 'GET':
        let q
        if (filters && Object.keys(filters).length > 0 && filters.id) {
          // Fetch específico del documento
          const docRef = doc(db, path, filters.id)
          const docSnapshot = await getDoc(docRef)
          if (!docSnapshot.exists()) {
            console.log('No such document!')
            return { data: [] }
          }
          const data = docSnapshot.data()
          const convertedData = convertTimestampToIsoString(data) // Convertir los timestamps a ISOString
          if (populate.length > 0) {
            const populatedData = {}
            populate.forEach((field) => {
              if (convertedData.hasOwnProperty(field)) {
                populatedData[field] = convertedData[field]
              }
            })
            return { data: [{ id: docSnapshot.id, ...populatedData }] }
          }
          return { data: [{ id: docSnapshot.id, ...convertedData }] }
        } else {
          // Consulta general con posibles filtros
          q = query(collectionRef)
          if (filters && Object.keys(filters).length > 0) {
            const filterClauses = Object.entries(filters).map(
              ([key, value]) => {
                if (Array.isArray(value)) {
                  return where(key, 'array-contains-any', value)
                } else {
                  return where(key, '==', value)
                }
              }
            )
            q = query(collectionRef, ...filterClauses)
          }
          const querySnapshot = await getDocs(q)
          return {
            data: querySnapshot.docs.map((doc) => {
              const data = doc.data()
              const convertedData = convertTimestampToIsoString(data) // Convertir los timestamps a ISOString
              if (populate.length > 0) {
                const populatedData = {}
                populate.forEach((field) => {
                  if (convertedData.hasOwnProperty(field)) {
                    populatedData[field] = convertedData[field]
                  }
                })
                return { id: doc.id, ...populatedData }
              }
              return { id: doc.id, ...convertedData }
            }),
          }
        }
      case 'POST':
        const parsedData = convertIsoStringToTimestamp(data)
        const docRef = await addDoc(collectionRef, parsedData)
        await updateDoc(docRef, { id: docRef.id }) // Update document to include the id
        return { data: { id: docRef.id, ...data } }

      case 'DELETE':
        const docToDeleteRef = doc(db, path, data.id) // Assuming `data` has an id field
        await deleteDoc(docToDeleteRef)
        return { data: { id: data.id } } // or some success indicator

      case 'PUT':
        const docToUpdateRef = doc(db, path, data.id)
        const parsedUpdateData = convertIsoStringToTimestamp(data)

        if (incrementField) {
          await updateDoc(docToUpdateRef, {
            [incrementField]: increment(1), // Incrementa el campo especificado en 1
          })
        } else {
          await updateDoc(docToUpdateRef, parsedUpdateData)
        }
        return { data: { id: data.id, ...parsedUpdateData } }

      default:
        throw new Error('Method not supported')
    }
  } catch (err) {
    console.error(err)
    return { error: err.message }
  }
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: firebaseBaseQuery,
  tagTypes: ['Entity'],
  endpoints: (builder) => ({
    getEntities: builder.query({
      query: ({ collectionPath, filters = {} }) => ({
        method: 'GET',
        path: collectionPath,
        filters,
      }),
      providesTags: [{ type: 'Entity' }],
    }),
    addEntity: builder.mutation({
      query: ({ collectionPath, data }) => ({
        method: 'POST',
        path: collectionPath,
        data,
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
    deleteEntity: builder.mutation({
      query: ({ collectionPath, docId }) => ({
        method: 'DELETE',
        path: collectionPath,
        data: { id: docId },
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
    updateEntity: builder.mutation({
      query: ({ collectionPath, data }) => ({
        method: 'PUT',
        path: collectionPath,
        data,
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
  }),
})

export const {
  useGetEntitiesQuery,
  useAddEntityMutation,
  useDeleteEntityMutation,
  useUpdateEntityMutation,
} = api
