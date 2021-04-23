import { config } from '../../config'

export const storageUser = (result: any) => {
   localStorage.setItem('jwtToken', result.payload.token)
   sessionStorage.setItem('jwtToken', result.payload.token)
   localStorage.setItem('currentUser', JSON.stringify(result.payload.data))
   sessionStorage.setItem('currentUser', JSON.stringify(result.payload.data))
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
   localStorage.removeItem("currentUser")
   sessionStorage.removeItem("jwtToken")
   sessionStorage.removeItem("currentUser")
}

export function getBaseUrl() {
   return config.baseUrl
}