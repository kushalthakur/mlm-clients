import { createMasterApi } from './master'

// export const masterMemberPagination = createMasterApi("@Master/MasterMemberPagination", {
//    paginationRequest: {
//       url: "/api/members",
//       method: "GET"
//    }
// })

export const masterMembers = createMasterApi("@Master/MasterMembers", {
   request: {
      url: "/api/members",
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