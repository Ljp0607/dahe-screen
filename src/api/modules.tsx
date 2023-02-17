// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
// let baseUrl = 'http://152.136.144.141/dahe/';
let baseUrl = 'https://news.dahebao.cn/dahe/';
/** 获取当前的用户 GET /api/currentUser */
export async function getNews(options?: { [key: string]: any }) {
  return request<{ data: API.News }>(baseUrl + 'appActivityNews/getNewsInfo', {
    method: 'POST',
    data: {
      type: '111',
      page_index: 0,
      page_count: 100,
    },
    ...(options || {}),
  });
}
/** 获取记者传播力指数 */
export async function getReporter(options?: { [key: string]: any; type: number }) {
  return request<{ data: API.Reporter }>(baseUrl + 'fanwenapi/reporterTransmissionList', {
    method: 'GET',
    params: {
      dateType: options?.type,
      page_count: 300,
    },
  });
}

/** 获取下载量分析 */
export async function getDownload(options?: { [key: string]: string }) {
  return request<{ data: API.Download }>(
    baseUrl + 'noLoginApi/downloadChannel/clickAndDownloadCountListAll.do',
    {
      method: 'GET',
      params: options,
    },
  );
}
