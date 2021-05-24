export const encodeQueryData = (params: any) => {
   const url = [];
   for (let param in params)
      url.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
   return url.join('&');
}

export const generateUrlWithRequestParams = (url: string, params: any) => {
   let keys = Object.keys(params)
   keys.forEach((key) => {
      url = url.replace(`:${key}`, params[key])
   })
   return url
}

export const convertOptionsToValue = (data: Array<any>, key: string) => data.map((item: any): Object => {
   return ({ label: item[key], value: item[key] })
})