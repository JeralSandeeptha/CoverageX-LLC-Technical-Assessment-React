import { createContext, useEffect, useState } from "react";
import { AuthProviderProps } from "../types/functions.types";
import { AuthContextType } from "../types/component.types";
import { IToken } from "../types/interfaces.types";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = (props: AuthProviderProps) => {

    const { getLocalStorageItem, setLocalStorageItem, clearLocalStorageItem } = useLocalStorage();
    const [token, setToken] = useState<IToken | null>(() => {
        return getLocalStorageItem("accessToken");
    });

    useEffect(() => {
        if (token) {
            setLocalStorageItem('accessToken', token);
        } else {
            clearLocalStorageItem('accessToken');
        }
    }, [token]);
    
    return (
        <AuthContext.Provider value={{ setToken, token }}>
            { props.children }
        </AuthContext.Provider>
    ) 
}

export default AuthProvider;