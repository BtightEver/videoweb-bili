import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 30000
})

request.interceptors.request.use(config => {        //请求标头的内容
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    let user = JSON.parse(localStorage.getItem("user"));
    if(user != null){
        config.headers['token'] = user.token;
    }

    return config
})

request.interceptors.response.use(              //响应标头的内容
    response => {
        let res = response.data;

        if(typeof res === 'String') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.error('response error: ' + error)
        return Promise.reject(error)
    }
)

export default request