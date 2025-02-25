import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { UpdateTaskFunctionProps } from "../../../types/functions.types";

const updateTaskRetry = async (props: UpdateTaskFunctionProps) => {
    props.setIsLoading(true);
    try {
        await AxiosClient.patch(`${baseURL}/todo/${props.todoId}`, {}, {
            headers: {
                Authorization: `Bearer ${props.getLocalStorageItem('accessToken')}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                props.setIsSuccess(true);
                setTimeout(() => {
                    props.setIsSuccess(false);
                    props.setIsLoading(false);
                    props.navigate(0);
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
                props.setIsError(true);
                setTimeout(() => {
                    props.setIsError(false);
                    props.setIsLoading(false);
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

export default updateTaskRetry;