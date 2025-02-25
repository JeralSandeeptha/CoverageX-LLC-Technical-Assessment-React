import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { UpdateTaskFunctionProps } from "../../../types/functions.types";

const updateTask = async (props: UpdateTaskFunctionProps) => {
    props.setIsLoading(true);
    try {
        await AxiosClient.patch(`${baseURL}/todo/${props.todoId}`, {}, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                props.setIsLoading(false);
                props.setIsSuccess(true);
                setTimeout(() => {
                    props.setIsSuccess(false);
                }, 5000);
                props.navigate(0);
            })
            .catch((error) => {
                console.log(error);
                props.setIsLoading(false);
                props.setIsError(true);
                setTimeout(() => {
                    props.setIsError(false);
                }, 5000);
            });
    } catch (error) {
        console.log(error);
        props.setIsLoading(false);
        props.setIsError(true);
        setTimeout(() => {
            props.setIsError(false);
        }, 5000);
    }
}

export default updateTask;