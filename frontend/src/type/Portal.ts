import { UserType } from "./User"

export type LoginResponse = {
    token: string | null,
    userType: UserType | null,
    profileId: string | null
}