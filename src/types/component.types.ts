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
    filterTasks: ITask[],
    isFormOpen: boolean,
    setIsFormOpen: Dispatch<SetStateAction<boolean>>
    handleVisibleForm: () => void
    randomColor: string,
    getRandomColor: () => string
}

export type TaskButtonComponentProps = {
    handleUpdateTask: () => void,
    children: React.ReactNode
}

export type AddFormComponentProps = {
    handleVisibleForm: () => void
}