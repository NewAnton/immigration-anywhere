import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LocationPOSTResponse,
  LocationPOSTRequest,
  LocationGETResponse,
  ReviewsPOSTRequest,
  ReviewsPOSTResponse,
  ReviewsGETResponse,
  GeolocationResponse,
} from 'types/queryTypes';

const TOKEN_GEOLOCATION = '0a9c79faa8fbc7666193eeacc8c004a7';

export const backend = createApi({
  reducerPath: 'backend',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://immigration-anywhere-be.up.railway.app/',
    // prepareHeaders: (headers) => {
    //   headers.set('Access-Control-Allow-Origin', '*');
    //   return headers;
    // },
    mode: 'cors',
  }),

  endpoints: (builder) => ({
    createLocation: builder.mutation<LocationPOSTResponse, LocationPOSTRequest>({
      query: (payload) => ({
        url: `/locations`,
        method: 'POST',
        body: payload,
      }),
    }),
    getLocations: builder.query<LocationGETResponse[], void>({
      query: (payload) => ({
        url: `/locations`,
        method: 'GET',
        body: payload,
      }),
    }),
    createReview: builder.mutation<ReviewsPOSTResponse, ReviewsPOSTRequest>({
      query: (payload) => ({
        url: `/reviews`,
        method: 'POST',
        body: payload,
      }),
    }),
    getReviews: builder.query<ReviewsGETResponse, void>({
      query: (payload) => ({
        url: `/reviews`,
        method: 'GET',
        body: payload,
      }),
    }),
    getGeolocation: builder.query<GeolocationResponse, string>({
      query: (payload) => ({
        url: `https://immigration-anywhere-be.up.railway.app/google-maps-api`,
        method: 'GET',
        params: { access_key: TOKEN_GEOLOCATION, query: payload },
      }),
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetLocationsQuery,
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetGeolocationQuery,
} = backend;
