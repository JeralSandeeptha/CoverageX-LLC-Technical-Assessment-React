import React, { Dispatch, SetStateAction } from "react"
import { AuthRequest, ITask, IToken } from "./interfaces.types"
import { NavigateFunction } from "react-router-dom"

export type RegisterUserFunctionProps = {
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsError: Dispatch<SetStateAction<boolean>>,
    setIsSuccess: Dispatch<SetStateAction<boolean>>,
    user: AuthRequest,
    navigate: NavigateFunction
}

export type LoginUserFunctionProps = {
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsError: Dispatch<SetStateAction<boolean>>,
    setIsSuccess: Dispatch<SetStateAction<boolean>>,
    user: AuthRequest,
    navigate: NavigateFunction,
    setLocalStorageItem: (itemName: string, itemData: unknown) => void,
    setToken: Dispatch<SetStateAction<IToken | null>>
}

export type GoogleLoginUserFunctionProps = {
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsError: Dispatch<SetStateAction<boolean>>,
    setIsSuccess: Dispatch<SetStateAction<boolean>>,
    email: string,
    navigate: NavigateFunction,
    setLocalStorageItem: (itemName: string, itemData: unknown) => void,
    setToken: Dispatch<SetStateAction<IToken | null>>
}

export type HandleLoginFunctionProps = { email: string, password: string };

export type HandleRegisterFunctionProps = { email: string, password: string };

export type HandleAddFormFunctionProps = { 
    title: string, 
    description: string,
};

export type AuthProviderProps = {
    children: React.ReactNode
}

export type AddTodoFunctionProps = {
    userId: string,
    token: string,
    title: string,
    description: string,
    setIsError: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsSuccess: Dispatch<SetStateAction<boolean>>,
    handleVisibleForm: () => void,
    navigate: NavigateFunction,
    logOutUser: () => void,
    setToken: Dispatch<SetStateAction<IToken | null>>
    setLocalStorageItem: (itemName: string, itemData: unknown) => void,
    getLocalStorageItem: (itemName: string) => void,
    clearLocalStorageItem: (itemName: string) => void
}

export type GetUserFunctionProps = {
    userId: string,
    token: string
}

export type GetTasksByUserIdFunctionProps = {
    userId: string,
    setTasks: Dispatch<SetStateAction<ITask[]>>,
    token: string,
    navigate: NavigateFunction,
    setToken: Dispatch<SetStateAction<IToken | null>>,
    setLocalStorageItem: (itemName: string, itemData: unknown) => void,
    getLocalStorageItem: (itemName: string) => void,
    clearLocalStorageItem: (itemName: string) => void
}

export type UpdateTaskFunctionProps = {
    token: string,
    setIsError: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsSuccess: Dispatch<SetStateAction<boolean>>,
    navigate: NavigateFunction,
    todoId: string,
    setToken: Dispatch<SetStateAction<IToken | null>>,
    setLocalStorageItem: (itemName: string, itemData: unknown) => void,
    getLocalStorageItem: (itemName: string) => void,
    clearLocalStorageItem: (itemName: string) => void
}

export type GetUserInfoFromGoogleProps = {
    access_token: string
}