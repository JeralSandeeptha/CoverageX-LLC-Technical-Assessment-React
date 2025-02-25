import axios from "axios";

const AxiosClient = axios.create({
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default AxiosClient;