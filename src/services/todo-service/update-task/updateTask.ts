import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { UpdateTaskFunctionProps } from "../../../types/functions.types";
import updateTaskRetry from "./updateTaskRetry";

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
                console.log('Error in update task 1');
                
                if(error.status === 403) {
                    AxiosClient.get(`${baseURL}/auth/refresh-token`)
                        .then((res) => {
                            console.log(res.data.accessToken);
                            props.setToken(res.data.accessToken);
                            props.setLocalStorageItem('accessToken', res.data.accessToken);

                            if(res.data.accessToken) {
                                updateTaskRetry({
                                    clearLocalStorageItem: props.clearLocalStorageItem,
                                    getLocalStorageItem: props.getLocalStorageItem,
                                    navigate: props.navigate,
                                    setIsError: props.setIsError,
                                    setToken: props.setToken,
                                    todoId: props.todoId,
                                    token: props.token,
                                    setIsLoading: props.setIsLoading,
                                    setIsSuccess: props.setIsSuccess,
                                    setLocalStorageItem: props.setLocalStorageItem
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            console.log('Error getting refresh token');
                            if(error.status === 403) {
                                console.log('Doesn\t have refresh token in the cookie');
                                console.log('User will be logout');
                                props.setToken(null);
                                props.clearLocalStorageItem('accessToken');
                                props.clearLocalStorageItem('user');
                                props.navigate('/');
                            }
                        });
                }
            });
    } catch (error) {
        console.log(error);
        console.log('Error in update task 2');
        props.setIsLoading(false);
        props.setIsError(true);
        setTimeout(() => {
            props.setIsError(false);
        }, 5000);
    }
}

export default updateTask;