export enum UserType {
  LAWYER = "lawyer",
  CLIENT = "client",
  ADMIN = "admin",
}

export enum UserStatus {
  AVAILABLE = "Available for Consultation",
  UNAVAILABLE = "Unavailable",
}

export type BasicInfo = {
  image: null | string;
  firstName: string;
  lastName: string;
  occupation: string;
  language: string;
  location: string;
  city: string;
};

export type basicInfoKeyType =
  | "image"
  | "firstName"
  | "lastName"
  | "occupation"
  | "language"
  | "location"
  | "city";
export type contactInorKeyType = "email" | "phone" | "address";
export type aboutKeyType =
  | "bio"
  | "practiceAreas"
  | "credentialsAndEducation"
  | "workHistory";

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
};

export type AboutInfo = {
  bio: string;
  practiceAreas: string[];
  credentialsAndEducation: string;
  workHistory: string;
};

export type UserInfoRequest = {
  type: UserType | null;
  password: string;
  basicInfo: BasicInfo;
  contactInfo: ContactInfo;
  about: AboutInfo | null;
};

export type UserInfoResponse = {
  id: string;
  status?: UserStatus;
  reviewCount?: number;
  rating?: number;
  type: UserType;
  basicInfo: BasicInfo;
  contactInfo: ContactInfo;
  about: AboutInfo | null;
};
