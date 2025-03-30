export enum UserType {
  LAWYER = "LAWYER",
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
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
  aboutInfo: AboutInfo | null;
};

export enum LawyerStatus {
  PENDING = "Pending",
  VERIFIED = "Verified",
  DENIED = "Denied",
}

export type UserInfoResponse = {
  id: string;
  type: UserType;
  basicInfo: BasicInfo;
  contactInfo: ContactInfo;
  
  // following parameters only can be applicable for lawyer
  aboutInfo: AboutInfo | null;
  status?: UserStatus;
  lawyerStatus?: LawyerStatus;
  reviewCount?: number;
  rating?: number;
};
