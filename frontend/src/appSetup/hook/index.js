import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorageItem } from "./local-storage";
const BASE_URL = "https://tomato-x0w7.onrender.com/api/v1/web";

export const restApi = createApi({
  reducerPath: "restApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log(getState());
      // Get the token from the state or wherever it's stored
      const user = getState()?.user?.user;
      const token = user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/category/list`,
    }),
    getRecipies: builder.query({
      query: () => `/recipe/list`,
    }),
    getDeliveries: builder.query({
      query: () => `/delivery/list`,
    }),
    getDelivery: builder.query({
      query: (id) => `/delivery/${id}`,
    }),
    getOrders: builder.query({
      query: () => `/order/list`,
    }),
    getOrder: builder.query({
      query: (id) => `/order/${id}`,
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: "/client/signUp",
        method: "POST",
        body: data,
      }),
    }),
    updateClient: builder.mutation({
      query: (data) => ({
        url: `/client/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/${id}`,
        method: "DELETE",
      }),
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/signUp",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),

    createRecipe: builder.mutation({
      query: (data) => ({
        url: "/recipe/add",
        method: "POST",
        body: data,
      }),
    }),
    updateRecipe: builder.mutation({
      query: (data) => ({
        url: `/recipe/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: "DELETE",
      }),
    }),

    createDelivery: builder.mutation({
      query: (data) => ({
        url: "/delivery/save",
        method: "POST",
        body: data,
      }),
    }),
    updateDelivery: builder.mutation({
      query: (data) => ({
        url: `/delivery/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteDelivery: builder.mutation({
      query: (id) => ({
        url: `/delivery/${id}`,
        method: "DELETE",
      }),
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `/order/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: `/client/login`,
        method: "POST",
        body: data,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data.error,
    }),
  }),
});