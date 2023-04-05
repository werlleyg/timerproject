import axios, { AxiosError } from 'axios';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});
