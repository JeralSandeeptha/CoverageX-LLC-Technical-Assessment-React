import React, { Dispatch, JSX, SetStateAction } from "react";
import { ITask, IToken } from "./interfaces.types";

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

export type TaskComponentProps = {
    children: React.ReactNode
}

export type TasksComponentProps = {
    setTasks: Dispatch<SetStateAction<ITask[]>>,
    tasks: ITask[],
    isFormOpen: boolean,
    setIsFormOpen: Dispatch<SetStateAction<boolean>>
    handleVisibleForm: () => void
}

export type AddFormComponentProps = {
    handleVisibleForm: () => void
}