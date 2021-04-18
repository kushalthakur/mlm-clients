import { config } from '../../config'

export function getToken() {
   const jwtToken = localStorage.getItem("jwtToken")
   if (jwtToken) {
      return jwtToken
   } else {
      return null
   }
}
export function getUser() {
   const currentUser = localStorage.getItem("currentUser")
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