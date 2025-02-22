import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthContext = () => {

    const authContext = useContext(AuthContext);

    if(!authContext) {
        throw new Error('Auth context should be inside of Auth Provider!');
    }

    const { setToken, token } = authContext;

    return { token, setToken };

}

export default useAuthContext;
