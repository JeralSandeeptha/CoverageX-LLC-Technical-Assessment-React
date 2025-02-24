import AxiosClient from "../../../api/AxiosClient";
import { baseURL } from "../../../api/baseURL";
import { AddTodoFunctionProps } from "../../../types/functions.types";

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
            })
            .catch((error) => {
                console.log(error);
                if(error.status === 403) {
                    AxiosClient.get(`${baseURL}/auth/refresh-token`)
                        .then((res) => {
                            console.log(res.data.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            if(error.status === 401) {
                                console.log('Doesn\t have refresh token in the cookie');
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