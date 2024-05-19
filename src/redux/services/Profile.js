import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://constructionserver.boostupdigital.in/api/v1/',
  }),
   tagTypes: ["Tasks"],

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
      providesTags: ["Tasks"]
    }),

    addTask: build.mutation({
      query({ data, token }) {
        return {
          url: 'task',
          method: 'POST',         
          headers: {
            Authorization: `Bearer ${token}`
          },
          body:data,
        };
      },
      invalidatesTags: ["Tasks"]
    }),

  }),
});

export const {
   useAddTaskMutation,
   useGetAllTaskQuery,
   useStaffLoginMutation,
} = profileApi;
