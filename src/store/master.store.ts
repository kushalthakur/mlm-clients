import { createMasterApi } from './master'

export const masterMembers = createMasterApi("@Master/MasterMembers", {
   pagination: {
      url: "/api/members",
      method: "GET"
   },
   request: {
      url: "/api/member/:memberId",
      method: "GET"
   },
   create: {
      url: "/api/members",
      method: "POST"
   },
   update: {
      url: "/api/members",
      method: "PUT"
   },
   list: {
      url: "/api/sponsors",
      method: "GET"
   }
})