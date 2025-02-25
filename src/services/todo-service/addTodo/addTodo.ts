import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { AddTodoFunctionProps } from "../../../types/functions.types";
import addTodoRetry from "./addTodoRetry";

const addTodo = async (props: AddTodoFunctionProps) => {
    props.setIsLoading(true);
    try {
        await AxiosClient.post(`${baseURL}/todo`, {
            title: props.title,
            description: props.description,
            userId: props.userId
        }, {
            headers: {
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                props.setIsSuccess(true);
                setTimeout(() => {
                    props.setIsSuccess(false);
                    props.setIsLoading(false);
                    props.handleVisibleForm();
                }, 5000);
                props.navigate(0);
            })
            .catch((error) => {
                console.log(error);
                if(error.status === 403) {
                    AxiosClient.get(`${baseURL}/auth/refresh-token`)
                        .then((res) => {
                            console.log(res.data.accessToken);
                            props.setToken(res.data.accessToken);
                            props.setLocalStorageItem('accessToken', res.data.accessToken);

                            if(res.data.accessToken) {
                                addTodoRetry({
                                    setIsLoading: props.setIsLoading,
                                    title: props.title,
                                    description: props.description,
                                    userId: props.userId,
                                    token: props.token,
                                    setIsSuccess: props.setIsSuccess,
                                    handleVisibleForm: props.handleVisibleForm,
                                    navigate: props.navigate,
                                    setIsError: props.setIsError,
                                    logOutUser: props.logOutUser,
                                    setLocalStorageItem: props.setLocalStorageItem,
                                    setToken: props.setToken,
                                    clearLocalStorageItem: props.clearLocalStorageItem,
                                    getLocalStorageItem: props.getLocalStorageItem
                                });
                            } else {
                                props.setIsLoading(false);
                                console.log('No refresh token. Please log out');
                                if(error.status === 401) {
                                    console.log('Didn\'t get a new access token');
                                    console.log('User will be logout');
                                    props.logOutUser();
                                }
                            }
                        })
                        .catch((error) => {
                            console.log(error.message);
                            props.setIsLoading(false);
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
            })
    } catch (error) {
        console.log(error);
        props.setIsLoading(false);
        props.setIsError(true);
        setTimeout(() => {
            props.setIsError(false);
        }, 5000);
    }
}

export default addTodo;