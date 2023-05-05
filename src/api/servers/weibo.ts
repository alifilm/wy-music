import { service } from '../index';

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

export const getWeiboTit = () => service.get('/api/v1/wbGroup')
export const getWeiboDetail = (gid: string, containerid: string, pageNum: number) => service.post('/api/v1/wbGroupDetail', { gid, containerid, pageNum })
