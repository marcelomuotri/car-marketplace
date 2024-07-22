// types.ts

export interface UserData {
  userEmail: string
  uid: string
  name: string | null
  surname: string | null
  birthdate: string | null
  role: string
  createdAt: string
  verifiedStatus: string
  phoneNumber: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  description: string | null
  photoProfileUrl: string | null
  photoFrontIdUrl: string | null
  photobackIdUrl: string | null
  verifiedAt: string | null
  updatedAt: string | null
  contactEmail: string | null
  photoToShowUrl: string | null
  isSeller: boolean
  nameToShow: string | null
  dni: string | null
}

export interface AuthState {
  user: string | null
  loading: boolean
  error: string | null
  userData: UserData | null
}

export interface SignInPayload {
  email: string
  password: string
}

export interface Product {
  id: string
  title: string
  description: string
  imageUrl: string
  competition: string
  category: string
  subCatergory: string
  startingDate: Date
  active: boolean
  visitors: number
  price: number
  contacts: number
}
