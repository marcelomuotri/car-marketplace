import * as yup from 'yup'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { Product } from '../types'

// Esquema de validación para el producto
const productSchema = yup.object().shape({
  uid: yup.string().required('UID is mandatory'),
  title: yup.string().required('Title is mandatory'),
  description: yup.string().required('Description is mandatory'),
  price: yup.number().nullable(),
  applyPrice: yup.boolean().nullable(),
  currency: yup.string().nullable(),
  photo1Url: yup.string().nullable(),
  photo2Url: yup.string().nullable(),
  photo3Url: yup.string().nullable(),
  year: yup.string().nullable(),
  condition: yup.string().nullable(),
  location: yup.string().nullable(),
  featured: yup.boolean().nullable(),
  categoryId: yup.number().nullable(),
  subcategoryId: yup.number().nullable(),
  brandId: yup.number().nullable(),
  modelId: yup.number().nullable(),
  sizeId: yup.number().nullable(),
  homologation: yup.boolean().nullable(),
  competitionId: yup.number().nullable(),
  active: yup.boolean().required('Active is mandatory'),
  startingDate: yup.date().nullable(),
  visitors: yup.number().required('Visitors is mandatory'),
  contacts: yup.number().required('Contacts is mandatory'),
  createdAt: yup.string().required('CreatedAt is mandatory'),
  updatedAt: yup.string().required('UpdatedAt is mandatory'),
})

// Función para parsear un documento de Firestore a un objeto Product
export const parseProduct = (doc: QueryDocumentSnapshot): Product => {
  const data = doc.data()
  const id = doc.id

  try {
    // Validar los datos antes de convertirlos
    productSchema.validateSync(data, { abortEarly: false })

    // Crear el objeto Product
    const product: Product = {
      id,
      uid: data.uid,
      title: data.title,
      description: data.description,
      price: data.price,
      applyPrice: data.applyPrice,
      currency: data.currency,
      photo1Url: data.photo1Url,
      photo2Url: data.photo2Url,
      photo3Url: data.photo3Url,
      year: data.year,
      condition: data.condition,
      location: data.location,
      featured: data.featured,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      brandId: data.brandId,
      modelId: data.modelId,
      sizeId: data.sizeId,
      homologation: data.homologation,
      competitionId: data.competitionId,
      active: data.active,
      visitors: data.visitors,
      contacts: data.contacts,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }

    return product
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      console.error('Validation error:', validationError.errors)
    }
    throw validationError
  }
}
