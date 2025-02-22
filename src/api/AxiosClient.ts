import axios from "axios";

const AxiosClient = axios.create({
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default AxiosClient;