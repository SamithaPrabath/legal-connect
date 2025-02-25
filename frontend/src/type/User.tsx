export enum UserType {
    LAWYER = "lawyer",
    CLIENT = "client"
}

export type BasicInfo = {
    image: null | string;
    firstName: string;
    lastName: string;
    occupation: string;
    language: string;
    location: string;
    city: string;
}

export type basicInfoKeyType = "firstName" | "lastName" | "occupation" | "language" | "location" | "city"
export type contactInorKeyType = "email" | "phone" | "address"
export type aboutKeyType = "bio" | "practiceAreas" | "credentialsAndEducation" | "workHistory"

export type ContactInfo = {
    email: string;
    phone: string;
    address: string;
}

export type AboutInfo = {
    bio: string;
    practiceAreas: string[];
    credentialsAndEducation: string;
    workHistory: string;
}

export type UserInfoRequest = {
    type: UserType | null,
    password: string,
    basicInfo: BasicInfo
    contactInfo: ContactInfo
    about: AboutInfo | null
}