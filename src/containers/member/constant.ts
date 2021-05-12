export interface IMemberForm {
   id: number
   firstName: string
   lastName: string
   username: string
   email: string
   phone: string
   password: string
   address: string
   age: number
   dateOfBirth: string
   role: string
   status: number
   createdAt?: Date
   updatedAt?: Date

   userId: number
   parentId: number
   level: number
   sponsorId: string
}

export const fields: Array<string> = [
   "firstName",
   "lastName",
   "username",
   "email",
   "phone",
   "address",
   "age",
   "dateOfBirth",
   "status"
]