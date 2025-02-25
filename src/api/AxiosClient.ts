import axios from "axios";

const AxiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default AxiosClient;