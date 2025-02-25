import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { GetTasksByUserIdFunctionProps } from "../../../types/functions.types";

const getTasksByUserIdRetry = async (props: GetTasksByUserIdFunctionProps) => {
    try {
        AxiosClient.get(`${baseURL}/todo/getTodosByUserId/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${props.getLocalStorageItem('accessToken')}`
            }
        })
        .then((res) => {
            console.log(res.data.data);
            props.setTasks(res.data.data);  
        })
        .catch((error) => {
            console.log(error);
            if(error.status === 403) {
                console.log('Doesn\t have refresh token in the cookie');
                console.log('User will be logout');
                props.setToken(null);
                props.clearLocalStorageItem('accessToken');
                props.clearLocalStorageItem('user');
                props.navigate('/');
            }
        });
    } catch (error) {
        console.log(error);
        console.log('Error getTodosByUserId 2');
    }
}

export default getTasksByUserIdRetry;