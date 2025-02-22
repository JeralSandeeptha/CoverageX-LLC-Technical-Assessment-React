import AxiosClient from '../../../api/AxiosClient';
import { baseURL } from '../../../api/baseURL';
import { LoginUserFunctionProps } from '../../../types/functions.types';

const loginUser = async (props: LoginUserFunctionProps) => {
    props.setIsLoading(true);
    try {
        await AxiosClient.post(`${baseURL}/auth/login`, props.user)
            .then((res) =>{
                console.log(res.data.data);
                props.setIsSuccess(true);
                props.setLocalStorageItem('accessToken', res.data.data.accessToken);
                setTimeout(() => {
                    props.setToken(res.data.data.accessToken);
                }, 5000);
                setTimeout(() => {
                    props.setIsSuccess(false);
                }, 5000);
                setTimeout(() => {
                    props.navigate('/dashboard');
                }, 7000);
            })
            .catch((error) => {
                console.error(error);
                props.setIsLoading(false);
                props.setIsError(true);
                setTimeout(() => {
                    props.setIsError(false);
                }, 5000);
            })
    } catch (error) {
        console.error(error);
        props.setIsLoading(false);
        props.setIsError(true);
        setTimeout(() => {
            props.setIsError(false);
        }, 5000);
    }
}

export default loginUser;