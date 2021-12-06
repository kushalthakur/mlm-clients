import axios from 'axios'
import { config } from '../../config'
// import { redirectTo } from '../master/master.saga'

export const storageUser = (result: any) => {

   localStorage.setItem('refreshToken', result.payload.refreshToken)
   sessionStorage.setItem('refreshToken', result.payload.refreshToken)
   localStorage.setItem('exp', result.payload.exp)
   sessionStorage.setItem('exp', result.payload.exp)
   localStorage.setItem('tokenType', result.payload.tokenType)
   sessionStorage.setItem('tokenType', result.payload.tokenType)


   localStorage.setItem('currentUser', JSON.stringify(result.payload.data))
   sessionStorage.setItem('currentUser', JSON.stringify(result.payload.data))
}

export const setAccessToken = (token: string, exp?: string) => {
   localStorage.setItem('jwtToken', token)
   sessionStorage.setItem('jwtToken', token)
   if (exp) {
      localStorage.setItem('exp', exp)
      sessionStorage.setItem('exp', exp)
   }
}

export function getToken() {
   const jwtToken: any = localStorage.getItem("jwtToken")
   const jwtTokenSession: any = sessionStorage.getItem("jwtToken")
   if (jwtToken) {
      return jwtToken
   } else if (jwtTokenSession) {
      return jwtTokenSession
   } else {
      return null
   }
}

export function getRefreshToken() {
   const refreshToken: any = localStorage.getItem("refreshToken")
   const refreshTokenSession: any = sessionStorage.getItem("refreshToken")
   if (refreshToken) {
      return refreshToken
   } else if (refreshTokenSession) {
      return refreshTokenSession
   } else {
      return null
   }
}

export function getExpireTokenTime() {
   const jwtExp: any = localStorage.getItem("exp")
   const jwtExpSession: any = sessionStorage.getItem("exp")
   if (jwtExp) {
      return jwtExp
   } else if (jwtExpSession) {
      return jwtExpSession
   } else {
      return null
   }
}

export function getUser() {
   const currentUser: any = localStorage.getItem("currentUser")
   // const currentUserSession: any = sessionStorage.getItem("currentUser")
   if (currentUser) {
      return currentUser
   } else {
      return null
   }
}

export function removeToken() {
   localStorage.removeItem("jwtToken")
   sessionStorage.removeItem("jwtToken")
   localStorage.removeItem('refreshToken')
   sessionStorage.removeItem('refreshToken')
   localStorage.removeItem('exp')
   sessionStorage.removeItem('exp')
   localStorage.removeItem('tokenType')
   sessionStorage.removeItem('tokenType')
   localStorage.removeItem("currentUser")
   sessionStorage.removeItem("currentUser")
}

export const baseURL = () => {
   return config.baseURL
}

export const refreshTokenApi = async () => {
   try {
      const response = await axios.post(`${config.baseURL}/api/auth/token`, {}, { headers: { "x-auth-token": getRefreshToken() } })
      const accessToken = response && response.data && response.data.token
      const exp = response && response.data && response.data.exp
      setAccessToken(accessToken, exp)
   } catch (err: any) {
      removeToken()
      // redirectTo("/")
      window.location.reload()
   }
}

export const isTokenExpire = async () => {
   const expireAt = getExpireTokenTime() && new Date(getExpireTokenTime() * 1000)
   const currentDate = new Date()
   if (expireAt && (currentDate > expireAt)) {
      await refreshTokenApi()
   }
}