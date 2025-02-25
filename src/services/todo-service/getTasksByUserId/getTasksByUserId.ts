import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { GetTasksByUserIdFunctionProps } from "../../../types/functions.types";
import getTasksByUserIdRetry from "./getTasksByUserIdRetry";

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
                console.log('Error getTodosByUserId 1');

                if(error.status === 403) {
                    AxiosClient.get(`${baseURL}/auth/refresh-token`)
                        .then((res) => {
                            console.log(res.data.accessToken);
                            props.setToken(res.data.accessToken);
                            props.setLocalStorageItem('accessToken', res.data.accessToken);

                            if(res.data.accessToken) {
                                getTasksByUserIdRetry({
                                    clearLocalStorageItem: props.clearLocalStorageItem,
                                    setLocalStorageItem: props.setLocalStorageItem,
                                    setTasks: props.setTasks,
                                    setToken: props.setToken,
                                    userId: props.userId,
                                    getLocalStorageItem: props.getLocalStorageItem,
                                    navigate: props.navigate,
                                    token: props.token
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
        console.log('Error getTodosByUserId 2');
    }
}

export default getTasksByUserId;