import axios from 'axios'
// const baseUrl='https://dash.ihdchomes.org';


const baseUrl='http://127.0.0.1:8000';

// const baseUrl='https://dash.ihdchomes.org';

const axiosInstance=axios.create({
    baseURL:baseUrl,
})
export default axiosInstance;