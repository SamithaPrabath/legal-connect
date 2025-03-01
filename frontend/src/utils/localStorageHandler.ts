import { UserType } from "@type/User";

class LocalStorageHandler {
    token: string | null;
    userType: UserType | null;
    profileId: string | null;

    constructor() {
        this.token = localStorage.getItem("token");
        this.userType = localStorage.getItem("userType") as UserType;
        this.profileId = localStorage.getItem("profileId");
    }

    setAll(token: string, userType: UserType, profileId: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
        localStorage.setItem("profileId", profileId);

        this.token = token;
        this.userType = userType;
        this.profileId = profileId
    }

    removeAll() {
        localStorage.clear();
    }
}

export default LocalStorageHandler;