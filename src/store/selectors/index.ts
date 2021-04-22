import { config } from '../../config'

export function getToken() {
   const jwtToken: any = localStorage.getItem("jwtToken")
   if (jwtToken) {
      return jwtToken
   } else {
      return null
   }
}
export function getUser() {
   const currentUser: any = localStorage.getItem("currentUser")
   if (currentUser) {
      return currentUser
   } else {
      return null
   }
}

export function removeToken() {
   localStorage.removeItem("jwtToken")
   localStorage.removeItem("currentUser")
}

export function getBaseUrl() {
   return config.baseUrl
}