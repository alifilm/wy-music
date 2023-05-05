/// <reference types="vite/client" />
export {}
import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
  }
}


declare module 'axios' {
  interface AxiosResponse<T = any> {
    [propName: string]: any
 }
}

declare module 'lodash';