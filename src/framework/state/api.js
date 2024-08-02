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
} from 'firebase/firestore'

// Crear un baseQuery personalizado para Firebase
const firebaseBaseQuery = async ({ method, path, data, filters }) => {
  const collectionRef = collection(db, path)
  try {
    switch (method) {
      case 'GET':
        let q
        if (filters && Object.keys(filters).length > 0 && filters.id) {
          // Specific document fetch
          const docRef = doc(db, path, filters.id)
          const docSnapshot = await getDoc(docRef)
          if (!docSnapshot.exists()) {
            console.log('No such document!')
            return { data: [] } // or handle as needed
          }
          return { data: [{ id: docSnapshot.id, ...docSnapshot.data() }] }
        } else {
          // General query with possible filters
          q = query(collectionRef)
          if (filters && Object.keys(filters).length > 0) {
            const filterClauses = Object.entries(filters).map(([key, value]) =>
              where(key, '==', value)
            )
            q = query(collectionRef, ...filterClauses)
          }
          const querySnapshot = await getDocs(q)
          return {
            data: querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          }
        }

      case 'POST':
        const docRef = await addDoc(collectionRef, data)
        await updateDoc(docRef, { id: docRef.id }) // Update document to include the id
        return { data: { id: docRef.id, ...data } }

      case 'DELETE':
        const docToDeleteRef = doc(db, path, data.id) // Assuming `data` has an id field
        await deleteDoc(docToDeleteRef)
        return { data: { id: data.id } } // or some success indicator

      case 'PUT':
        const docToUpdateRef = doc(db, path, data.id)
        console.log(docToUpdateRef)
        console.log(data)
        await updateDoc(docToUpdateRef, data)
        return { data: { id: data.id, ...data } }

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
