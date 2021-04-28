import { removeToken } from '../store/selectors'

export const fetchGetRequest = (url: string, token: string, body: any, method: string, headers?: Headers) => {
   return fetch(url, {
      method: method,
      headers: checkHeaders(headers!, token, body)
   }).then(handleResponse)
}

function checkHeaders(headers: Headers, token: string, body: any) {
   if (!headers) {
      headers = new Headers()
   }
   if (token) {
      headers.set('Authorization', `Bearer ${token}`)
   }
   if (!body || (body && !(body instanceof FormData))) {
      if (!headers.get('Content-Type')) {
         headers.set('Content-Type', 'application/json')
      }
   }
   return headers
}

function handleResponse(response: Response) {
   return new Promise((resolve, reject) => {
      if (response.status === 403 || response.status === 401) {
         removeToken()
         window.location.reload()
         let err = new Error('Unauthorized')
         reject(err)
      }
      if (response.status === 404 || response.status === 422) {
         const contentType = response.headers.get('content-type');
         if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(json => {
               resolve(json);
            });
         } else {
            let err = new Error("Error while parsing result or Payload Mismatch");
            reject(err);
         }
      }
      if (response.status === 500) {
         const contentType = response.headers.get('content-type');
         if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(json => {
               resolve(json);
            });
         } else {
            let err = new Error("Critical");
            reject(err);
         }
      }
      if ((response.status >= 200 && response.status < 300) || response.status === 400) {
         const contentType = response.headers.get('content-type');
         if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(json => {
               resolve(json);
            });
         } else {
            let err = new Error("Error while parsing result");
            reject(err);
         }
      }
   })
}