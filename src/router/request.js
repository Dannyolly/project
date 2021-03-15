import axios from 'axios'
/**
 * 封裝axios
 * 上次沒聽..所以因為promise R
 * 2021/3/7.....
 */
export function get(config){

    const instance=axios.create({
        baseURL: 'https://autumnfish.cn',
    })

    return instance(config);
    
}
