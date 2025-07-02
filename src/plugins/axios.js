import axios from 'axios'

const api = axios.create({
    baseUrl: "http://localhost:8001/v1",
    timeout: 60000
})

api.interceptors.request.use(function (config) {

    if (!config.url.includes('https://apiapply.epauzb.uz')) {
        const token = localStorage && localStorage.getItem('token') || null
        token && (config.headers['Authorization'] = `Bearer ${token}`)
    } else config.headers['Authorization'] = `Bearer 1db49d2e441831cfca6bc967f8c097a72df54a1f9dd08485bd72004c829d492d`
    // return config

})

export default { api }