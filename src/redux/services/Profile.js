import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://constructionserver.boostupdigital.in/api/v1/',
  }),
   tagTypes: ["User", "Services", "Product", "Shop", "Enquiry"],

  endpoints: build => ({

    staffLogin: build.mutation({
      query(data) {
        return {
          url: 'auth/admin/login',
          method: 'POST',
          body: data,
        };
      },
    }),

    getAllTask: build.query({
      query(token) {
        return {
          url: 'task',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      },
    }),

  }),
});

export const {
   useGetAllTaskQuery,
   useStaffLoginMutation,
} = profileApi;
