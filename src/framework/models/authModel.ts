import dayjs from 'dayjs'
import { UserData } from '../types'

export const createUserPayload: (user: any) => UserData = (user) => ({
  userEmail: user.email,
  uid: user.uid,
  name: null,
  surname: null,
  birthdate: null,
  role: 'user',
  createdAt: dayjs().toISOString(),
  verifiedStatus: 'unverified',
  phoneNumber: null,
  address: null,
  city: null,
  state: null,
  country: null,
  description: null,
  photoProfileUrl: null,
  photoFrontIdUrl: null,
  photobackIdUrl: null,
  verifiedAt: null,
  updatedAt: dayjs().toISOString(),
  contactEmail: null,
  photoToShowUrl: null,
  isSeller: true,
  nameToShow: null,
  dni: null,
})
