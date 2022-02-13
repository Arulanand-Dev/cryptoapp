import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "x-access-token":
    "coinranking38394b5e906ddfa34ae67b5b8596b9f93fe14fa543bcf502",
  Origin: "http://localhost:3000",
};

var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var baseUrl = "https://api.coinranking.com/v2";
//baseUrl = `${proxyUrl}${baseUrl}`;
const createRequest = (url) => ({ url, headers: cryptoHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCoinHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
