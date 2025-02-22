import { Dispatch, JSX, SetStateAction } from "react";
import { IToken } from "./interfaces.types";

export type AuthContextType = {
    token: IToken | null;
    setToken: Dispatch<SetStateAction<IToken | null>>;
};

export type PrivateRouteProps = {
    element: JSX.Element;
};

export type PublicRouteProps = {
    element: JSX.Element;
};