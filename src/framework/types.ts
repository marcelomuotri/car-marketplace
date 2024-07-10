// types.ts

export interface UserData {
    name: string
    surname: string
    email: string
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
  }
  