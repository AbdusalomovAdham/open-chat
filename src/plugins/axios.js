import axios from 'axios'

const api = axios.create({
    baseUrl: "http://localhost:3000",
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(function (config) {
    const token = localStorage && localStorage.getItem('token') || null
    token && (config.headers['Authorization'] = `Bearer ${token}`)

    return config
}, function (error) {
    return Promise.reject(error)
})

api.interceptors.response.use(function (response) {
    return response?.data
}, function (error) {
    if (error?.response?.status === 401) {
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        // localStorage.removeItem('me');
        // window.location.href = '/auth/sign-in';
    }

    return Promise.reject(error);
})

export default api 