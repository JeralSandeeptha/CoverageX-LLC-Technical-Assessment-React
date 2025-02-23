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
    crated_at?: string,
}