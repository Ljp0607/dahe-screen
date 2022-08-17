import axios, { AxiosResponse, AxiosError } from 'axios';
import { checkStatus } from '../api/helper/checkStatus'
// 默认请求连接
axios.defaults.baseURL = "http://152.136.144.141:8080/dahe";//测试环境路径
//axios.defaults.baseURL = "https://news.dahebao.cn/dahe";  //正式环境路径
// 超时时间（ms）
axios.defaults.timeout = 2000 * 1000;
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 响应拦截
axios.interceptors.response.use((result: AxiosResponse) => {
    console.log("result", result)
    if (result.data.state == 1) {
        return result.data;
    } else {
        return result
    }
}, (err: AxiosError) => {
    const { response } = err;
    if (response) return checkStatus(response.status);

})

const request = {

    get<T>(url: string, params?: object, _object = {}): Promise<AxiosResponse<T>> {
        return axios.get(url, { params, ..._object });
    },
    post<T>(url: string, params?: object, _object = {}): Promise<AxiosResponse<T>> {
        return axios.post(url, params, _object);
    },
    put<T>(url: string, params?: object, _object = {}): Promise<AxiosResponse<T>> {
        return axios.put(url, params, _object);
    },
    delete<T>(url: string, params?: any, _object = {}): Promise<AxiosResponse<T>> {
        return axios.delete(url, { params, ..._object });
    }

}

export default request
// export default axios

