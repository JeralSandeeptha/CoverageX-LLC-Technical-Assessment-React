import { Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { PublicRouteProps } from "../../types/component.types";

const PublicRoute = (props: PublicRouteProps) => {
    const { token } = useAuthContext();

    return token ? <Navigate to="/dashboard" /> : props.element;
};

export default PublicRoute;