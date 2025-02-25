import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { AddTodoFunctionProps } from "../../../types/functions.types";

const addTodoRetry = async (props: AddTodoFunctionProps) => {
    props.setIsLoading(true);
    try {
        await AxiosClient.post(`${baseURL}/todo`, {
            title: props.title,
            description: props.description,
            userId: props.userId
        }, {
            headers: {
                'Authorization': `Bearer ${props.getLocalStorageItem('accessToken')}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                props.setIsSuccess(true);
                setTimeout(() => {
                    props.setIsSuccess(false);
                    props.setIsLoading(false);
                    props.navigate(0);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
                console.log(error.message);
                setTimeout(() => {
                    props.setIsError(false);
                    props.setIsLoading(false);
                }, 3000);
                if(error.status === 403) {
                    console.log('Doesn\t have access token');
                    console.log('User will be logout');
                    props.logOutUser();
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

export default addTodoRetry;