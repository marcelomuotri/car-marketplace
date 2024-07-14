// utils/productParser.ts
import * as yup from 'yup'

// Esquema de validación para el producto
const productSchema = yup.object().shape({
  title: yup.string().required('title is mandatory'),
  description: yup.string().required('Description is mandatory'),
  imageUrl: yup.string().url('URL not valid').required('URL is mandatory'),
  active: yup.boolean().required('Active is mandatory'),
  //startingDate: yup.date().required('Starting date is mandatory'),
  visitors: yup.number().required('Visitors is mandatory'),
  price: yup.number().required('Price is mandatory'),
  contacts: yup.number().required('Contacts is mandatory'),
})

// Función para parsear un documento de Firestore a un objeto Product
// cuando viene incoming product
export const parseProduct = (doc) => {
  const data = doc.data()
  const id = doc.id
  // Validar los datos antes de convertirlos
  productSchema.validateSync(data)
  const product = {
    id,
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    active: data.active,
    startingDate: data.startingDate,
    visitors: data.visitors,
    price: data.price,
    contacts: data.contacts,
  }

  return product
}
