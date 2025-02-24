import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { GetTasksByUserIdFunctionProps } from "../../../types/functions.types";

const getTasksByUserId = async (props: GetTasksByUserIdFunctionProps) => {
    try {
        await AxiosClient.get(`${baseURL}/todo/getTodosByUserId/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                props.setTasks(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}

export default getTasksByUserId;