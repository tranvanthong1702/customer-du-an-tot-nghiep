import {User} from "./user";

export interface Auth {
    profile: User | null,
    token: string | null
}