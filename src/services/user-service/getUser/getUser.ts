import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { GetUserFunctionProps } from "../../../types/functions.types";

const getUser = async (props: GetUserFunctionProps) => {
    try {
        await AxiosClient.get(`${baseURL}/user/${props.userId}`)
            .then((res) => {
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
}

export default getUser;