import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";

const logoutUser = () => {
    try {
        AxiosClient.get(`${baseURL}/auth/logout`)
            .then((res) => {
                console.log(res.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

export default logoutUser;