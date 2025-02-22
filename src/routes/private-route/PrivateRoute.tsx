import { Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { PrivateRouteProps } from "../../types/component.types";

const PrivateRoute = (props: PrivateRouteProps) => {

    const { token } = useAuthContext();

    console.log("token" + token);
    
    return (
        <>
            {
                token ? props.element : <Navigate to='/'/>
            }
        </>
    );

}

export default PrivateRoute;