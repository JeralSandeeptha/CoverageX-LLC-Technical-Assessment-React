export type AuthRequest = {
    email: string,
    password: string
}

export interface IToken {
    token: IToken | null
}