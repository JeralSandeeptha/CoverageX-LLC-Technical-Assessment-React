export type AuthRequest = {
    email: string,
    password: string
}

export interface IToken {
    token: IToken | null
}

export interface ITask{
    id?: string,
    title: string,
    description: string,
    userId?: string,
    iscompleted: boolean,
    crated_at?: string,
}

export interface IUser{
    id?: string,
    email: string,
    password?: string,
    created_at?: string,
}