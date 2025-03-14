import AxiosClient from '../../../api/AxiosClient';
import { baseURL } from '../../../api/baseURL';
import { GoogleLoginUserFunctionProps } from '../../../types/functions.types';

const googleLogin = async (props: GoogleLoginUserFunctionProps) => {
    props.setIsLoading(true);
    try {
        await AxiosClient.post(`${baseURL}/auth/google/login`, { email: props.email })
            .then((res) => {
                console.log(res.data.data);
                props.setIsSuccess(true);
                props.setLocalStorageItem('accessToken', res.data.data.accessToken);
                props.setLocalStorageItem('user', res.data.data.user);
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
            });
    } catch (error) {
        console.error(error);
        props.setIsLoading(false);
        props.setIsError(true);
        setTimeout(() => {
            props.setIsError(false);
        }, 5000);
    }
}

export default googleLogin;