export interface Iconfig {
   baseURL: string
}

export const config: any = {
   baseURL: process.env.REACT_APP_API_BASE_URL!
}